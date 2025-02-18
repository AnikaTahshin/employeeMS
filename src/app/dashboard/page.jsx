"use client";

import { usePathname } from "next/navigation";
import React from "react";
import CardViewPage from "../card/page";
import TableViewPage from "../table/page";

const Dashboard = () => {
  const pathname = usePathname();
  return (
    <>
      <h2>Dashboard home</h2>
    </>
  );
};

export default Dashboard;
