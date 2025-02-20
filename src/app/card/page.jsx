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

import avater from "../../../public/images/avater2.png"

const CardViewPage = () => {
  const [employeeData, setEmployeeData] = useState();
  const fetchData = async () => {
    try {
      const response = await fetch("/api/lists");
      const data = await response.json();
      setEmployeeData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-around items-center">
        {employeeData?.map((item) => (
          //   <Card key={item?.id} className="bg-white border border-gray-200 shadow-lg">
          //   <CardHeader>
          //     <CardTitle>{item?.name}</CardTitle>
          //   </CardHeader>
          //   <CardContent>
          //     <p>{item?.email}</p>
          //     <p>{item?.phone}</p>
          //     <p>{item?.address}</p>

          //     {item?.image ? (
          //             <div className="w-16 h-16">
          //               <img
          //                 src={
          //                   item.image.startsWith("/")
          //                     ? item.image
          //                     : `/${item.image}`
          //                 }
          //                 alt={`${item.name}'s photo`}
          //                 className="w-full h-full object-cover rounded-full"
          //               />
          //             </div>
          //           ) : (
          //             "No image"
          //           )}

          //   </CardContent>

          // </Card>

          <Card
            key={item?.id}
            className="w-80 bg-gray-100 border border-gray-300 shadow-md rounded-lg"
          >
            <CardHeader className="flex items-center p-4">
              {/* <img
                src="/images/avatar.jpg"
                alt="Profile"
              /> */}

              {item?.image ? (
                <div className="w-16 h-16">
                  <img
                    src={
                      item.image.startsWith("/") ? item.image : avater
                    }
                    alt={`${item.name}'s photo`}
                    // className="w-full h-full object-cover rounded-full"
                    className="w-14 h-14 rounded-full"
                  />
                </div>
              ) : (
                <img
                    src={
                       avater
                    }
                    alt={`${item.name}'s photo`}
                    // className="w-full h-full object-cover rounded-full"
                    className="w-14 h-14 rounded-full"
                  />
              )}
              <div className="ml-4">
                <CardTitle className="text-lg font-bold">
                  {item?.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                 {item?.email}
                </CardDescription>
                <CardDescription className="text-sm text-gray-600">
                 {item?.address}
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardFooter className="flex justify-between p-4">
              <button className="bg-blue-500 text-white py-1 px-4 rounded">
                Follow
              </button>
              <button className="text-blue-500">Message</button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CardViewPage;
