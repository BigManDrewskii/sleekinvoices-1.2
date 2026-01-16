import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  // SECURITY: Explicitly block SKIP_AUTH in production
  if (process.env.SKIP_AUTH === "true") {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "CRITICAL SECURITY ERROR: SKIP_AUTH is enabled in production. " +
          "This is a severe security vulnerability. Deployment blocked."
      );
    }

    // Development mode only: Auto-authenticate with dev user
    const { getUserByOpenId, upsertUser } = await import("../db");

    let devUser = await getUserByOpenId("dev-user-local");

    if (!devUser) {
      await upsertUser({
        openId: "dev-user-local",
        name: "Local Dev User",
        email: "dev@localhost.test",
        loginMethod: "dev",
        lastSignedIn: new Date(),
      });
      devUser = await getUserByOpenId("dev-user-local");
    }

    return {
      req: opts.req,
      res: opts.res,
      user: devUser || null,
    };
  }

  // Regular authentication flow
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
