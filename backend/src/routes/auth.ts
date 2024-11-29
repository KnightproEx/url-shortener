import bearer from "@elysiajs/bearer";
import Elysia, { t } from "elysia";
import { findUserByCredentials, findUserById } from "../db/user";
import { unauthorizedError } from "../types/error";
import { DataResponse, SuccessResponse } from "../types/response";
import {
  signTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/jwt";

const tokenResponse = (userId: string) => {
  return DataResponse.json(signTokens(userId));
};

export const authGroup = new Elysia().group("/auth", (app) =>
  app
    .use(bearer())
    .get(
      "/verify",
      async ({ bearer, cookie: { accessToken } }) => {
        const payload = verifyAccessToken(bearer ?? accessToken?.value ?? "");
        const user = await findUserById(payload?.sub ?? "");

        if (!user) {
          return unauthorizedError();
        }

        return DataResponse.json({ user });
      },
      { tags: ["Auth"] },
    )
    .post(
      "/token",
      async ({
        body: { refresh_token },
        cookie: { accessToken, refreshToken },
      }) => {
        const payload = verifyRefreshToken(
          refresh_token ?? refreshToken?.value ?? "",
        );
        const user = await findUserById(payload?.sub ?? "");

        if (!user) {
          return unauthorizedError();
        }

        const response = tokenResponse(user.id);

        accessToken.set({
          maxAge: response.data.access_token_expires_in,
          value: response.data.access_token,
          httpOnly: true,
          // sameSite: "none",
          // secure: true,
          path: "/",
        });

        refreshToken.set({
          maxAge: response.data.refresh_token_expires_in,
          value: response.data.refresh_token,
          httpOnly: true,
          // sameSite: "none",
          // secure: true,
          path: "/api/v1/auth/token",
        });

        return response;
      },
      {
        tags: ["Auth"],
        body: t.Object({
          refresh_token: t.Optional(t.String()),
          grant_type: t.Enum({ refresh_token: "refresh_token" }),
        }),
      },
    )
    .post(
      "/login",
      async ({ body, cookie: { accessToken, refreshToken } }) => {
        const user = await findUserByCredentials(body);

        if (!user) {
          return unauthorizedError("Invalid credentials");
        }

        const response = tokenResponse(user.id);

        accessToken.set({
          maxAge: response.data.access_token_expires_in,
          value: response.data.access_token,
          httpOnly: true,
          // sameSite: "none",
          // secure: true,
          path: "/",
        });

        refreshToken.set({
          maxAge: response.data.refresh_token_expires_in,
          value: response.data.refresh_token,
          httpOnly: true,
          // sameSite: "none",
          // secure: true,
          path: "/api/v1/auth/token",
        });

        return response;
      },
      {
        tags: ["Auth"],
        body: t.Object({
          username: t.String({ error: "required" }),
          password: t.String({ error: "required" }),
        }),
      },
    )
    .post(
      "/logout",
      async ({ cookie: { accessToken, refreshToken } }) => {
        accessToken.remove();
        refreshToken.remove();

        return SuccessResponse.json();
      },
      { tags: ["Auth"] },
    ),
);
