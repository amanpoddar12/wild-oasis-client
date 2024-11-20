import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../services/apiAuth.js";

export const useUser = () => {
  // NOTE: isFetching is a little more convenient for me than fetchStatus, but it's up to you
  const {
    isLoading,
    data: user,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  // NOTE: we need user?.role, not user?.user?.role, as Mirko suggested, please see apiAuth.js and useLogin.js
  // when we get this from getCurrentUser, it's user?.user
  // and when we get this from useLogin -> onSuccess, it's data.user
  const isAuthenticated = user?.role === "authenticated";

  return { isLoading, user, error, isAuthenticated, isFetching };
};
