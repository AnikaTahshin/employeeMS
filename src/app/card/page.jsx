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
import { useToast } from "@/hooks/use-toast";

import avater from "../../../public/images/avater2.png";
import { useAppContext } from "../../../context/context";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";

const CardViewPage = () => {
  const [employeeData, setEmployeeData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { toast } = useToast();
  const { loading, setLoading  } = useAppContext();

  const handleDelete = async (item) => {
    setSelectedData(item);
    setIsDelete(true);
  };

  const deleteEmployee = async () => {
    try {
      let id = selectedData?.id;
      const response = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          variant: "destructive",
          title: "Success",
          description: "Employee deleted successfully",
        });
        await fetchData();
        setIsDelete(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to delete employee",
          variant: "destructive",
        });
      }
    } catch (error) {
      // console.log("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch("/api/lists");
      const data = await response.json();
      setLoading(false)
      setEmployeeData(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const { searchQuery } = useAppContext();
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(employeeData);
    } else {
      const searchLower = searchQuery.toLowerCase();
      const filtered = employeeData.filter(
        (employee) =>
          employee.name?.toLowerCase().includes(searchLower) ||
          employee.email?.toLowerCase().includes(searchLower)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, employeeData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {
        loading ? 
        
        <div className="flex justify-center items-center h-screen">
      <ClipLoader color={"#000"} size={50} />
    </div>
        :

        (
          <div className="flex flex-col sm:flex-row justify-around items-center">
        {filteredData?.map((item) => (
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
                <div className="w-20 h-20">
                  <img
                    src={item.image.startsWith("/") ? item.image : avater}
                    alt={`${item.name}'s photo`}
                    // className="w-full h-full object-cover rounded-full"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              ) : (
                <img
                  src={avater}
                  alt={`${item.name}'s photo`}
                  // className="w-full h-full object-cover rounded-full"
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div className="ml-4">
                <CardTitle className="text-lg font-bold">
                  {item?.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {item?.phone}
                </CardDescription>
                <CardDescription className="text-sm text-gray-600">
                  {item?.email}
                </CardDescription>
                <CardDescription className="text-sm text-gray-600">
                  {item?.address}
                </CardDescription>
              </div>
            </CardHeader>

            <CardFooter className="flex justify-center p-4">
              <Button
                onClick={() => handleDelete(item)}
                className="bg-blue-500 hover:bg-gray-500 text-white py-1 px-4 rounded"
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredData?.length == 0 && "No Data Found"}
      </div>
        )
      }

      <Dialog open={isDelete} onOpenChange={setIsDelete}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
          </DialogHeader>
          <h1>Are you sure to delete?</h1>

          <div className="flex flex-row items-center justify-between">
            <Button onClick={deleteEmployee}>Delete</Button>
            <Button variant="outline" onClick={() => setIsDelete(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardViewPage;
