"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChefHat, Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast({
        title: 'Email invalide',
        description: 'Veuillez entrer une adresse email valide.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Inscription réussie !',
      description: 'Merci de vous être inscrit à notre newsletter.',
    });
    setEmail('');
  };

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <ChefHat className="h-7 w-7 text-primary" />
              <span>ChefPrivé</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              La marketplace des chefs privés pour vos événements exceptionnels. Vivez une expérience culinaire unique.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-200 hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-200 hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-200 hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Plateforme</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/chefs" className="text-gray-600 hover:text-primary transition-colors">
                  Nos chefs
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Pour les chefs</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/chef-signup" className="text-gray-600 hover:text-primary transition-colors">
                  Devenir chef partenaire
                </Link>
              </li>
              <li>
                <Link href="/chef-resources" className="text-gray-600 hover:text-primary transition-colors">
                  Ressources
                </Link>
              </li>
              <li>
                <Link href="/chef-dashboard" className="text-gray-600 hover:text-primary transition-colors">
                  Espace chef
                </Link>
              </li>
            </ul>
            <h3 className="font-semibold mb-4 mt-6 text-gray-900">Légal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors">
                  CGU
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Recevez nos dernières actualités et offres exclusives.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                S&apos;inscrire
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} ChefPrivé. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
