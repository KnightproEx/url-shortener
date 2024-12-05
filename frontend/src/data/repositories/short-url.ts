import apiClient from "@/config/api-client";
import type { CreateShortUrlInput } from "@/ui/pages/dashboard/create-short-url-query";
import type { UpdateShortUrlInput } from "@/ui/pages/dashboard/update-short-url-query";
import type { DataResponse, GenericResponse } from "../type";

export interface FetchPublicShortUrlResponse {
  urls: PublicUrl[];
}

export interface FetchUserShortUrlResponse {
  urls: UserUrl[];
}

export interface PublicUrl {
  id: string;
  name: string;
  slug: string;
  url: string;
}

export interface UserUrl {
  id: string;
  name: string;
  slug: string;
  url: string;
  isActive: boolean;
  isPublic: boolean;
  timesClicked: number;
}

// export interface CreateShortUrlInput {
//   name: string;
//   slug: string;
//   url: string;
//   isPublic: boolean;
//   isActive: boolean;
// }
//
// export interface UpdateShortUrlInput {
//   id: string;
//   name: string;
//   slug: string;
//   url: string;
//   isPublic: boolean;
// }

export const fetchPublicShortUrlsApi = async () => {
  const { data } =
    await apiClient.get<DataResponse<FetchPublicShortUrlResponse>>(
      "/public/short-url",
    );
  return data.data;
};

export const fetchUserShortUrlsApi = async () => {
  const { data } =
    await apiClient.get<DataResponse<FetchUserShortUrlResponse>>(
      "/user/short-url",
    );
  return data.data;
};

export const createShortUrlApi = async (input: CreateShortUrlInput) => {
  const { data } = await apiClient.post<GenericResponse>(
    "/user/short-url",
    input,
  );
  return data.success;
};

export const updateShortUrlApi = async (
  id: string,
  input: UpdateShortUrlInput,
) => {
  const { data } = await apiClient.put<GenericResponse>(
    `/user/short-url/${id}`,
    input,
  );
  return data.success;
};

export const deleteShortUrlApi = async (id: string) => {
  const { data } = await apiClient.delete<GenericResponse>(
    `/user/short-url/${id}`,
  );
  return data.success;
};
