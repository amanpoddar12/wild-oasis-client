import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminRoute({ children }) {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?.user_metadata?.role !== 'admin') {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  if (isAuthenticated && user?.user_metadata?.role === 'admin') {
    return children;
  }

  return null;
}

export default AdminRoute;