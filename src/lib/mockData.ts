import type { User, Driver, Booking, BookingStatus } from './types';

export const mockUsers: User[] = [
  { id: 'user1', name: 'Alice Wonderland', email: 'alice@example.com', role: 'customer', createdAt: new Date('2023-01-10T10:00:00Z') },
  { id: 'user2', name: 'Bob The Builder', email: 'bob@example.com', role: 'customer', createdAt: new Date('2023-01-12T11:30:00Z') },
  { id: 'user3', name: 'Charlie Admin', email: 'charlie.admin@example.com', role: 'admin', createdAt: new Date('2023-01-05T09:00:00Z') },
  { id: 'user4', name: 'Diana Prince', email: 'diana@example.com', role: 'customer', createdAt: new Date('2023-02-01T14:00:00Z') },
];

export const mockDrivers: Driver[] = [
  { id: 'driver1', name: 'John Smith', contact: '555-1234', vehicleModel: 'Toyota Camry', licensePlate: 'DRV-001', rating: 4.8, isAvailable: true, createdAt: new Date('2023-01-15T08:00:00Z') },
  { id: 'driver2', name: 'Maria Garcia', contact: '555-5678', vehicleModel: 'Honda Civic', licensePlate: 'DRV-002', rating: 4.5, isAvailable: false, createdAt: new Date('2023-01-20T09:30:00Z') },
  { id: 'driver3', name: 'David Lee', contact: '555-9101', vehicleModel: 'Ford Focus', licensePlate: 'DRV-003', rating: 4.9, isAvailable: true, createdAt: new Date('2023-02-01T10:00:00Z') },
  { id: 'driver4', name: 'Sarah Miller', contact: '555-1122', vehicleModel: 'Chevrolet Malibu', licensePlate: 'DRV-004', rating: 4.2, isAvailable: true, createdAt: new Date('2023-02-05T11:00:00Z') },
  { id: 'driver5', name: 'Kevin Brown', contact: '555-3344', vehicleModel: 'Tesla Model 3', licensePlate: 'DRV-005', rating: 5.0, isAvailable: false, createdAt: new Date('2023-02-10T12:00:00Z') },
];

export const mockBookings: Booking[] = [
  { 
    id: 'booking1', 
    userId: 'user1', 
    pickupLocation: '123 Main St', 
    destination: '456 Oak Ave', 
    bookingTime: new Date('2024-07-20T10:00:00Z'), 
    status: 'Pending' as BookingStatus, 
    createdAt: new Date('2024-07-19T14:30:00Z') 
  },
  { 
    id: 'booking2', 
    userId: 'user2', 
    driverId: 'driver1',
    pickupLocation: '789 Pine Rd', 
    destination: '101 Maple Dr', 
    bookingTime: new Date('2024-07-20T11:30:00Z'), 
    status: 'Assigned' as BookingStatus, 
    fare: 25.50,
    createdAt: new Date('2024-07-19T16:00:00Z') 
  },
  { 
    id: 'booking3', 
    userId: 'user1', 
    driverId: 'driver3',
    pickupLocation: '222 Elm St', 
    destination: '333 Birch Ln', 
    bookingTime: new Date('2024-07-18T15:00:00Z'), 
    status: 'Completed' as BookingStatus, 
    fare: 18.75,
    createdAt: new Date('2024-07-18T10:00:00Z') 
  },
   { 
    id: 'booking4', 
    userId: 'user4', 
    pickupLocation: 'Innovation Hub', 
    destination: 'City Center Mall', 
    bookingTime: new Date('2024-07-21T09:00:00Z'), 
    status: 'Pending' as BookingStatus, 
    createdAt: new Date('2024-07-20T11:00:00Z') 
  },
];
