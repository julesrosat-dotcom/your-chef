'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabase/client';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { signupSchema, type SignupFormData } from '@/lib/validations/auth';
import { useToast } from '@/hooks/use-toast';

interface SignupFormProps {
  hideFooter?: boolean;
}

export function SignupForm({ hideFooter = false }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const acceptTerms = watch('acceptTerms');

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: `${data.firstName} ${data.lastName}`,
            phone: data.phone || null,
          },
        },
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          toast({
            title: 'Erreur',
            description: 'Cette adresse email est déjà associée à un compte',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Erreur',
            description: authError.message,
            variant: 'destructive',
          });
        }
        return;
      }

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: authData.user.id,
            full_name: `${data.firstName} ${data.lastName}`,
            phone: data.phone || null,
            role: 'CLIENT',
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }

        toast({
          title: 'Compte créé !',
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Prénom *</Label>
            <Input
              id="firstName"
              type="text"
              {...register('firstName')}
              className="mt-1"
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Nom *</Label>
            <Input
              id="lastName"
              type="text"
              {...register('lastName')}
              className="mt-1"
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            className="mt-1"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Téléphone (optionnel)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+33 6 12 34 56 78"
            {...register('phone')}
            className="mt-1"
            disabled={isLoading}
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Mot de passe *</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
          <div className="relative mt-1">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="acceptTerms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setValue('acceptTerms', checked as boolean)}
            disabled={isLoading}
          />
          <Label htmlFor="acceptTerms" className="text-sm font-normal leading-tight">
            J'accepte les{' '}
            <Link href="/terms" className="text-orange-500 hover:underline">
              Conditions Générales d'Utilisation
            </Link>{' '}
            et la{' '}
            <Link href="/privacy" className="text-orange-500 hover:underline">
              Politique de confidentialité
            </Link>
          </Label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Créer mon compte
      </Button>

      {!hideFooter && (
        <div className="text-center text-sm text-gray-600">
          Déjà un compte ?{' '}
          <Link href="/auth/signin" className="font-medium text-orange-500 hover:underline">
            Se connecter
          </Link>
        </div>
      )}
    </form>
  );
}
