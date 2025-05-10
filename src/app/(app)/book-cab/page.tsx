import { BookingForm } from '@/components/forms/BookingForm';
import { PageHeader } from '@/components/shared/PageHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Cab - CabPro',
};

export default function BookCabPage() {
  return (
    <>
      <PageHeader 
        title="Book a New Cab"
        description="Enter your ride details to find a cab quickly and easily."
      />
      <BookingForm />
    </>
  );
}
