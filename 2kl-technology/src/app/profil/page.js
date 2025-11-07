'use client';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import ProfilePage from '@/components/ProfilPage';

export default function ProfilPageWrapper() {
  const router = useRouter();

  const handleNavigate = (pageKey) => {
    if (pageKey === 'home') router.push('/accueil');
    if (pageKey === 'diagnosis') router.push('/diagnostic');
    if (pageKey === 'history') router.push('/historique');
    if (pageKey === 'profile') router.push('/profil');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenu principal qui prend tout l'espace sauf le footer */}
      <div className="flex-1 flex items-center justify-center">
        <ProfilePage onNavigate={handleNavigate} />
      </div>

      {/* Footer en bas */}
      <Footer currentPage="profile" onNavigate={handleNavigate} />
    </div>
  );
}
