import { deleteShortUrlApi } from "@/data/repositories/short-url";
import type { ErrorResponse } from "@/data/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteShortUrl = (id: string, callback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<boolean, ErrorResponse>({
    mutationFn: () => deleteShortUrlApi(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["short-url"] });
      callback();
    },
    onError: (e) => toast.error(e.message),
  });
};
