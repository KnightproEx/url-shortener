import bearer from "@elysiajs/bearer";
import type { User } from "@prisma/client";
import Elysia, { type SingletonBase } from "elysia";
import { findUserById } from "../db/user";
import {
  badRequest,
  internalServerError,
  unauthorizedError,
} from "../types/error";
import { verifyAccessToken } from "../utils/jwt";
import { authGroup } from "./auth";
import { shortUrlGroup } from "./shorturl";
import { userGroup } from "./user";

export const apiGroup = new Elysia().group("/api/v1", (app) => {
  return app
    .use(authGroup)
    .use(shortUrlGroup)
    .use(bearer())
    .derive(async ({ bearer, cookie: { accessToken } }) => {
      const payload = verifyAccessToken(bearer ?? accessToken?.value ?? "");
      const user = await findUserById(payload?.sub ?? "");
      return { user };
    })
    .onBeforeHandle(({ user }) => {
      if (!user) return unauthorizedError();
    })
    .use(userGroup)
    .onError(({ code, error }) => {
      if (code === "VALIDATION") {
        return badRequest(undefined, error.all);
      }

      console.log(error);

      return internalServerError;
    });
});

export interface ISingleton extends SingletonBase {
  decorator: Record<string, unknown>;
  store: Record<string, unknown>;
  derive: { user: User };
  resolve: Record<string, unknown>;
}
