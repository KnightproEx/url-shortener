import { loginApi } from "@/data/repositories/auth";
import type { ErrorResponse } from "@/data/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { type TypeOf, object, string } from "zod";

export const loginSchema = object({
  username: string().min(1, "*required field"),
  password: string().min(1, "*required field"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<boolean, ErrorResponse, LoginInput>({
    mutationFn: loginApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      navigate("/");
    },
    onError: (e) => toast.error(e.message),
  });
};
