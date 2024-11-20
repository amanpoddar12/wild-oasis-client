import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../../services/apiAuth.js";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      // NOTE: setQueryData -- not setQueriesData, as Jonas suggested
      // and we need ONLY data.user here, not full data, as Jonas suggested
      queryClient.setQueryData(["user"], data.user);
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    },

    onError: (error) => toast.error(`${error.message}: ${error.cause.message}`),
  });

  return { login, isLoading };
};
