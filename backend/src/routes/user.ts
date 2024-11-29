import bearer from "@elysiajs/bearer";
import Elysia, { t } from "elysia";
import {
  deleteShortUrlById,
  findShortUrlById,
  findShortUrlsByUserId,
  updateShortUrl,
} from "../db/shorturl";
import { createShortUrl } from "../db/shorturl";
import { notFoundError } from "../types/error";
import { DataResponse } from "../types/response";
import type { ISingleton } from "./api";

export const userGroup = new Elysia<"", false, ISingleton>().group(
  "/user",
  (app) =>
    app
      .use(bearer())
      .get(
        "/short-url",
        async ({ user }) => {
          const url = await findShortUrlsByUserId(user.id);
          return DataResponse.json({ url });
        },
        { tags: ["User"] },
      )
      .post(
        "/short-url",
        async ({ body }) => {
          const url = await createShortUrl(body);
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
        "/short-url",
        async ({ body }) => {
          const res = await findShortUrlById(body.id);

          if (!res) {
            return notFoundError();
          }

          const url = await updateShortUrl(body);
          return DataResponse.json(url);
        },
        {
          tags: ["User"],
          body: t.Object({
            id: t.String(),
            name: t.String(),
            slug: t.String(),
            url: t.String(),
            isPublic: t.Boolean(),
            isActive: t.Boolean(),
          }),
        },
      )
      .delete(
        "/short-url",
        async ({ body }) => {
          const url = await deleteShortUrlById(body.id);
          return DataResponse.json(url);
        },
        {
          tags: ["User"],
          body: t.Object({
            id: t.String(),
          }),
        },
      ),
);
