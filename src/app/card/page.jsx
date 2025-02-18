"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CardViewPage = () => {

  const [employeeData, setEmployeeData] = useState()
  const fetchData = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setEmployeeData(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {employeeData?.map((item) => (
        <Card>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{item?.email}</p>
          <p>{item?.phone}</p>
          <p>{item?.address}</p>

        </CardContent>
        
      </Card>
      )) }
    </>
  );
};

export default CardViewPage;
