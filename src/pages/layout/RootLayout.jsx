import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FullScreenContainer from "../../components/Layout/FullScreenContainer";

export function RootLayout() {
  const { user } = useAuth();
  if (user == null) return <Navigate to="/login" />;

  return (
    <FullScreenContainer>
      <FullScreenContainer.Body>
        <Outlet />
      </FullScreenContainer.Body>
    </FullScreenContainer>
  );
}
