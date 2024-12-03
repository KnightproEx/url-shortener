import bearer from "@elysiajs/bearer";
import Elysia, { redirect } from "elysia";
import { findShortUrlBySlug } from "../db/shorturl";
import { notFoundError } from "../types/error";

export const shortUrlGroup = new Elysia().group("/short-url", (app) =>
  app.use(bearer()).get(
    "*",
    async ({ path }) => {
      const slug = path.split("/").slice(-1).pop();
      if (!slug) return notFoundError();

      const url = (await findShortUrlBySlug(slug))?.url;
      if (!url) return notFoundError();

      return redirect(url);
    },
    { tags: ["Short Url"] },
  ),
);
