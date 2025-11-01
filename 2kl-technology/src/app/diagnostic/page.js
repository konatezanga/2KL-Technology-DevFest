'use client';
import { useState } from 'react';
import { UserInfoPage } from '@/components/UserInfoPage';
import { SymptomsPage } from '@/components/SymptomsPage';
import { ResultsPage } from '@/components/ResultsPage';

export default function DiagnosticPage() {
  const [currentStep, setCurrentStep] = useState('userinfo');

  const handleNavigate = (step) => {
    setCurrentStep(step);
  };

  return (
    <div>
      {currentStep === 'userinfo' && <UserInfoPage onNavigate={handleNavigate} />}
      {currentStep === 'symptoms' && <SymptomsPage onNavigate={handleNavigate} />}
      {currentStep === 'results' && <ResultsPage onNavigate={handleNavigate} />}
    </div>
  );
}