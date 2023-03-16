import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import FullScreenContainer from "../../components/Layout/FullScreenContainer";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@chakra-ui/react";

export function AuthLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const isLoginPage = location.pathname === "/login";
  if (user) return <Navigate to="/" />;
  return (
    <FullScreenContainer>
      <FullScreenContainer.Auth>
        <Outlet />
        <FullScreenContainer.BelowCard>
          <Link to={isLoginPage ? "/signup" : "/login"}>
            <Button
              color={"whiteAlpha.800"}
              bgGradient="linear(to-r, purple.400, yellow.500)"
              _hover={{
                bgGradient: "linear(to-l, red.500, yellow.500)",
              }}
              minW={"150px"}
            >
              {isLoginPage ? "Create Account" : "Back to Login"}
            </Button>
          </Link>
        </FullScreenContainer.BelowCard>
      </FullScreenContainer.Auth>
    </FullScreenContainer>
  );
}
