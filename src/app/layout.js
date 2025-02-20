import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Wrapper from "./wrapper";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "../../context/context";
import { ThemeProvider } from "./(components)/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Employee Management",
  description: "Employee Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
        <AuthProvider>
          <Wrapper>
            <Toaster />
            
              {children}
          </Wrapper>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
