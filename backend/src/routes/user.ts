import bearer from "@elysiajs/bearer";
import Elysia, { t } from "elysia";
import {
  deleteShortUrlByIdAndUserId,
  findShortUrlById,
  findShortUrlsByUserId,
  updateShortUrlByIdAndUserId,
} from "../db/shorturl";
import { createShortUrl } from "../db/shorturl";
import { notFoundError } from "../types/error";
import { DataResponse, SuccessResponse } from "../types/response";
import type { ISingleton } from "./api";

export const userGroup = new Elysia<"", false, ISingleton>().group(
  "/user",
  (app) =>
    app
      .use(bearer())
      .get(
        "/short-url",
        async ({ user }) => {
          const urls = await findShortUrlsByUserId(user.id);
          return DataResponse.json({ urls });
        },
        { tags: ["User"] },
      )
      .post(
        "/short-url",
        async ({ body, user }) => {
          const url = await createShortUrl({ createdBy: user.id, ...body });
          return DataResponse.json(url);
        },
        {
          tags: ["User"],
          body: t.Object({
            name: t.String(),
            slug: t.String(),
            url: t.String(),
            isPublic: t.Boolean(),
          }),
        },
      )
      .put(
        "/short-url/:id",
        async ({ body, params: { id }, user }) => {
          const res = await findShortUrlById(id, user.id);

          if (!res) {
            return notFoundError();
          }

          const url = await updateShortUrlByIdAndUserId(id, user.id, body);
          return DataResponse.json(url);
        },
        {
          tags: ["User"],
          params: t.Object({ id: t.String() }),
          body: t.Object({
            name: t.String(),
            slug: t.String(),
            url: t.String(),
            isPublic: t.Boolean(),
            isActive: t.Boolean(),
          }),
        },
      )
      .delete(
        "/short-url/:id",
        async ({ params: { id }, user }) => {
          const res = await findShortUrlById(id, user.id);

          if (!res) {
            return notFoundError();
          }

          await deleteShortUrlByIdAndUserId(id, user.id);

          return SuccessResponse.json();
        },
        {
          tags: ["User"],
          params: t.Object({ id: t.String() }),
        },
      ),
);
