import { verifyAuthApi } from "@/data/repositories/auth";
import { useQuery } from "@tanstack/react-query";

export const useVerifyAuth = () => {
  return useQuery({
    queryFn: verifyAuthApi,
    queryKey: ["auth"],
  });
};
