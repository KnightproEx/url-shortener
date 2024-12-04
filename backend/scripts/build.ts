import { build } from "bun";

await (async () => {
  console.log("[Build] running.");

  const result = await build({
    entrypoints: ["src/index.ts"],
    outdir: "./dist",
    target: "bun",
    minify: {
      syntax: true,
      identifiers: true,
    },
    sourcemap: "external",
  });

  if (!result.success) {
    console.error("[Build] failed.");
    console.error(result.logs.join("\n"));
    process.exit(1);
  }

  console.log("[Build] successful.");
  process.exit(0);
})();
