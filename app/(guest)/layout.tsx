import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Store Builder Platform",
  description: "Build your own store with our platform",
};

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} min-h-screen flex flex-col`}>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
} 