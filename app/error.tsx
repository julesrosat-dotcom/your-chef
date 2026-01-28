'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Une erreur est survenue</h2>
          <p className="text-gray-600">
            Nous sommes désolés, quelque chose s'est mal passé. Veuillez réessayer.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Réessayer
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
}
