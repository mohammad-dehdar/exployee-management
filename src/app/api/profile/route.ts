import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { env } from "@/config/env";
import { getEmployeeProfilesCollection } from "@/utils/db";
import { employeeProfileSchema, EmployeeProfileInput } from "@/schemas/employee-profile.schema";
import type { EmployeeProfile } from "@/models";

function getAuthToken(req: Request): string | null {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;
  const tokenEntry = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("token="));
  if (!tokenEntry) return null;
  return tokenEntry.split("token=")[1] ?? null;
}

async function getAuthenticatedUser(req: Request) {
  const token = getAuthToken(req);
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const auth = await getAuthenticatedUser(req);
    if (!auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const collection = await getEmployeeProfilesCollection();
    const profile = await collection.findOne({ userId: auth.id });

    return NextResponse.json({ profile: profile ?? null });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

type StringField = Exclude<
  keyof EmployeeProfileInput,
  "experiences" | "certifications" | "attachments"
>;

const stringFields: StringField[] = [
  "firstName",
  "lastName",
  "fatherName",
  "nationalId",
  "birthDate",
  "gender",
  "mobile",
  "emergencyContact",
  "orgEmail",
  "personalEmail",
  "address",
  "city",
  "position",
  "contractType",
  "startDate",
  "endDate",
  "workLocation",
  "baseSalary",
  "benefits",
  "commission",
  "overtimeRate",
  "educationLevel",
  "fieldOfStudy",
  "university",
  "graduationYear",
  "skills",
  "maritalStatus",
  "linkedin",
  "github",
  "website",
  "notes",
];

function normalizeStrings(
  data: EmployeeProfileInput
): Record<StringField, string> {
  const result = {} as Record<StringField, string>;
  stringFields.forEach((field) => {
    result[field] = data[field] ?? "";
  });
  return result;
}

type ExperienceInput = EmployeeProfileInput["experiences"][number];
type CertificationInput = EmployeeProfileInput["certifications"][number];
type ProfilePayload = Partial<EmployeeProfileInput> & {
  experiences?: Array<Partial<ExperienceInput> | null | undefined>;
  certifications?: Array<Partial<CertificationInput> | null | undefined>;
  attachments?: EmployeeProfileInput["attachments"];
};

function sanitizePayload(payload: ProfilePayload | null | undefined): EmployeeProfileInput {
  const source = payload ?? {};
  const sanitized: Record<string, unknown> = { ...source };

  stringFields.forEach((field) => {
    const value = sanitized[field as string];
    sanitized[field as string] =
      value === "" || value === null ? undefined : value;
  });

  const experiencesSource = Array.isArray(source.experiences)
    ? (source.experiences as Array<Partial<ExperienceInput> | null>)
    : [];

  sanitized.experiences = experiencesSource.map((item) => ({
        company: item?.company ?? "",
        role: item?.role ?? "",
        responsibilities: item?.responsibilities ?? "",
        startDate: item?.startDate ?? "",
        endDate: item?.endDate ?? "",
      })) as EmployeeProfileInput["experiences"];

  const certificationsSource = Array.isArray(source.certifications)
    ? (source.certifications as Array<Partial<CertificationInput> | null>)
    : [];

  sanitized.certifications = certificationsSource.map((item) => ({
        title: item?.title ?? "",
        issuer: item?.issuer ?? "",
        issueDate: item?.issueDate ?? "",
        duration: item?.duration ?? "",
      })) as EmployeeProfileInput["certifications"];

  sanitized.attachments = Array.isArray(source.attachments)
    ? (source.attachments as EmployeeProfileInput["attachments"])
    : [];

  return sanitized as EmployeeProfileInput;
}

export async function PUT(req: Request) {
  try {
    const auth = await getAuthenticatedUser(req);
    if (!auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const sanitizedBody = sanitizePayload(body);
    const validationResult = employeeProfileSchema.safeParse(sanitizedBody);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const now = new Date();
    const collection = await getEmployeeProfilesCollection();

    const normalizedStrings = normalizeStrings({
      ...data,
      orgEmail: auth.email,
    }) as Partial<EmployeeProfile>;

    const updateDoc: EmployeeProfile = {
      ...normalizedStrings,
      userId: auth.id,
      userEmail: auth.email,
      orgEmail: auth.email,
      experiences: data.experiences.map((item) => ({
        company: item.company ?? "",
        role: item.role ?? "",
        responsibilities: item.responsibilities ?? "",
        startDate: item.startDate ?? "",
        endDate: item.endDate ?? "",
      })),
      certifications: data.certifications.map((item) => ({
        title: item.title ?? "",
        issuer: item.issuer ?? "",
        issueDate: item.issueDate ?? "",
        duration: item.duration ?? "",
      })),
      attachments: data.attachments,
      updatedAt: now,
      createdAt: now,
    };

    await collection.updateOne(
      { userId: auth.id },
      {
        $set: updateDoc,
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );

    const profile = await collection.findOne({ userId: auth.id });

    return NextResponse.json({
      message: "Profile saved",
      profile,
    });
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
