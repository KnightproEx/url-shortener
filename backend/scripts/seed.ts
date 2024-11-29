import { prisma } from "../src/db/prisma";

await (async () => {
  try {
    console.log("[Seeder] seeding data.");

    await prisma.user.create({
      data: {
        username: "John Doe",
        password: "123123",
      },
    });

    await prisma.$disconnect();
    console.log("[Seeder] data has been inserted successfully.");
    process.exit(0);
  } catch (err) {
    await prisma.$disconnect();
    console.error("[Seeder] Error seeding data.");
    console.error(err);
    process.exit(1);
  }
})();
