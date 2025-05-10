import { PageHeader } from '@/components/shared/PageHeader';
import { UsersTable } from '@/components/users/UsersTable';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Users - CabPro Admin',
};

export default function ManageUsersPage() {
  return (
    <>
      <PageHeader 
        title="Manage Users"
        description="View, edit, or remove user accounts."
      />
      <UsersTable />
    </>
  );
}
