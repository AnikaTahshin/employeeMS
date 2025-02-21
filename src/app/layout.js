import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Wrapper from "./wrapper";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "../../context/context";
import { ThemeProvider } from "./(components)/theme-provider";
import { cn } from "@/lib/utils";





export const metadata = {
  title: "Employee Management",
  description: "Employee Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      suppressHydrationWarning
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
      )}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
