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
import { AddEmployee } from "../(components)/AddEmployee";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  address: z.string().min(2, "Address must be at least 2 characters"),
});

const TableViewPage = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);

  const [selectedData, setSelectedData] = useState(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/lists");
      const data = await response.json();
      setEmployeeData(data);
    } catch (error) {
      console.log(error);
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
      console.log("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values) => {
    try {
      const body = {
        id: selectedData?.id,
        ...values,
      };

      const response = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Employee updated successfully",
        });
        await fetchData();
        setIsEdit(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to update employee",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>

    <div className="w-[100px] p-4">
    <Button  onClick={() => setAddEmployee(true)}>Add Employee</Button>

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
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employeeData?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell className="font-medium">{item?.name}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.phone}</TableCell>
              <TableCell>{item?.address}</TableCell>
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
              <TableCell className="text-right">
                <div className="flex flex-row justify-center items-center">
                  <Button variant="outline" onClick={() => handleEdit(item)}>
                    <MdModeEdit
                      className="border border-spacing-2 border-black m-2 rounded-lg cursor-pointer"
                      size={25}
                    />
                  </Button>
                  <Button variant="outline" onClick={() => handleDelete(item)}>
                    <MdDelete
                      className="border border-spacing-2 border-black m-2 rounded-lg cursor-pointer"
                      size={25}
                    />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ADD EMPLOYEE STARTS */}

      {/* ADD EMPLOYEE ENDS */}

      {/* DELTE DIALOG BOX STARTED */}

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

      {/* DELETE DIALOG BOX ENDS */}
      {/* EDIT DIALOG BOX STARTED */}
      <Dialog open={isEdit} onOpenChange={setIsEdit}>
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
                <Button variant="outline" onClick={() => setIsEdit(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* eDIT DIALOG BOX ENDS */}
    </>
  );
};

export default TableViewPage;
