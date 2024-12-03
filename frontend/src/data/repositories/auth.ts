import apiClient from "@/config/api-client";
import type { LoginInput } from "@/ui/pages/login/login-query";
import { toFormData } from "axios";
import type { DataResponse, GenericResponse } from "../type";

export interface VerifyAuthResponse {
  id: string;
  username: string;
}

export const verifyAuthApi = async () => {
  const { data } =
    await apiClient.get<DataResponse<VerifyAuthResponse>>("/auth/verify");
  return data.data;
};

export const loginApi = async (input: LoginInput) => {
  const { data } = await apiClient.post<GenericResponse>(
    "/auth/login",
    toFormData({
      username: input.username,
      password: input.password,
    }),
  );
  return data.success;
};

export const registerApi = () => {};
export const logoutApi = () => {};
