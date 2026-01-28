import { AuthLayout } from '@/components/auth/auth-layout';
import { UnifiedAuthForm } from '@/components/auth/unified-auth-form';

export const metadata = {
  title: 'Connexion - GetChef',
  description: 'Connectez-vous à votre compte GetChef',
};

export default function SigninPage() {
  return (
    <AuthLayout
      title="Créer un compte ou se connecter"
      subtitle="Accédez à votre compte pour gérer vos réservations"
    >
      <UnifiedAuthForm initialMode="signin" />
    </AuthLayout>
  );
}
