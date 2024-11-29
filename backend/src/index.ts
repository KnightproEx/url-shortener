import { Elysia } from "elysia";
import { apiGroup } from "./routes/api";
import { healthCheckRoute } from "./routes/healcheck";
import cors from "./utils/cors";
import { ensureEnvLoaded } from "./utils/env";
import swagger from "./utils/swagger";

ensureEnvLoaded();

const app = new Elysia({ normalize: true })
  .use(swagger())
  .use(cors())
  .use(healthCheckRoute)
  .use(apiGroup)
  .listen(3000);

console.log(
  "\x1b[33m%s %d\x1b[0m",
  "🦊 Server is running at",
  `${app.server?.hostname}:${app.server?.port}`,
);
