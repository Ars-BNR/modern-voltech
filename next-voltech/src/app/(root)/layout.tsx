import { Footer, Header } from "@/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voltech | Главная",
  description: "Большой выбор техники",
};
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <div className="main__container">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
