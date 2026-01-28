import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4 py-12">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900">
              Demande envoyée avec succès !
            </h1>
            <p className="text-xl text-gray-600">
              Merci pour votre confiance
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Votre demande de devis a bien été reçue. Notre équipe va l'étudier et vous proposer les meilleurs chefs correspondant à vos critères.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              Vous recevrez une réponse sous 24 heures maximum.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <p className="text-sm text-gray-600">
              En attendant, vous pouvez :
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/chefs">Découvrir nos chefs</Link>
              </Button>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="/">Retour à l'accueil</Link>
              </Button>
            </div>
          </div>

          <div className="pt-6 border-t space-y-2">
            <p className="text-sm text-gray-600">
              Une question ? Contactez-nous :
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a href="tel:+33144204525" className="text-orange-600 hover:underline font-medium">
                📞 +33 1 44 20 45 25
              </a>
              <a href="mailto:contact@getchef.fr" className="text-orange-600 hover:underline font-medium">
                ✉️ contact@getchef.fr
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const metadata = {
  title: 'Demande envoyée - GetChef',
  description: 'Votre demande de devis a bien été envoyée',
};
