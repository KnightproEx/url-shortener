import type { ShortUrl } from "@prisma/client";
import { prisma } from "./prisma";
import type { OmitReadOnly } from "./types";

export const createShortUrl = async (
  data: OmitReadOnly<
    Omit<ShortUrl, "isActive" | "isPublic" | "timesClicked">
  > & {
    createdBy?: string;
  },
) => {
  return await prisma.shortUrl.create({ data });
};

export const findShortUrlById = async (id: string, userId?: string) => {
  return await prisma.shortUrl.findUnique({
    where: { id, createdBy: userId, deletedAt: null },
  });
};

export const findPublicShortUrls = async () => {
  return await prisma.shortUrl.findMany({
    where: { isPublic: true, isActive: true, deletedAt: null },
    omit: {
      isActive: true,
      isPublic: true,
      timesClicked: true,
      createdAt: true,
      createdBy: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};

export const findShortUrlBySlug = async (slug: string) => {
  return await prisma.shortUrl.findUnique({
    where: { slug, isActive: true, deletedAt: null },
    select: { id: true, url: true },
  });
};

export const findShortUrlsByUserId = async (id: string) => {
  return await prisma.shortUrl.findMany({
    where: { createdBy: id, deletedAt: null },
    omit: {
      createdAt: true,
      createdBy: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
};

export const updateShortUrlByIdAndUserId = async (
  id: string,
  userId: string,
  data: Omit<OmitReadOnly<ShortUrl>, "timesClicked">,
) => {
  return await prisma.shortUrl.update({
    data,
    where: { id, createdBy: userId, deletedAt: null },
  });
};

export const incrementShortUrlClickById = async (id: string) => {
  return await prisma.shortUrl.update({
    data: { timesClicked: { increment: 1 } },
    where: { id, deletedAt: null },
  });
};

export const deleteShortUrlByIdAndUserId = async (
  id: string,
  userId: string,
) => {
  return await prisma.shortUrl.update({
    where: { id, createdBy: userId },
    data: { deletedAt: new Date() },
  });
};
