import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const {
    isLoading,
    data: user,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  console.log(user);
  // const fetchStatus=user?.
  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
    isFetching,
  };
}
