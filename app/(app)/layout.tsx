import { AuthHeader } from '@/components/layout/auth-header';
import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AuthHeader />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
