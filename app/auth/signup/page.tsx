import { AuthLayout } from '@/components/auth/auth-layout';
import { SignupForm } from '@/components/auth/signup-form';

export const metadata = {
  title: 'Inscription - GetChef',
  description: 'Créez votre compte GetChef',
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Créez votre compte"
      subtitle="Rejoignez des milliers de gourmets satisfaits"
    >
      <SignupForm />
    </AuthLayout>
  );
}
