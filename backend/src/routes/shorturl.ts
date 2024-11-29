import bearer from "@elysiajs/bearer";
import Elysia from "elysia";
import { findPublicShortUrls } from "../db/shorturl";
import { DataResponse } from "../types/response";

export const shortUrlGroup = new Elysia().group("/short-url", (app) =>
  app.use(bearer()).get(
    "/public",
    async () => {
      const url = await findPublicShortUrls();
      return DataResponse.json({ url });
    },
    { tags: ["Short Url"] },
  ),
);
