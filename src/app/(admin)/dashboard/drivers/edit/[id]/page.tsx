"use client"; // This page needs to be a client component to access params

import { DriverForm } from '@/components/forms/DriverForm';
import { PageHeader } from '@/components/shared/PageHeader';
import { mockDrivers } from '@/lib/mockData'; // For fetching initial data
import type { Driver } from '@/lib/types';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

// No Next.js metadata for client components using hooks like useParams.
// Title can be set dynamically in useEffect if needed, or rely on layout.

export default function EditDriverPage() {
  const params = useParams();
  const driverId = params.id as string;
  const [driver, setDriver] = useState<Driver | null | undefined>(undefined); // undefined for loading state

  useEffect(() => {
    if (driverId) {
      // Simulate fetching driver data
      const foundDriver = mockDrivers.find(d => d.id === driverId);
      setDriver(foundDriver || null); // Set to null if not found
    }
  }, [driverId]);

  if (driver === undefined) {
    return <div className="flex justify-center items-center h-64"><RefreshCw className="mr-2 h-6 w-6 animate-spin" /> Loading driver details...</div>;
  }

  if (driver === null) {
    return <PageHeader title="Driver Not Found" description="The requested driver profile could not be located." />;
  }
  
  return (
    <>
      <PageHeader 
        title={`Edit Driver: ${driver.name}`}
        description="Update the driver's information and settings."
      />
      <DriverForm initialData={driver} driverId={driverId} />
    </>
  );
}
