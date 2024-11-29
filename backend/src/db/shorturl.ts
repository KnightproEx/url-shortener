import type { ShortUrl } from "@prisma/client";
import { prisma } from "./prisma";
import type { OmitReadOnly } from "./types";

export const createShortUrl = async (
  data: OmitReadOnly<Omit<ShortUrl, "isActive" | "isPublic" | "timesClicked">>,
) => {
  return await prisma.shortUrl.create({ data });
};

export const findShortUrlById = async (id: string) => {
  return await prisma.shortUrl.findUnique({
    where: { id, deletedAt: null },
  });
};

export const findPublicShortUrls = async () => {
  return await prisma.shortUrl.findMany({
    where: { isPublic: true, isActive: true, deletedAt: null },
  });
};

export const findShortUrlsByUserId = async (id: string) => {
  return await prisma.shortUrl.findMany({
    where: { createdBy: id, deletedAt: null },
  });
};

export const updateShortUrl = async (
  data: Omit<OmitReadOnly<ShortUrl> & { id: string }, "timesClicked">,
) => {
  return await prisma.shortUrl.update({ data, where: { id: data.id } });
};

export const deleteShortUrlById = async (id: string) => {
  return await prisma.shortUrl.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
