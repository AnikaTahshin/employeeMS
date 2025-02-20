"use client";

import React from "react";
import Navbar from "./(components)/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./(components)/Sidebar";
import { useAppContext } from "../../context/context";
const Wrapper = ({ children }) => {

  const{isClick, setIsClick} = useAppContext()
  return (
    <SidebarProvider>
      <div className={`flex bg-gray-50 text-gray-900 w-full min-w-screen`}>
        <AppSidebar className={isClick ? "flex" : "hidden"} />
        <main className={`flex flex-col w-full h-full bg-gray-200`}>
          <Navbar />

          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Wrapper;
