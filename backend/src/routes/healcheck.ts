import Elysia from "elysia";

export const healthCheckRoute = new Elysia().get("/health", async () => {
  return "Success";
});
