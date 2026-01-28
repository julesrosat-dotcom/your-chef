import { AuthLayout } from '@/components/auth/auth-layout';
import { UnifiedAuthForm } from '@/components/auth/unified-auth-form';

export const metadata = {
  title: 'Inscription - GetChef',
  description: 'Créez votre compte GetChef',
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Créer un compte ou se connecter"
      subtitle="Rejoignez des milliers de gourmets satisfaits"
    >
      <UnifiedAuthForm initialMode="signup" />
    </AuthLayout>
  );
}
