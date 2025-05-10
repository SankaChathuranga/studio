import { PageHeader } from '@/components/shared/PageHeader';
import { BookingsTable } from '@/components/bookings/BookingsTable';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Bookings - CabPro Admin',
};

export default function ManageBookingsPage() {
  return (
    <>
      <PageHeader 
        title="Manage Bookings"
        description="View and process booking requests. New requests appear in the queue."
      />
      <BookingsTable />
    </>
  );
}
