import { AuthLayout } from '@/components/auth/auth-layout';
import { SigninForm } from '@/components/auth/signin-form';

export const metadata = {
  title: 'Connexion - GetChef',
  description: 'Connectez-vous à votre compte GetChef',
};

export default function SigninPage() {
  return (
    <AuthLayout
      title="Connectez-vous"
      subtitle="Accédez à votre compte pour gérer vos réservations"
    >
      <SigninForm />
    </AuthLayout>
  );
}
