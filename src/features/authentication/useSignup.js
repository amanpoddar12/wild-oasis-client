import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! You can now log in with your credentials."
      );
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create account");
    },
  });
  return { signup, isLoading };
}
