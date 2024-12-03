import apiClient from "@/config/api-client";
import type { DataResponse } from "../type";

export interface FetchPublicShortUrlResponse {
  urls: Url[];
}

export interface Url {
  id: string;
  name: string;
  slug: string;
  url: string;
}

export const fetchPublicShortUrlApi = async () => {
  const { data } =
    await apiClient.get<DataResponse<FetchPublicShortUrlResponse>>(
      "/public/short-url",
    );
  return data.data;
};
