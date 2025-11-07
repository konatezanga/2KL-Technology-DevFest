'use client';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

export default function ProfilPageWrapper() {
  const router = useRouter();

  const handleNavigate = (pageKey) => {
    if (pageKey === 'home') router.push('/accueil');
    if (pageKey === 'diagnosis') router.push('/diagnostic');
    if (pageKey === 'history') router.push('/historique');
    if (pageKey === 'profile') router.push('/profil');
  };

  return (
    <div className="relative min-h-screen pb-16 flex items-center justify-center">
      <main className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Profil</h1>
        <p className="text-gray-600">Page profil - Contenu à venir</p>
      </main>

      <Footer currentPage="profile" onNavigate={handleNavigate} />
    </div>
  );
}
