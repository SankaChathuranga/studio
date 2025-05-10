import { ProfileForm } from '@/components/forms/ProfileForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile - CabPro',
};

export default function ProfilePage() {
  return <ProfileForm />;
}
