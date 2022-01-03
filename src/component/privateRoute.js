import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};
