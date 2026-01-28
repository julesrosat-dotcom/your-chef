"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChefHat, Menu, Bell } from 'lucide-react';
import { UserDropdown } from './user-dropdown';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-header shadow-md'
          : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-primary transition-colors">
          <ChefHat className="h-7 w-7 text-primary" />
          <span>GetChef</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/chefs" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
            Nos chefs
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
            Comment ça marche
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
            À propos
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {loading ? (
            <Skeleton className="h-9 w-9 rounded-full hidden md:block" />
          ) : user ? (
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                asChild
              >
                <Link href="/dashboard">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
                    1
                  </span>
                </Link>
              </Button>
              <UserDropdown />
              <Button
                asChild
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium"
              >
                <Link href="/chefs">Trouver un chef</Link>
              </Button>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden md:inline-flex">
                <Link href="/auth/signin">Se connecter</Link>
              </Button>
              <Button asChild className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600">
                <Link href="/auth/signup">S'inscrire</Link>
              </Button>
            </>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <ChefHat className="h-6 w-6 text-primary" />
                    <span>GetChef</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/chefs"
                  className="text-base font-medium text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Nos chefs
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-base font-medium text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Comment ça marche
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  À propos
                </Link>
                <hr className="my-2" />
                {user ? (
                  <>
                    <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                      <Link href="/dashboard">Mon compte</Link>
                    </Button>
                    <Button asChild className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => setIsOpen(false)}>
                      <Link href="/dashboard">Mes réservations</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                      <Link href="/auth/signin">Se connecter</Link>
                    </Button>
                    <Button asChild className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => setIsOpen(false)}>
                      <Link href="/auth/signup">S'inscrire</Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
