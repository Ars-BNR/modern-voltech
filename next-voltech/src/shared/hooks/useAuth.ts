"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import AuthStore from "../store/auth";
const useAuth = (requiredRole: string) => {
  const router = useRouter();
  const profiles = AuthStore((state) => state.profiles);

  useEffect(() => {
    const checkAuth = () => {
      if (profiles.user.role === requiredRole) {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    };

    checkAuth();
  }, []);
};

export default useAuth;
