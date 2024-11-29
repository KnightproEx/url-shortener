import { error as elysiaError } from "elysia";
import { ErrorResponse } from "./response";

export const badRequest = (message?: string, error?: unknown) =>
  elysiaError(400, ErrorResponse.json(message ?? "Bad request", error));
export const unauthorizedError = (message?: string) =>
  elysiaError(401, ErrorResponse.json(message ?? "Unauthorized"));
export const forbiddenError = () =>
  elysiaError(403, ErrorResponse.json("Forbidden"));
export const notFoundError = () =>
  elysiaError(404, ErrorResponse.json("Not found"));
export const internalServerError = () =>
  elysiaError(500, ErrorResponse.json("Internal server error"));
