import { updateShortUrlApi } from "@/data/repositories/short-url";
import type { ErrorResponse } from "@/data/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { type TypeOf, coerce, object, string } from "zod";

export const updateShortUrlSchema = object({
  name: string().min(1, "*required field"),
  slug: string().min(1, "*required field"),
  url: string().min(1, "*required field"),
  isActive: coerce.boolean(),
  isPublic: coerce.boolean(),
});

export type UpdateShortUrlInput = TypeOf<typeof updateShortUrlSchema>;

export const useUpdateShortUrl = (id: string, callback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<boolean, ErrorResponse, UpdateShortUrlInput>({
    mutationFn: (e) => updateShortUrlApi(id, e),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["short-url"] });
      callback();
    },
    onError: (e) => toast.error(e.message),
  });
};
