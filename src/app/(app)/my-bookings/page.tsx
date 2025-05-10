import { MyBookingsTable } from '@/components/bookings/MyBookingsTable';
import { PageHeader } from '@/components/shared/PageHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Bookings - CabPro',
};

export default function MyBookingsPage() {
  return (
    <>
      <PageHeader 
        title="My Bookings"
        description="Track your current and past cab bookings."
      />
      <MyBookingsTable />
    </>
  );
}
