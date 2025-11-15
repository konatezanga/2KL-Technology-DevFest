'use client';
import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Activity, Thermometer, Heart, TrendingUp, X, Sparkles } from 'lucide-react';

export function SymptomsPage({ onNavigate, formData = {}, updateFormData }) {

  console.log('[Symptoms] Props reçues - onNavigate:', typeof onNavigate);

  // Initialisation avec les données du parent OU données locales
  const [localSymptoms, setLocalSymptoms] = useState(formData?.symptoms || []);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [localVitalSigns, setLocalVitalSigns] = useState({
    temperature: formData?.vitalSigns?.temperature || '',
    bloodPressure: formData?.vitalSigns?.bloodPressure || '',
    heartRate: formData?.vitalSigns?.heartRate || '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const suggestedSymptoms = [
    'Fièvre', 'Toux', 'Maux de tête', 'Fatigue', 
    'Nausées', 'Douleurs abdominales', 'Vertiges', 'Frissons'
  ];

  // Fonction sécurisée pour updateFormData
  const safeUpdateFormData = (newData) => {
    if (updateFormData && typeof updateFormData === 'function') {
      updateFormData(newData);
    }
  };

  const addSymptom = (symptom) => {
    if (symptom && !localSymptoms.includes(symptom)) {
      const newSymptoms = [...localSymptoms, symptom];
      setLocalSymptoms(newSymptoms);
      safeUpdateFormData({ ...formData, symptoms: newSymptoms });
      setCurrentSymptom('');
    }
  };

  const removeSymptom = (symptom) => {
    const newSymptoms = localSymptoms.filter(s => s !== symptom);
    setLocalSymptoms(newSymptoms);
    safeUpdateFormData({ ...formData, symptoms: newSymptoms });
  };

  const handleVitalSignChange = (field, value) => {
    const newVitalSigns = { ...localVitalSigns, [field]: value };
    setLocalVitalSigns(newVitalSigns);
    safeUpdateFormData({ ...formData, vitalSigns: newVitalSigns });
  };

  const handleNavigateWithData = (page, data) => {
    console.log('[Symptoms] Navigation alternative vers:', page, 'avec:', data);
    
    // Solution directe via localStorage
    if (page === 'results' && data?.diagnosisResult) {
      localStorage.setItem('lastDiagnosisResult', JSON.stringify(data.diagnosisResult));
      console.log('Données sauvegardées dans localStorage');
    }
    
    // Appel normal
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(page, data);
    } else {
      console.error('onNavigate non disponible, utilisation de fallback');
      // Fallback - redirection directe
      window.location.href = '/?page=results';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (localSymptoms.length === 0) {
      setError('Veuillez ajouter au moins un symptôme');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // PRÉPARATION DES DONNÉES COMPLÈTES
      const completeFormData = {
        ...formData,
        symptoms: localSymptoms,
        vitalSigns: localVitalSigns
      };

      console.log('Envoi des données complètes:', completeFormData);

      // APPEL API RÉEL
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeFormData),
      });

      const result = await response.json();
      console.log('Réponse API:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors du diagnostic');
      }

      // Attendre que les données soient traitées avant la navigation
      console.log('Navigation vers results avec données:', result);
      
      handleNavigateWithData('results', { diagnosisResult: result });
      

    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message || 'Erreur de connexion au service médical');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Saisie des symptômes</h1>
              <p className="text-sm text-gray-600">Décrivez ce que vous ressentez</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Symptoms Input */}
          <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
            <div className="space-y-6">
              <div>
                <Label htmlFor="symptom" className="text-base font-semibold text-gray-900">Vos symptômes *</Label>
                <div className="flex gap-3 mt-3">
                  <Input
                    id="symptom"
                    type="text"
                    placeholder="Ex: Maux de tête, fièvre..."
                    value={currentSymptom}
                    onChange={(e) => setCurrentSymptom(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSymptom(currentSymptom);
                      }
                    }}
                    className="h-12 flex-1 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
                  />
                  <Button
                    type="button"
                    onClick={() => addSymptom(currentSymptom)}
                    className="h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Ajouter
                  </Button>
                </div>
              </div>

              {/* Suggested Symptoms */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Suggestions :</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSymptoms.map((symptom) => (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => addSymptom(symptom)}
                      className="px-4 py-2 text-sm bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full hover:from-blue-100 hover:to-blue-200 border border-blue-200 hover:border-blue-300 transition-all duration-200 font-medium shadow-sm"
                    >
                      + {symptom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Symptoms */}
              {localSymptoms.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Symptômes sélectionnés :</p>
                  <div className="flex flex-wrap gap-2">
                    {localSymptoms.map((symptom) => (
                      <Badge
                        key={symptom}
                        variant="secondary"
                        className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 hover:bg-green-200 pr-2 py-2 rounded-lg font-medium transition-all duration-200"
                      >
                        {symptom}
                        <button
                          type="button"
                          onClick={() => removeSymptom(symptom)}
                          className="ml-2 hover:bg-green-300 rounded-full p-1 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Vital Signs */}
          <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Signes vitaux (optionnel)</h3>
            
            <div className="space-y-6">
              {/* Temperature */}
              <div className="space-y-3">
                <Label htmlFor="temperature" className="flex items-center gap-3 text-base font-semibold text-gray-900">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Thermometer className="w-5 h-5 text-orange-600" />
                  </div>
                  Température (°C)
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 37.5"
                  value={localVitalSigns.temperature}
                  onChange={(e) => handleVitalSignChange('temperature', e.target.value)}
                  className="h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
                />
              </div>

              {/* Blood Pressure */}
              <div className="space-y-3">
                <Label htmlFor="bloodPressure" className="flex items-center gap-3 text-base font-semibold text-gray-900">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                  Tension artérielle (mmHg)
                </Label>
                <Input
                  id="bloodPressure"
                  type="text"
                  placeholder="Ex: 120/80"
                  value={localVitalSigns.bloodPressure}
                  onChange={(e) => handleVitalSignChange('bloodPressure', e.target.value)}
                  className="h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
                />
              </div>

              {/* Heart Rate */}
              <div className="space-y-3">
                <Label htmlFor="heartRate" className="flex items-center gap-3 text-base font-semibold text-gray-900">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                  Fréquence cardiaque (bpm)
                </Label>
                <Input
                  id="heartRate"
                  type="number"
                  placeholder="Ex: 72"
                  value={localVitalSigns.heartRate}
                  onChange={(e) => handleVitalSignChange('heartRate', e.target.value)}
                  className="h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
                />
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate('userinfo')}
              className="flex-1 h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl font-semibold transition-all duration-200"
            >
              Retour
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={localSymptoms.length === 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyser avec l'IA
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Progress Indicator */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-3">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full shadow-sm"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-3 font-medium">Étape 2 sur 3</p>
        </div>
      </div>
    </div>
  );
}