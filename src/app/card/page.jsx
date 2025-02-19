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
      const response = await fetch("/api/lists");
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
    <div className="flex flex-row justify-between items-center">
      {employeeData?.map((item) => (
        <Card key={item?.id}>
        <CardHeader>
          <CardTitle>{item?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{item?.email}</p>
          <p>{item?.phone}</p>
          <p>{item?.address}</p>

          {item?.image ? (
                  <div className="w-16 h-16">
                    <img
                      src={
                        item.image.startsWith("/")
                          ? item.image
                          : `/${item.image}`
                      }
                      alt={`${item.name}'s photo`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                ) : (
                  "No image"
                )}

        </CardContent>
        
      </Card>
      )) }

</div>
    </>
  );
};

export default CardViewPage;
