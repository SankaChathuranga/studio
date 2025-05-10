"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Driver } from '@/lib/types';
import { mockDrivers } from '@/lib/mockData';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Edit3, Star, UserCheck, UserX, RefreshCw, SortDesc, SortAsc } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Bubble Sort implementation
function bubbleSortDriversByRating(arr: Driver[], descending: boolean = true): Driver[] {
  let n = arr.length;
  let newArray = [...arr]; // Create a new array to avoid mutating the original
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (descending) {
        if (newArray[j].rating < newArray[j + 1].rating) {
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]]; // Swap
        }
      } else {
         if (newArray[j].rating > newArray[j + 1].rating) {
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]]; // Swap
        }
      }
    }
  }
  return newArray;
}


export function DriversTable() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null);
  const [sortDescending, setSortDescending] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching drivers
    setDrivers(mockDrivers); 
    setIsLoading(false);
  }, []);

  const sortedDrivers = useMemo(() => {
    if (!drivers) return [];
    return bubbleSortDriversByRating(drivers, sortDescending);
  }, [drivers, sortDescending]);

  const handleDeleteDriver = () => {
    if (!driverToDelete) return;
    setDrivers(prevDrivers => prevDrivers.filter(d => d.id !== driverToDelete.id));
    toast({
      title: "Driver Deleted",
      description: `Driver ${driverToDelete.name} has been removed.`,
      variant: "destructive"
    });
    setDriverToDelete(null);
  };

  const toggleAvailability = (driverId: string) => {
    setDrivers(prevDrivers => 
      prevDrivers.map(d => 
        d.id === driverId ? { ...d, isAvailable: !d.isAvailable } : d
      )
    );
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center py-10"><RefreshCw className="mr-2 h-6 w-6 animate-spin" /> Loading drivers...</div>;
  }

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Driver Profiles</CardTitle>
            <CardDescription>Manage all registered drivers and their ratings.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSortDescending(prev => !prev)}>
            {sortDescending ? <SortDesc className="mr-2 h-4 w-4" /> : <SortAsc className="mr-2 h-4 w-4" />}
            Sort by Rating
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>License Plate</TableHead>
                <TableHead className="flex items-center">
                  Rating 
                  {sortDescending ? <SortDesc className="ml-1 h-4 w-4" /> : <SortAsc className="ml-1 h-4 w-4" />}
                </TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Registered On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>{driver.contact}</TableCell>
                  <TableCell>{driver.vehicleModel}</TableCell>
                  <TableCell>{driver.licensePlate}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-amber-400 fill-amber-400" />
                      {driver.rating.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={driver.isAvailable ? 'default' : 'outline'} className={driver.isAvailable ? 'bg-green-500 hover:bg-green-600 text-white' : ''}>
                      {driver.isAvailable ? 'Available' : 'Unavailable'}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(driver.createdAt), "PP")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                           <Link href={`/dashboard/drivers/edit/${driver.id}`}>
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit Driver
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleAvailability(driver.id)}>
                          {driver.isAvailable ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                          {driver.isAvailable ? 'Set Unavailable' : 'Set Available'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive focus:bg-destructive/10"
                          onClick={() => setDriverToDelete(driver)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Driver
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {driverToDelete && (
        <AlertDialog open={!!driverToDelete} onOpenChange={() => setDriverToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the driver profile 
                for <span className="font-semibold">{driverToDelete.name}</span>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteDriver} className="bg-destructive hover:bg-destructive/90">
                Delete Driver
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
