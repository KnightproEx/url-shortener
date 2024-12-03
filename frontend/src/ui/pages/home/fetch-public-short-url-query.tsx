import { fetchPublicShortUrlApi } from "@/data/repositories/short-url";
import { useQuery } from "@tanstack/react-query";

export const useFetchPublicShortUrl = () => {
  return useQuery({
    queryFn: fetchPublicShortUrlApi,
    queryKey: ["short-url", "public"],
    select: (data) => data.urls,
  });
};
