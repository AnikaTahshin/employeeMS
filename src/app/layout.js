import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Wrapper from "./wrapper";
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "../../context/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Wrapper>
        <Toaster />

        {children}

        </Wrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
