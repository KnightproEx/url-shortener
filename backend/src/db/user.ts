import { comparePassword } from "../utils/crypto";
import { prisma } from "./prisma";

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id, AND: { deletedAt: null } },
  });
};

export const createUser = async (username: string, password: string) => {
  return await prisma.user.create({ data: { username, password } });
};

export const findUserByCredentials = async (data: {
  username: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { username: data.username, deletedAt: null },
  });

  if (!user) {
    return;
  }

  const matched = comparePassword(data.password, user.password);

  if (matched) {
    return user;
  }
};
