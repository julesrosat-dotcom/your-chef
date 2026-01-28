import { AuthLayout } from '@/components/auth/auth-layout';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export const metadata = {
  title: 'Mot de passe oublié - GetChef',
  description: 'Réinitialisez votre mot de passe GetChef',
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Mot de passe oublié ?"
      subtitle="Entrez votre email, nous vous enverrons un lien de réinitialisation"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
