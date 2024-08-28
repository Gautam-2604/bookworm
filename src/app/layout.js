import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Providers from "./provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bookworm",
  description: "Book Exchange Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
          <Header/>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}