export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  createdAt: Date;
}

export interface Driver {
  id: string;
  name: string;
  contact: string;
  vehicleModel: string;
  licensePlate: string;
  rating: number; // e.g., 1-5
  isAvailable: boolean;
  createdAt: Date;
}

export type BookingStatus = "Pending" | "Assigned" | "InProgress" | "Completed" | "Cancelled";

export interface Booking {
  id: string;
  userId: string; // Link to User
  driverId?: string; // Link to Driver, optional until assigned
  pickupLocation: string;
  destination: string;
  bookingTime: Date;
  status: BookingStatus;
  fare?: number;
  createdAt: Date;
}
