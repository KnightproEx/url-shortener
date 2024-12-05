import apiClient from "@/config/api-client";
import type { LoginInput } from "@/ui/pages/login/login-query";
import type { DataResponse, GenericResponse } from "../type";

export interface VerifyAuthResponse {
  user: {
    id: string;
    username: string;
  };
}

export const verifyAuthApi = async () => {
  const { data } =
    await apiClient.get<DataResponse<VerifyAuthResponse>>("/auth/verify");
  return data.data;
};

export const loginApi = async (input: LoginInput) => {
  const { data } = await apiClient.post<GenericResponse>("/auth/login", input);
  return data.success;
};

// TODO: Implement this
export const registerApi = () => {};

export const logoutApi = async () => {
  const { data } = await apiClient.post<GenericResponse>("/auth/logout");
  return data.success;
};
