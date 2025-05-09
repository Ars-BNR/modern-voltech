/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "7000",
      },
      {
        protocol: "http",
        hostname: "server",
        port: "7000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "7000",
        pathname: "/img/**",
      },
      {
        protocol: "http",
        hostname: "server",
        port: "7000",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
