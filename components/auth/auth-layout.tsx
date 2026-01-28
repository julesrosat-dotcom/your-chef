import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <div className="text-3xl font-bold">
                <span className="text-orange-500">GET</span>
                <span className="text-gray-400">CHEF</span>
              </div>
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 p-12">
        <div className="max-w-lg space-y-8">
          <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=600&fit=crop"
              alt="Chef"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-4 text-center">
            <h3 className="text-2xl font-bold text-gray-900">
              Rejoignez 10 000+ gourmets qui ont trouvé leur chef idéal
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span>Chefs vérifiés et expérimentés</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span>Paiement sécurisé et protégé</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span>Support client 7j/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
