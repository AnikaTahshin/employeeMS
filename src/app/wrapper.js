"use client"

import React from "react";
import Navbar from "./(components)/Navbar";
// import AppSidebar from "./(components)/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./(components)/Sidebar";
// import { Sidebar } from "@/components/app-sidebar"
const Wrapper = ({ children }) => {
  return (
//     <div className={`flex bg-gray-50 text-gray-900 w-full min-w-screen`}>
// <Sidebar />
//       <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-200`}>
//       <Navbar />
//       {children}

//       </main>
//     </div>


<SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Wrapper;
