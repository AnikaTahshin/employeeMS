"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").min(10, "Phone must be at least 10 digits"),
  address: z.string().min(1, "Address is required").min(2, "Address must be at least 2 characters"),
  image: z.any().refine((file) => file instanceof File || !file, {
    message: "Please upload an image file",
  }),
});

export function AddEmployee({ addEmployee, setAddEmployee, fetchData }) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      image: "",
    },
  });

  async function onSubmit(values) {
    try {
      if (!values.name.trim()) {
        form.setError("name", {
          type: "manual",
          message: "Name is required"
        });
        return;
      }

      if (!values.email.trim()) {
        form.setError("email", {
          type: "manual",
          message: "Email is required"
        });
        return;
      }

      if (!values.phone.trim()) {
        form.setError("phone", {
          type: "manual",
          message: "Phone is required"
        });
        return;
      }

      if (!values.address.trim()) {
        form.setError("address", {
          type: "manual",
          message: "Address is required"
        });
        return;
      }

      if (!values.image) {
        form.setError("image", {
          type: "manual",
          message: "Image is required"
        });
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("email", values.email.trim());
      formData.append("phone", values.phone.trim());
      formData.append("address", values.address.trim());
      
      if (values.image) {
        formData.append("image", values.image);
      }
  
      const response = await fetch("/api/addEmployee", {
        method: "POST",
        body: formData, 
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast({
          title: "Success",
          description: "Employee added successfully",
        });
        form.reset();
        await fetchData();
        setAddEmployee(false);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to add employee",
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
    }
  }

  return (
    <Dialog open={addEmployee} onOpenChange={setAddEmployee}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
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
                    <Input 
                      placeholder="Enter Name" 
                      {...field} 
                      onBlur={() => {
                        if (!field.value.trim()) {
                          form.setError("name", {
                            type: "manual",
                            message: "Name is required"
                          });
                        }
                      }}
                    />
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
                      onBlur={() => {
                        if (!field.value.trim()) {
                          form.setError("email", {
                            type: "manual",
                            message: "Email is required"
                          });
                        }
                      }}
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
                    <Input 
                      placeholder="Enter Phone" 
                      {...field}
                      onBlur={() => {
                        if (!field.value.trim()) {
                          form.setError("phone", {
                            type: "manual",
                            message: "Phone is required"
                          });
                        }
                      }}
                    />
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
                    <Input 
                      placeholder="Enter Address" 
                      {...field}
                      onBlur={() => {
                        if (!field.value.trim()) {
                          form.setError("address", {
                            type: "manual",
                            message: "Address is required"
                          });
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) {
                          form.setError("image", {
                            type: "manual",
                            message: "Image is required"
                          });
                        } else {
                          onChange(file);
                        }
                      }}
                      onBlur={() => {
                        if (!value) {
                          form.setError("image", {
                            type: "manual",
                            message: "Image is required"
                          });
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add Employee</Button>
              <Button variant="outline" onClick={() => setAddEmployee(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}