'use client';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

import HomePage from '@/components/HomePage';

export default function AccueilPage() {
  const router = useRouter();

  const handleNavigate = (pageKey) => {
    if (pageKey === 'home') router.push('/accueil');
    if (pageKey === 'diagnosis') router.push('/diagnostic');
    if (pageKey === 'history') router.push('/historique');
    if (pageKey === 'profile') router.push('/profil');
  };

  return (
    <div className="relative min-h-screen pb-16 flex items-center justify-center">
      
        <HomePage onNavigate={handleNavigate} />
      

      <Footer currentPage="home" onNavigate={handleNavigate} />
    </div>
  );
}


