import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/crypto";

export const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ args, query }) {
        args.data.password = hashPassword(args.data.password);
        return query(args);
      },
      async update({ args, query }) {
        const password = args.data.password?.toString();
        if (password) {
          args.data.password = hashPassword(password);
        }
        return query(args);
      },
    },
  },
});
