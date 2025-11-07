'use client';
import { useRouter } from 'next/navigation';
import { HistoryPage } from '@/components/HistoryPage';
import Footer from '@/components/Footer';

export default function HistoriquePageWrapper() {
  const router = useRouter();

  const handleNavigate = (pageKey) => {
    if (pageKey === 'home') router.push('/accueil');
    if (pageKey === 'diagnosis') router.push('/diagnostic');
    if (pageKey === 'history') router.push('/historique');
    if (pageKey === 'profile') router.push('/profil');
  };

  return (
    <div className="relative min-h-screen pb-16">
      <HistoryPage onNavigate={handleNavigate} />
      <Footer currentPage="history" onNavigate={handleNavigate} />
    </div>
  );
}
