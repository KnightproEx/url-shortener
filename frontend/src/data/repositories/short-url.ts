import apiClient from "@/config/api-client";
import type { DataResponse } from "../type";

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
  timesClicked: number;
}

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
