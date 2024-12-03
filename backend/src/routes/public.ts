import bearer from "@elysiajs/bearer";
import Elysia from "elysia";
import { findPublicShortUrls } from "../db/shorturl";
import { DataResponse } from "../types/response";

export const publicGroup = new Elysia().group("/public", (app) =>
  app.use(bearer()).get(
    "/short-url",
    async () => {
      const urls = await findPublicShortUrls();
      return DataResponse.json({ urls });
    },
    { tags: ["Short Url"] },
  ),
);
