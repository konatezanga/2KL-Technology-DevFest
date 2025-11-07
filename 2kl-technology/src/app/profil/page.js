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
      <div className="flex-1">
        <ProfilePage onNavigate={handleNavigate} />
      </div>
      <Footer currentPage="profile" onNavigate={handleNavigate} />
    </div>
  );
}
