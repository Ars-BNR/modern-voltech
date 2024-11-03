"use client";

import { useRouter } from "next/navigation";
import AuthStore from "@/shared/store/auth";
import Loader from "@/components/ui/Loader/Loader";

interface ProtectedRouteProps {
  requiredRole: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  children,
}) => {
  const profiles = AuthStore((state) => state.profiles.user);
  const isAuth = AuthStore((state) => state.isAuth);
  const isLoading = AuthStore((state) => state.isLoading);
  const router = useRouter();
  if (isLoading) {
    return <Loader />;
  }

  if (!isAuth) {
    router.replace("/login");
    return null;
  }

  if (profiles?.role !== requiredRole) {
    router.replace("/not-found");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
