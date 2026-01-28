'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const countryCodes = [
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
];

interface PhoneAuthFormProps {
  onBack: () => void;
}

export function PhoneAuthForm({ onBack }: PhoneAuthFormProps) {
  const [countryCode, setCountryCode] = useState('+33');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer votre numéro de téléphone',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const fullPhone = `${countryCode}${phoneNumber}`;
      const { error } = await supabase.auth.signInWithOtp({
        phone: fullPhone,
      });

      if (error) {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setOtpSent(true);
        toast({
          title: 'Code envoyé !',
          description: 'Vérifiez vos SMS pour le code de confirmation',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer le code de confirmation',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const fullPhone = `${countryCode}${phoneNumber}`;
      const { data, error } = await supabase.auth.verifyOtp({
        phone: fullPhone,
        token: otp,
        type: 'sms',
      });

      if (error) {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      } else if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        if (!profile) {
          await supabase.from('profiles').insert({
            user_id: data.user.id,
            full_name: data.user.phone || 'Utilisateur',
            phone: fullPhone,
            role: 'CLIENT',
          });
        }

        toast({
          title: 'Connexion réussie !',
          description: 'Vous allez être redirigé...',
        });

        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 1000);
      }
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (otpSent) {
    return (
      <form onSubmit={handleVerifyOTP} className="space-y-6">
        <div>
          <Label htmlFor="otp">Code de confirmation</Label>
          <Input
            id="otp"
            type="text"
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 text-center text-2xl tracking-widest"
            maxLength={6}
            disabled={isLoading}
          />
          <p className="text-sm text-gray-600 mt-2">
            Code envoyé au {countryCode} {phoneNumber}
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 h-12"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Vérifier le code
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setOtpSent(false)}
            className="text-sm text-gray-600 hover:text-orange-500"
            disabled={isLoading}
          >
            ← Modifier le numéro
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendOTP} className="space-y-6">
      <div>
        <Label htmlFor="phone">Numéro de téléphone</Label>
        <div className="flex gap-2 mt-1">
          <Select value={countryCode} onValueChange={setCountryCode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="phone"
            type="tel"
            placeholder="6 12 34 56 78"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\s/g, ''))}
            className="flex-1"
            disabled={isLoading}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Confirmer votre numéro de mobile via SMS
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 h-12"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Continuer
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-orange-500"
          disabled={isLoading}
        >
          ← Retour
        </button>
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
    </form>
  );
}
