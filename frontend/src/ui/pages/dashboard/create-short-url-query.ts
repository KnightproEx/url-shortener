import { createShortUrlApi } from "@/data/repositories/short-url";
import type { ErrorResponse } from "@/data/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { type TypeOf, coerce, object, string } from "zod";

export const createShortUrlSchema = object({
  name: string().min(1, "*required field"),
  slug: string().min(1, "*required field"),
  url: string().min(1, "*required field"),
  isPublic: coerce.boolean(),
});

export type CreateShortUrlInput = TypeOf<typeof createShortUrlSchema>;

export const useCreateShortUrl = (callback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<boolean, ErrorResponse, CreateShortUrlInput>({
    mutationFn: createShortUrlApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["short-url"] });
      callback();
    },
    onError: (e) => toast.error(e.message),
  });
};
