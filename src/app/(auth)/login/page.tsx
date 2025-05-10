import { LoginForm } from '@/components/forms/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - CabPro',
};

export default function LoginPage() {
  return <LoginForm />;
}
