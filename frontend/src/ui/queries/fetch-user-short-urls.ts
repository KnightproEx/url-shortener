import { fetchUserShortUrlsApi } from "@/data/repositories/short-url";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserShortUrls = () => {
  return useQuery({
    queryFn: fetchUserShortUrlsApi,
    queryKey: ["short-url", "user"],
    select: (data) => data.urls,
  });
};
