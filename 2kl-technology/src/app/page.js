'use client';
import { useState } from 'react';

// Pages du flux diagnostic
import { UserInfoPage } from '@/components/UserInfoPage';
import { SymptomsPage } from '@/components/SymptomsPage';
import { ResultsPage } from '@/components/ResultsPage';
import { HistoryPage } from '@/components/HistoryPage';

// Pages d'entrée
import LandingPage from '@/components/LandingPage';
import AuthPage from '@/components/AuthPage';

// Navigation
import Footer from '@/components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigate = (page) => {
    // Si l'utilisateur essaie d'accéder aux pages protégées sans être connecté
    if (['home', 'diagnosis', 'userinfo', 'symptoms', 'results', 'history', 'profile'].includes(page) && !isAuthenticated) {
      setCurrentPage('auth');
      return;
    }

    if (page === 'home') {
      setCurrentPage('home');
    } else if (page === 'diagnosis') {
      setCurrentPage('userinfo');
    } else {
      setCurrentPage(page);
    }
  };

  const handleAuth = (status) => {
    setIsAuthenticated(status);
    if (status) setCurrentPage("home"); // redirige automatiquement après login
  };


  // SIMPLIFICATION : Footer TOUJOURS visible si connecté
  const shouldShowFooter = isAuthenticated;

  // Déterminer l'élément de navigation actif
  const getActiveNavItem = () => {
    if (currentPage === 'history') return 'history';
    if (currentPage === 'profile') return 'profile';
    if (['userinfo', 'symptoms', 'results'].includes(currentPage)) return 'diagnosis';
    return 'home';
  };


  return (
    <div className={'size-full'}>
      {/* Pages d'entrée - accessibles sans authentification */}
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'auth' && <AuthPage onNavigate={handleNavigate} onAuth={handleAuth} />}

      {/* Pages protégées - uniquement si authentifié */}
      {isAuthenticated && (
        <>
          {currentPage === 'home' && (
            <main className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Bienvenue</h1>
                <p className="text-gray-600">Page d'accueil - Vous êtes connecté</p>
              </div>
            </main>
          )}

          {currentPage === 'userinfo' && <UserInfoPage onNavigate={handleNavigate} />}
          {currentPage === 'symptoms' && <SymptomsPage onNavigate={handleNavigate} />}
          {currentPage === 'results' && <ResultsPage onNavigate={handleNavigate} />}
          {currentPage === 'history' && <HistoryPage onNavigate={handleNavigate} />}

          {currentPage === 'profile' && (
            <main className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Profil Utilisateur</h1>
                <p className="text-gray-600">Page à venir.</p>
              </div>
            </main>
          )}
        </>
      )}

      {/* Footer - TOUJOURS affiché si connecté */}
      {shouldShowFooter && (
        <Footer 
          currentPage={getActiveNavItem()} 
          onNavigate={handleNavigate} 
        />
      )}
    </div>
  );
}