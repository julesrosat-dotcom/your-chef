'use client';

import { useState } from 'react';
import { SocialAuthButtons } from './social-auth-buttons';
import { PhoneAuthForm } from './phone-auth-form';
import { SignupForm } from './signup-form';
import { SigninForm } from './signin-form';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import Link from 'next/link';

type AuthMode = 'main' | 'phone' | 'email-signup' | 'email-signin';

interface UnifiedAuthFormProps {
  initialMode?: 'signup' | 'signin';
}

export function UnifiedAuthForm({ initialMode = 'signup' }: UnifiedAuthFormProps) {
  const [mode, setMode] = useState<AuthMode>('main');
  const [isSignup, setIsSignup] = useState(initialMode === 'signup');

  if (mode === 'phone') {
    return <PhoneAuthForm onBack={() => setMode('main')} />;
  }

  if (mode === 'email-signup') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setMode('main')}
          className="text-sm text-gray-600 hover:text-orange-500"
        >
          ← Retour
        </button>
        <SignupForm hideFooter={true} />
      </div>
    );
  }

  if (mode === 'email-signin') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setMode('main')}
          className="text-sm text-gray-600 hover:text-orange-500"
        >
          ← Retour
        </button>
        <SigninForm hideFooter={true} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 text-base"
          onClick={() => setMode('phone')}
        >
          <Phone className="mr-2 h-5 w-5" />
          Continuer avec Téléphone
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">ou</span>
          </div>
        </div>

        <SocialAuthButtons
          onEmailClick={() => setMode(isSignup ? 'email-signup' : 'email-signin')}
          showEmailButton={true}
        />
      </div>

      <div className="text-xs text-center text-gray-500">
        En cliquant sur 'Continuer', vous confirmez que vous acceptez nos{' '}
        <Link href="/terms" className="text-orange-500 hover:underline">
          Conditions Générales
        </Link>{' '}
        et avez lu notre{' '}
        <Link href="/privacy" className="text-orange-500 hover:underline">
          Politique de confidentialité
        </Link>
        .
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">
            {isSignup ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
          </span>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            setIsSignup(!isSignup);
            setMode('main');
          }}
          className="text-sm font-medium text-orange-500 hover:underline"
        >
          {isSignup ? 'Se connecter' : 'Créer un compte'}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 pt-4 border-t">
        <div className="text-sm text-gray-600">Excellent</div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              className="w-5 h-5 text-green-600 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-gray-900">Trustpilot</div>
      </div>
    </div>
  );
}
