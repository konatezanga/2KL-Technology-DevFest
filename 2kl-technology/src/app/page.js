'use client';
import { useState } from 'react';
import { useEffect } from 'react';

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
  
  // État global pour les données du formulaire
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    medicalHistory: '',
    symptoms: [],
    vitalSigns: {
      temperature: '',
      bloodPressure: '', 
      heartRate: ''
    }
  });
  
  // État pour les résultats du diagnostic
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  // Fonction pour mettre à jour les données du formulaire
  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleNavigate = (page, navigationData = null) => {
    console.log(`Navigation vers ${page} avec données:`, navigationData);
    
    // Si l'utilisateur essaie d'accéder aux pages protégées sans être connecté
    if (['home', 'diagnosis', 'userinfo', 'symptoms', 'results', 'history', 'profile'].includes(page) && !isAuthenticated) {
      setCurrentPage('auth');
      return;
    }

    // Gestion des résultats du diagnostic lors de la navigation
    if (page === 'results' && navigationData?.diagnosisResult) {
      console.log('Définition du diagnosisResult:', navigationData.diagnosisResult);
      setDiagnosisResult(navigationData.diagnosisResult);
      setCurrentPage('results');
      return;
    }

    // Réinitialisation des données si on recommence un diagnostic
    if (page === 'userinfo') {
      setFormData({
        age: '',
        gender: '',
        medicalHistory: '',
        symptoms: [],
        vitalSigns: {
          temperature: '',
          bloodPressure: '',
          heartRate: ''
        }
      });
      setDiagnosisResult(null);
    }

    // Navigation standard
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
    if (status) setCurrentPage("home");
  };

  const shouldShowFooter = isAuthenticated;

  const getActiveNavItem = () => {
    if (currentPage === 'history') return 'history';
    if (currentPage === 'profile') return 'profile';
    if (['userinfo', 'symptoms', 'results'].includes(currentPage)) return 'diagnosis';
    return 'home';
  };


  console.log('[App] currentPage:', currentPage);
  console.log('[App] formData:', formData);
  console.log('[App] updateFormData function:', typeof updateFormData);

  useEffect(() => {
    console.log('[App] diagnosisResult STATE:', diagnosisResult);
  }, [diagnosisResult]);

  useEffect(() => {
    console.log('[App] currentPage STATE:', currentPage);
  }, [currentPage]);

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
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Bienvenue dans Consult</h1>
                <p className="text-gray-600">Diagnostic médical intelligent par IA</p>
                <button 
                  onClick={() => handleNavigate('diagnosis')}
                  className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Commencer un diagnostic
                </button>
              </div>
            </main>
          )}

          {/* Passage des props de données */}
          {currentPage === 'userinfo' && (
            <UserInfoPage 
              onNavigate={handleNavigate} 
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          
          {currentPage === 'symptoms' && (
            <SymptomsPage 
              onNavigate={handleNavigate}
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          
          {currentPage === 'results' && (
            <ResultsPage 
              onNavigate={handleNavigate}
              diagnosisResult={diagnosisResult}
            />
          )}
          
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