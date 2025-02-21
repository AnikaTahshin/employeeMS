"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useAppContext } from "../../../context/context";
// import Loader from "../(components)/Loader";
import { ClipLoader } from "react-spinners";
import { AddEmployee } from "../(components)/AddEmployee/AddEmployee";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  address: z.string().min(2, "Address must be at least 2 characters"),
});

const TableViewPage = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);

  const [selectedData, setSelectedData] = useState(null);
  const { toast } = useToast();

  const { searchQuery, loading, setLoading } = useAppContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const fetchData = async () => {
    try {
      setLoading(true); 
  
      const response = await fetch(`${BASE_URL}/api/lists`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); 
  
      console.log("Fetched data:", data);
  
      setEmployeeData(data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };
  

  const handleEdit = (item) => {
    setSelectedData(item);
    setIsEdit(true);
    form.reset({
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address,
    });
  };

  const handleDelete = async (item) => {
    setSelectedData(item);
    setIsDelete(true);
  };

  const deleteEmployee = async () => {
    try {
      let id = selectedData?.id;
      const response = await fetch(`${BASE_URL}/api/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.ok) {
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

  const onSubmit = async (values) => {
    try {
      if (!selectedData?.id) {
        toast({
          title: "Error",
          description: "Invalid Employee ID",
          variant: "destructive",
        });
        return;
      }
  
      setLoading(true); 
  
      const response = await fetch(`${BASE_URL}/api/edit/${selectedData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), 
      });
  
      const responseData = await response.json(); 
      setIsEdit(false)
      // console.log("Editing Response:", responseData);
  
      if (responseData?.statusbar == 200) {
        toast({
          title: "Success",

          description: responseData?.message,
          
        });
        await fetchData();
        setIsEdit(false);
      } else {
        toast({
          title: "Error",
          description: responseData?.error || "Failed to update employee",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false); 
    }
  };
  

  useEffect(() => {
    if (!searchQuery) {
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

  // console.log("hello data", filteredData)

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color={"#000"} size={50} />
        </div>
      ) : (
        <>
          <div className="p-4">
            <Button
              className="bg-blue-500 hover:bg-gray-500"
              onClick={() => setAddEmployee(true)}
            >
              Add Employee
            </Button>
          </div>

          {addEmployee && (
            <AddEmployee
              addEmployee={addEmployee}
              setAddEmployee={setAddEmployee}
              fetchData={fetchData}
            />
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="w-[100px] text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData?.map((item) => (
                <TableRow key={item?.id}>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="font-medium">{item?.name}</TableCell>
                  <TableCell>{item?.email}</TableCell>
                  <TableCell>{item?.phone}</TableCell>
                  <TableCell>{item?.address}</TableCell>

                  <TableCell className="w-[100px]">
                    <div className="flex justify-center items-center space-x-2">
                      <Button
                        variant="outline"
                        className="bg-blue-500 hover:bg-gray-500"
                        onClick={() => handleEdit(item)}
                      >
                        <MdModeEdit
                          className="text-white cursor-pointer"
                          size={25}
                        />
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-red-500 hover:bg-gray-500"
                        onClick={() => handleDelete(item)}
                      >
                        <MdDelete
                          className="text-white cursor-pointer"
                          size={25}
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No employees found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      )}

      {/* DELETE DIALOG BOX */}
      <Dialog open={isDelete} onOpenChange={setIsDelete}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this employee?</p>
          <div className="flex justify-between">
            <Button onClick={deleteEmployee}>Delete</Button>
            <Button variant="outline" onClick={() => setIsDelete(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG BOX */}
      <Dialog open={isEdit} onOpenChange={setIsEdit} >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
                <Button type="button" variant="outline" onClick={() => {console.log("click cancel"); setIsEdit(false)}}>
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableViewPage;
