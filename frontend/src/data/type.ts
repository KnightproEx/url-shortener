// export interface User {
//   id: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt: null;
// }

export enum StatusCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export interface GenericResponse {
  success: boolean;
}

export interface DataResponse<T> extends GenericResponse {
  data: T;
}

export interface ErrorResponse extends GenericResponse {
  message: string;
  error: unknown;
}
