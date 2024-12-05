import bearer from "@elysiajs/bearer";
import Elysia, { redirect } from "elysia";
import { findShortUrlBySlug, incrementShortUrlClickById } from "../db/shorturl";
import { notFoundError } from "../types/error";

export const shortUrlGroup = new Elysia().group("/short-url", (app) =>
  app.use(bearer()).get(
    "*",
    async ({ path }) => {
      const slug = path.split("/").slice(-1).pop();
      if (!slug) return notFoundError();

      const data = await findShortUrlBySlug(slug);

      const url = data?.url;
      if (!url) return notFoundError();

      await incrementShortUrlClickById(data.id);

      return redirect(url);
    },
    { tags: ["Short Url"] },
  ),
);
