"use client";

import { Providers } from "@/components/shared/providers";
import "./globals.css";
import AuthStore from "@/shared/store/auth";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const checkAuth = AuthStore((state) => state.checkAuth);
  const isLoading = AuthStore((state) => state.isLoading);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth();
    }
  }, []);

  return (
    <html lang="en">
      <head></head>
      <body>
        {isLoading ? (
          <div className="wrapper">
            <main className="main">
              <div className="main__container">
                <Loader />
              </div>
            </main>
          </div>
        ) : (
          <Providers>{children}</Providers>
        )}
      </body>
    </html>
  );
}
