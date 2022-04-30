import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

// we can add here all the wanted routes to be protected
const authRoutes = ["/ProfilePage", "/QuestionsPage", "/adminPage"];

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoute> {children} </ProtectedRoute>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default AuthWrapper;
