import { ObjectId, type Filter } from "mongodb";
import { checkToken } from "./check-token";
import { getUsersCollection } from "@/utils/db";
import type { User } from "@/models";

export interface AuthenticatedUserResult {
  user: User | null;
  payload: Awaited<ReturnType<typeof checkToken>>;
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUserResult> {
  const payload = await checkToken();

  if (!payload) {
    return { user: null, payload };
  }

  const usersCollection = await getUsersCollection();
  const filter: Filter<User> = ObjectId.isValid(payload.id)
    ? { _id: new ObjectId(payload.id) }
    : { email: payload.email };

  const user = await usersCollection.findOne(filter);

  return { user, payload };
}
