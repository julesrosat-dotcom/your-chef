import { AuthLayout } from '@/components/auth/auth-layout';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export const metadata = {
  title: 'Nouveau mot de passe - GetChef',
  description: 'Créez votre nouveau mot de passe',
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Nouveau mot de passe"
      subtitle="Choisissez un nouveau mot de passe sécurisé"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
