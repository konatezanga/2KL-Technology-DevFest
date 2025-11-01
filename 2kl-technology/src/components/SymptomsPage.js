'use client';
import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Activity, Thermometer, Heart, TrendingUp, X, Sparkles } from 'lucide-react';

export function SymptomsPage({ onNavigate }) {
  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [vitalSigns, setVitalSigns] = useState({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
  });

  const suggestedSymptoms = [
    'Fièvre', 'Toux', 'Maux de tête', 'Fatigue', 
    'Nausées', 'Douleurs abdominales', 'Vertiges', 'Frissons'
  ];

  const addSymptom = (symptom) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setCurrentSymptom('');
    }
  };

  const removeSymptom = (symptom) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('results');
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
              {symptoms.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Symptômes sélectionnés :</p>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom) => (
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
                  value={vitalSigns.temperature}
                  onChange={(e) => setVitalSigns({ ...vitalSigns, temperature: e.target.value })}
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
                  value={vitalSigns.bloodPressure}
                  onChange={(e) => setVitalSigns({ ...vitalSigns, bloodPressure: e.target.value })}
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
                  value={vitalSigns.heartRate}
                  onChange={(e) => setVitalSigns({ ...vitalSigns, heartRate: e.target.value })}
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
              disabled={symptoms.length === 0}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Analyser avec l'IA
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