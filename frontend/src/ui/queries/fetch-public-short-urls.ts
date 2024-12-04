import { fetchPublicShortUrlsApi } from "@/data/repositories/short-url";
import { useQuery } from "@tanstack/react-query";

export const useFetchPublicShortUrls = () => {
  return useQuery({
    queryFn: fetchPublicShortUrlsApi,
    queryKey: ["short-url", "public"],
    select: (data) => data.urls,
  });
};
