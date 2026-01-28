"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Chrome, Mail, ChefHat } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage(`Erreur: ${error.message}`);
      }
    } catch (err) {
      setMessage('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage('Veuillez entrer votre adresse email');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage(`Erreur: ${error.message}`);
      } else {
        setMessage('Vérifiez votre email pour le lien de connexion!');
      }
    } catch (err) {
      setMessage('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold mb-2">
            <ChefHat className="h-8 w-8" />
            <span>GetChef</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Connexion
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accédez à votre compte pour gérer vos réservations
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Se connecter</CardTitle>
            <CardDescription>
              Choisissez votre méthode de connexion préférée
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Chrome className="mr-2 h-5 w-5" />
              Se connecter avec Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Ou</span>
              </div>
            </div>

            <form onSubmit={handleMagicLinkSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                <Mail className="mr-2 h-5 w-5" />
                {loading ? 'Envoi en cours...' : 'Se connecter par email (magic link)'}
              </Button>
            </form>

            {message && (
              <div className={`text-sm p-3 rounded-md ${
                message.includes('Erreur')
                  ? 'bg-red-50 text-red-600'
                  : 'bg-green-50 text-green-600'
              }`}>
                {message}
              </div>
            )}

            <p className="text-xs text-center text-gray-500 mt-4">
              En vous connectant, vous acceptez nos conditions d&apos;utilisation et notre politique de confidentialité.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
