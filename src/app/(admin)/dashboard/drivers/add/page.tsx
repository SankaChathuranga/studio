import { DriverForm } from '@/components/forms/DriverForm';
import { PageHeader } from '@/components/shared/PageHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add New Driver - CabPro Admin',
};

export default function AddDriverPage() {
  return (
    <>
      <PageHeader 
        title="Add New Driver"
        description="Fill out the form to register a new driver on the platform."
      />
      <DriverForm />
    </>
  );
}
