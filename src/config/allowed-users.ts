export interface AllowedUser {
  email: string;
  passwordHash: string;
  role?: 'admin' | 'manager' | 'user';
  name?: string;
}

/**
 * Static allowlist of accounts permitted to sign in.
 * TODO: extend this list or move to a secure store before production.
 */
export const allowedUsers: AllowedUser[] = [
  {
    email: "test.admin@example.com",
    passwordHash:
      "$2b$10$rnHdgvjif5Vvz4W.dM0Va.Ioy7bLA1GlkVjZtP27AOFcqj1RAWu9i", // Test@12345
    role: "admin",
    name: "Test Admin",
  },
  {
    email: "test.user@example.com",
    passwordHash:
      "$2b$10$rnHdgvjif5Vvz4W.dM0Va.Ioy7bLA1GlkVjZtP27AOFcqj1RAWu9i", // Test@12345
    role: "user",
    name: "Test User",
  },
];

export function findAllowedUser(email: string): AllowedUser | undefined {
  return allowedUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
}
