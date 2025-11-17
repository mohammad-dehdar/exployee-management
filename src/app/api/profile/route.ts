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

    if (!profile) {
      return NextResponse.json({ profile: null });
    }

    const normalizedProfile: EmployeeProfile = {
      ...profile,
      ...normalizeStrings(profile as EmployeeProfileInput),
      experiences: (profile.experiences ?? []).map((item) => ({
        company: item?.company ?? "",
        role: item?.role ?? "",
        responsibilities: item?.responsibilities ?? "",
        startDate: item?.startDate ?? "",
        endDate: item?.endDate ?? "",
      })),
      certifications: (profile.certifications ?? []).map((item) => ({
        title: item?.title ?? "",
        issuer: item?.issuer ?? "",
        issueDate: item?.issueDate ?? "",
        duration: item?.duration ?? "",
      })),
      attachments: profile.attachments ?? [],
      orgEmail: profile.orgEmail ?? auth.email,
      userEmail: profile.userEmail ?? auth.email,
      userId: profile.userId ?? auth.id,
    };

    return NextResponse.json({ profile: normalizedProfile });
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

const MAX_ITEMS = {
  experiences: 25,
  certifications: 25,
  attachments: 15,
} as const;

const trimAndLimit = (value: unknown, max = 256) => {
  if (typeof value !== "string") return value;
  return value.trim().slice(0, max);
};

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
    result[field] = trimAndLimit(data[field], 1024) ?? "";
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

function sanitizePayload(
  payload: ProfilePayload | null | undefined
): EmployeeProfileInput {
  const source = payload ?? {};
  const sanitized: Record<string, unknown> = { ...source };

  stringFields.forEach((field) => {
    const value = sanitized[field as string];
    const normalized = trimAndLimit(value, 1024);
    sanitized[field as string] =
      normalized === "" || normalized === null ? undefined : normalized;
  });

  const experiencesSource = Array.isArray(source.experiences)
    ? (source.experiences as Array<Partial<ExperienceInput> | null>)
    : [];

  sanitized.experiences = experiencesSource
    .slice(0, MAX_ITEMS.experiences)
    .map((item) => ({
      company: trimAndLimit(item?.company, 128) ?? "",
      role: trimAndLimit(item?.role, 128) ?? "",
      responsibilities: trimAndLimit(item?.responsibilities, 512) ?? "",
      startDate: trimAndLimit(item?.startDate, 32) ?? "",
      endDate: trimAndLimit(item?.endDate, 32) ?? "",
    })) as EmployeeProfileInput["experiences"];

  const certificationsSource = Array.isArray(source.certifications)
    ? (source.certifications as Array<Partial<CertificationInput> | null>)
    : [];

  sanitized.certifications = certificationsSource
    .slice(0, MAX_ITEMS.certifications)
    .map((item) => ({
      title: trimAndLimit(item?.title, 128) ?? "",
      issuer: trimAndLimit(item?.issuer, 128) ?? "",
      issueDate: trimAndLimit(item?.issueDate, 32) ?? "",
      duration: trimAndLimit(item?.duration, 64) ?? "",
    })) as EmployeeProfileInput["certifications"];

  sanitized.attachments = (Array.isArray(source.attachments)
    ? source.attachments
    : []
  )
    .slice(0, MAX_ITEMS.attachments)
    .map((attachment) => ({
      ...attachment,
      id: trimAndLimit(attachment?.id, 64),
      label: trimAndLimit(attachment?.label, 128),
      fileName: trimAndLimit(attachment?.fileName, 256),
    })) as EmployeeProfileInput["attachments"];

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
