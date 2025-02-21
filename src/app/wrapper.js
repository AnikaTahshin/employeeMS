"use client";

import React from "react";
import Navbar from "./(components)/Navbar/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./(components)/Sidebar/AppSidebar";
import { useAppContext } from "../../context/context";
import Loader from "./(components)/Loader/Loader";
// import { ThemeProvider } from "./(components)/theme-provider";
const Wrapper = ({ children }) => {
  const { loading, setLoading } = useAppContext();

  return (
    <>
      {/* {
          loading && 
          <Loader />
        } */}
      <SidebarProvider>
        <div className={`flex bg-gray-50 text-gray-900 w-full min-w-screen`}>
          <AppSidebar />
          <main className={`flex flex-col w-full h-full bg-gray-200`}>
            <Navbar />

            <SidebarTrigger />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Wrapper;
