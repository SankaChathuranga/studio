"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import type { Driver } from "@/lib/types";

const driverFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: "Invalid contact format (e.g., 555-123-4567)." }),
  vehicleModel: z.string().min(2, { message: "Vehicle model is required." }),
  licensePlate: z.string().min(3, { message: "License plate is required." }),
  rating: z.coerce.number().min(1).max(5, { message: "Rating must be between 1 and 5." }),
  isAvailable: z.boolean().default(true),
});

interface DriverFormProps {
  initialData?: Driver | null; // For editing
  driverId?: string; // For editing
}

export function DriverForm({ initialData, driverId }: DriverFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formTitle = initialData ? "Edit Driver Profile" : "Add New Driver";
  const formDescription = initialData ? "Update the driver's details." : "Enter the new driver's information.";
  const actionButtonText = initialData ? "Save Changes" : "Add Driver";

  const form = useForm<z.infer<typeof driverFormSchema>>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      contact: initialData.contact || '', // Ensure contact is string
      rating: initialData.rating || 3, // Default rating for new/missing
    } : {
      name: "",
      contact: "",
      vehicleModel: "",
      licensePlate: "",
      rating: 3, // Default initial rating
      isAvailable: true,
    },
  });
  
  useEffect(() => {
    if (initialData) {
        form.reset({
            ...initialData,
            contact: initialData.contact || '',
            rating: initialData.rating || 3,
            isAvailable: initialData.isAvailable === undefined ? true : initialData.isAvailable,
        });
    }
  }, [initialData, form]);


  async function onSubmit(values: z.infer<typeof driverFormSchema>) {
    setIsSubmitting(true);
    console.log("Driver data:", values);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: initialData ? "Driver Updated" : "Driver Added",
      description: `${values.name}'s profile has been ${initialData ? 'updated' : 'added'}.`,
    });
    
    router.push("/dashboard/drivers"); // Redirect to drivers list
    // router.refresh(); // If using server actions to update list
    setIsSubmitting(false);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{formTitle}</CardTitle>
        <CardDescription>{formDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Driver's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 555-123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Model</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Toyota Camry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Plate</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ABC-123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Rating (1-5)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" min="1" max="5" placeholder="e.g., 4.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <Select onValueChange={(value) => field.onChange(value === "true")} defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Set availability status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Available</SelectItem>
                        <SelectItem value="false">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (initialData ? "Saving..." : "Adding...") : actionButtonText}
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
