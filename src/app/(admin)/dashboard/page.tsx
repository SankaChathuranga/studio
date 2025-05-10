import { PageHeader } from '@/components/shared/PageHeader';
import { AdminDashboardClient } from '@/components/dashboard/AdminDashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - CabPro',
};

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader 
        title="Admin Dashboard"
        description="Overview of the CabPro platform."
      />
      <AdminDashboardClient />
    </>
  );
}
