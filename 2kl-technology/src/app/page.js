'use client';
import { useState } from 'react';
import { UserInfoPage } from '@/components/UserInfoPage';
import { SymptomsPage } from '@/components/SymptomsPage';
import { ResultsPage } from '@/components/ResultsPage';
import { HistoryPage } from '@/components/HistoryPage';
import Footer from '@/components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Commence sur 'home'
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleNavigate = (page) => {
    if (page === 'home') {
      setCurrentPage('home');
    } else if (page === 'diagnosis') {
      setCurrentPage('userinfo'); // Diagnostic → commence à UserInfoPage
    } else if (page === 'profile') {
      setCurrentPage('profile');
    } else {
      setCurrentPage(page);
    }
  };

  const getActiveNavItem = () => {
    if (currentPage === 'history') return 'history';
    if (currentPage === 'profile') return 'profile';
    if (['userinfo', 'symptoms', 'results'].includes(currentPage)) return 'diagnosis';
    return 'home';
  };

  return (
    <div className="size-full">
      {/* Page Accueil */}
      {currentPage === 'home' && (
        <main className="flex min-h-screen items-center justify-center pb-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Bienvenue</h1>
            <p className="text-gray-600">Page d'accueil</p>
          </div>
        </main>
      )}

      {/* Page Profil */}
      {currentPage === 'profile' && (
        <main className="flex min-h-screen items-center justify-center pb-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Profil</h1>
            <p className="text-gray-600">Page profil - Contenu à venir</p>
          </div>
        </main>
      )}

      {/* Flux Diagnostic */}
      {currentPage === 'userinfo' && <UserInfoPage onNavigate={handleNavigate} />}
      {currentPage === 'symptoms' && <SymptomsPage onNavigate={handleNavigate} />}
      {currentPage === 'results' && <ResultsPage onNavigate={handleNavigate} />}
      {currentPage === 'history' && <HistoryPage onNavigate={handleNavigate} />}
      
      {/* Footer */}
      <Footer 
        currentPage={getActiveNavItem()} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
}