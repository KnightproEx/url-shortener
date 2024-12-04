import { logoutApi } from "@/data/repositories/auth";
import type { ErrorResponse } from "@/data/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<boolean, ErrorResponse>({
    mutationFn: logoutApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      navigate("/");
      window.location.reload();
    },
    onError: (e) => toast.error(e.message),
  });
};
