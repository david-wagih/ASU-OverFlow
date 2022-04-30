import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { adminEmails } from "../utils/adminEmails";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, status } = useSession();

  // @ts-nocheck
  useEffect(() => {
    if (
      status === "unauthenticated" ||
      // @ts-ignore
      !adminEmails.includes(String(data.user?.email))
    ) {
      router.push("/");
    }
    // @ts-ignore
  }, [data.user?.email, router, status]);

  if (status === "unauthenticated") return null;

  return <>{children}</>;
};

export default ProtectedRoute;
