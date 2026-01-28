'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Chrome, Facebook, Apple, Mail } from 'lucide-react';

interface SocialAuthButtonsProps {
  onEmailClick?: () => void;
  showEmailButton?: boolean;
}

export function SocialAuthButtons({ onEmailClick, showEmailButton = true }: SocialAuthButtonsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSocialAuth = async (provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(provider);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 text-base"
        onClick={() => handleSocialAuth('google')}
        disabled={isLoading !== null}
      >
        <Chrome className="mr-2 h-5 w-5" />
        Continuer avec Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full h-12 text-base"
        onClick={() => handleSocialAuth('facebook')}
        disabled={isLoading !== null}
      >
        <Facebook className="mr-2 h-5 w-5" />
        Continuer avec Facebook
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full h-12 text-base"
        onClick={() => handleSocialAuth('apple')}
        disabled={isLoading !== null}
      >
        <Apple className="mr-2 h-5 w-5" />
        Continuer avec Apple
      </Button>

      {showEmailButton && onEmailClick && (
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 text-base"
          onClick={onEmailClick}
          disabled={isLoading !== null}
        >
          <Mail className="mr-2 h-5 w-5" />
          Continuer avec Email
        </Button>
      )}
    </div>
  );
}
