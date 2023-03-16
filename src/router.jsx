import React from "react";
import { RootLayout } from "./pages/layout/RootLayout";
import UserPage from "./pages/UserPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/layout/AuthLayout";
import { AuthProvider } from "./context/AuthContext";

export const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: ":userId",
            element: <UserPage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
    ],
  },
]);

function ContextWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
