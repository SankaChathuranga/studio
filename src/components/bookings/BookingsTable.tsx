"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Booking, Driver } from '@/lib/types';
import { mockBookings, mockDrivers } from '@/lib/mockData';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, CheckCircle, XCircle, Truck, UserCircle, RefreshCw, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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


export function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingToManage, setBookingToManage] = useState<Booking | null>(null);
  const [actionType, setActionType] = useState<"assign" | "complete" | "cancel" | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching bookings (FIFO order by creation usually)
    // For queue: sort by createdAt ascending for pending, then others
    const sortedBookings = [...mockBookings].sort((a, b) => {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        if (a.status !== 'Pending' && b.status === 'Pending') return 1;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    setBookings(sortedBookings);
    setDrivers(mockDrivers.filter(d => d.isAvailable)); // Only available drivers
    setIsLoading(false);
  }, []);

  const filteredBookings = useMemo(() => {
    if (filterStatus === "all") return bookings;
    return bookings.filter(b => b.status.toLowerCase() === filterStatus.toLowerCase());
  }, [bookings, filterStatus]);

  const handleManageBooking = () => {
    if (!bookingToManage || !actionType) return;

    let updateMsg = "";
    setBookings(prevBookings =>
      prevBookings.map(b => {
        if (b.id === bookingToManage.id) {
          if (actionType === "assign" && selectedDriver) {
            updateMsg = `Booking assigned to driver.`;
            return { ...b, status: 'Assigned', driverId: selectedDriver };
          }
          if (actionType === "complete") {
            updateMsg = `Booking marked as completed.`;
            return { ...b, status: 'Completed' };
          }
          if (actionType === "cancel") {
            updateMsg = `Booking cancelled.`;
            return { ...b, status: 'Cancelled' };
          }
        }
        return b;
      })
    );
    
    toast({
      title: "Booking Updated",
      description: updateMsg || `Booking ${bookingToManage.id.substring(0,8)} status updated.`,
    });

    setBookingToManage(null);
    setActionType(null);
    setSelectedDriver(undefined);
  };
  
  const openModal = (booking: Booking, type: "assign" | "complete" | "cancel") => {
    setBookingToManage(booking);
    setActionType(type);
    if (type === "assign") setSelectedDriver(undefined); // Reset driver selection
  };

  if (isLoading) {
    return <div className="flex justify-center items-center py-10"><RefreshCw className="mr-2 h-6 w-6 animate-spin" /> Loading bookings...</div>;
  }

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Booking Queue & Management</CardTitle>
            <CardDescription>Process and manage all cab booking requests.</CardDescription>
          </div>
           <div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="InProgress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer (User ID)</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Booking Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Driver</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id} className={booking.status === 'Pending' ? 'bg-primary/5' : ''}>
                  <TableCell className="font-medium">{booking.id.substring(0,8)}...</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                        <UserCircle className="h-4 w-4 mr-2 text-muted-foreground"/> {booking.userId}
                    </div>
                  </TableCell>
                  <TableCell>
                    From: {booking.pickupLocation}<br/>
                    To: {booking.destination}
                  </TableCell>
                  <TableCell>{format(new Date(booking.bookingTime), "PPpp")}</TableCell>
                  <TableCell>
                    <Badge variant={
                      booking.status === 'Completed' ? 'default' :
                      booking.status === 'Cancelled' ? 'destructive' :
                      booking.status === 'Pending' ? 'secondary' : // Highlight pending
                      'outline'
                    }
                    className={booking.status === 'Pending' ? 'bg-amber-500 text-white hover:bg-amber-600' : ''}
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {booking.driverId ? (drivers.find(d=>d.id === booking.driverId)?.name || booking.driverId.substring(0,8)+'...') : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Manage Booking</DropdownMenuLabel>
                        {booking.status === 'Pending' && (
                          <DropdownMenuItem onClick={() => openModal(booking, "assign")}>
                            <Truck className="mr-2 h-4 w-4" /> Assign Driver
                          </DropdownMenuItem>
                        )}
                        {(booking.status === 'Assigned' || booking.status === 'InProgress') && (
                          <DropdownMenuItem onClick={() => openModal(booking, "complete")}>
                            <CheckCircle className="mr-2 h-4 w-4" /> Mark as Completed
                          </DropdownMenuItem>
                        )}
                        {booking.status !== 'Completed' && booking.status !== 'Cancelled' && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive focus:bg-destructive/10"
                              onClick={() => openModal(booking, "cancel")}
                            >
                              <XCircle className="mr-2 h-4 w-4" /> Cancel Booking
                            </DropdownMenuItem>
                          </>
                        )}
                         {booking.status === 'Completed' || booking.status === 'Cancelled' ? 
                            <DropdownMenuItem disabled>No actions available</DropdownMenuItem> : null}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {filteredBookings.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No bookings match the current filter.</p>
          )}
        </CardContent>
      </Card>

      {bookingToManage && actionType && (
        <AlertDialog open={!!bookingToManage} onOpenChange={() => { setBookingToManage(null); setActionType(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {actionType === 'assign' && 'Assign Driver'}
                {actionType === 'complete' && 'Complete Booking'}
                {actionType === 'cancel' && 'Cancel Booking'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {actionType === 'assign' && `Select a driver for booking ${bookingToManage.id.substring(0,8)}...`}
                {actionType === 'complete' && `Are you sure you want to mark booking ${bookingToManage.id.substring(0,8)} as completed?`}
                {actionType === 'cancel' && `Are you sure you want to cancel booking ${bookingToManage.id.substring(0,8)}? This cannot be undone.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            {actionType === 'assign' && (
              <div className="py-4">
                <Select onValueChange={setSelectedDriver} value={selectedDriver}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an available driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.filter(d => d.isAvailable).map(driver => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name} (Rating: {driver.rating.toFixed(1)}) - {driver.vehicleModel}
                      </SelectItem>
                    ))}
                    {drivers.filter(d => d.isAvailable).length === 0 && <p className="p-2 text-sm text-muted-foreground">No available drivers.</p>}
                  </SelectContent>
                </Select>
              </div>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel>Back</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleManageBooking} 
                disabled={actionType === 'assign' && !selectedDriver}
                className={actionType === 'cancel' ? "bg-destructive hover:bg-destructive/90" : ""}
              >
                {actionType === 'assign' && 'Assign'}
                {actionType === 'complete' && 'Mark Completed'}
                {actionType === 'cancel' && 'Confirm Cancel'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
