import { PageHeader } from '@/components/shared/PageHeader';
import { DriversTable } from '@/components/drivers/DriversTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Drivers - CabPro Admin',
};

export default function ManageDriversPage() {
  return (
    <>
      <PageHeader 
        title="Manage Drivers"
        description="View, add, edit, or remove driver profiles. Drivers are sorted by rating."
        action={
          <Button asChild>
            <Link href="/dashboard/drivers/add">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Driver
            </Link>
          </Button>
        }
      />
      <DriversTable />
    </>
  );
}
