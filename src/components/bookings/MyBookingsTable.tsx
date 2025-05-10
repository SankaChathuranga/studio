"use client";

import { useState, useEffect } from 'react';
import type { Booking } from '@/lib/types';
import { mockBookings } from '@/lib/mockData'; // Assuming current user ID is 'user1' for mock
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

// Mock current user ID
const MOCK_USER_ID = 'user1';

export function MyBookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching bookings for the current user
    const userBookings = mockBookings.filter(b => b.userId === MOCK_USER_ID)
      .sort((a, b) => new Date(b.bookingTime).getTime() - new Date(a.bookingTime).getTime()); // Sort by most recent
    setBookings(userBookings);
    setIsLoading(false);
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    // Mock cancellation
    setBookings(prevBookings => 
      prevBookings.map(b => 
        b.id === bookingId && (b.status === 'Pending' || b.status === 'Assigned') 
        ? { ...b, status: 'Cancelled' } 
        : b
      )
    );
    // Add toast notification here if needed
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center py-10"><RefreshCw className="mr-2 h-6 w-6 animate-spin" /> Loading your bookings...</div>;
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Bookings Yet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">You haven&apos;t made any bookings yet.</p>
            <Button asChild className="mt-4">
              <a href="/book-cab">Book Your First Ride</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
        <CardDescription>View details of your past and upcoming rides.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fare</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id.substring(0,8)}...</TableCell>
                <TableCell>{format(new Date(booking.bookingTime), "PPpp")}</TableCell>
                <TableCell>{booking.pickupLocation}</TableCell>
                <TableCell>{booking.destination}</TableCell>
                <TableCell>
                  <Badge variant={
                    booking.status === 'Completed' ? 'default' :
                    booking.status === 'Cancelled' ? 'destructive' :
                    booking.status === 'Pending' ? 'secondary' :
                    'outline'
                  }>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>{booking.fare ? `$${booking.fare.toFixed(2)}` : 'N/A'}</TableCell>
                <TableCell>
                  {(booking.status === 'Pending' || booking.status === 'Assigned') && (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
