// ResultsPage.js
'use client';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Progress } from './ui/Progress';
import { 
  FileText, 
  Save, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  Home as HomeIcon,
  Pill,
  Building2,
  RotateCcw,
  Heart,
  Activity,
  Thermometer
} from 'lucide-react';

export function ResultsPage({ onNavigate, diagnosisResult }) {
  console.log('ResultsPage - diagnosisResult reçu:', diagnosisResult);

  // Lire depuis localStorage si les props sont vides
  let finalDiagnosisResult = diagnosisResult;
  
  if (!diagnosisResult || typeof diagnosisResult !== 'object' || !diagnosisResult.diagnosis_fr) {
    console.log('[Results] Tentative de lecture depuis localStorage...');
    try {
      const storedResult = localStorage.getItem('lastDiagnosisResult');
      if (storedResult) {
        finalDiagnosisResult = JSON.parse(storedResult);
        console.log('[Results] Données récupérées depuis localStorage:', finalDiagnosisResult);
      }
    } catch (error) {
      console.error('[Results] Erreur lecture localStorage:', error);
    }
  }
  
  console.log('[Results] Données finales utilisées:', finalDiagnosisResult);
  
  // Vérification que les données existent
  if (!finalDiagnosisResult || typeof finalDiagnosisResult !== 'object' || !finalDiagnosisResult.diagnosis_fr) {
    console.log('[Results] Données manquantes ou invalides:', finalDiagnosisResult);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun résultat disponible</h2>
          <p className="text-gray-600 mb-4">
            Les résultats du diagnostic ne sont pas disponibles.
          </p>
          <Button 
            onClick={() => onNavigate('userinfo')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Commencer un nouveau diagnostic
          </Button>
        </Card>
      </div>
    );
  }

  const diagnoses = finalDiagnosisResult.diagnosis_fr.possibleConditions || [];
  const recommendations = finalDiagnosisResult.diagnosis_fr.recommendations || [];
  const urgencyLevel = finalDiagnosisResult.diagnosis_fr.urgencyLevel || 'low';
  const analysis = finalDiagnosisResult.diagnosis_fr.analysis || '';

  const getUrgencyBadge = (level) => {
    switch (level) {
      case 'low':
        return (
          <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 px-3 py-2 rounded-xl font-semibold text-sm md:text-base">
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            Bénin
          </Badge>
        );
      case 'moderate':
        return (
          <Badge className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 px-3 py-2 rounded-xl font-semibold text-sm md:text-base">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            Modéré
          </Badge>
        );
      case 'critical':
        return (
          <Badge className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300 px-3 py-2 rounded-xl font-semibold text-sm md:text-base">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            Critique
          </Badge>
        );
      default:
        return null;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'moderate':
        return 'bg-gradient-to-r from-orange-500 to-orange-600';
      case 'critical':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const handleSaveReport = async () => {
    try {
      const reportData = {
        ...diagnosisResult,
        savedAt: new Date().toISOString(),
        id: Date.now().toString()
      };
      
      const existingReports = JSON.parse(localStorage.getItem('medicalReports') || '[]');
      existingReports.push(reportData);
      localStorage.setItem('medicalReports', JSON.stringify(existingReports));
      
      alert('Résultats sauvegardés avec succès !');
      onNavigate('history');
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Résultats du diagnostic IA</h1>
              <p className="text-blue-100 text-base md:text-lg">Analyse terminée avec succès</p>
            </div>
            <div className="self-start sm:self-auto">
              {getUrgencyBadge(urgencyLevel)}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Alert pour cas critique */}
        {urgencyLevel === 'critical' && (
          <Card className="p-4 md:p-6 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl md:rounded-2xl shadow-lg">
            <div className="flex gap-3 md:gap-4 items-start">
              <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600 flex-shrink-0 mt-0.5 md:mt-1" />
              <div>
                <p className="text-red-900 text-sm md:text-lg font-semibold">
                  <strong>ATTENTION URGENCE MÉDICALE :</strong> Vos symptômes nécessitent une attention médicale immédiate. 
                  Appelez le 185 (SAMU) ou rendez-vous aux urgences sans délai.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Alert pour cas modéré */}
        {urgencyLevel === 'moderate' && (
          <Card className="p-4 md:p-6 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl md:rounded-2xl shadow-lg">
            <div className="flex gap-3 md:gap-4 items-start">
              <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-orange-600 flex-shrink-0 mt-0.5 md:mt-1" />
              <div>
                <p className="text-orange-900 text-sm md:text-lg font-semibold">
                  <strong>Consultation recommandée :</strong> Prenez rendez-vous avec un médecin dans les 24-48h.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Diagnoses - DONNÉES RÉELLES */}
        <Card className="p-4 md:p-6 lg:p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Maladies probables</h2>
          <div className="space-y-4 md:space-y-6">
            {diagnoses.map((diagnosis, index) => (
              <div key={index} className="space-y-3 md:space-y-4 p-3 md:p-4 bg-white rounded-lg md:rounded-xl border border-gray-100 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-base md:text-lg font-semibold text-gray-900 break-words">
                      {diagnosis.name}
                    </span>
                    {index === 0 && (
                      <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 px-2 py-1 rounded-lg font-semibold text-xs md:text-sm w-fit">
                        Plus probable
                      </Badge>
                    )}
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-blue-600">
                    {diagnosis.probability}%
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={diagnosis.probability} 
                    className="h-2 md:h-3 bg-gray-200 rounded-full" 
                  />
                  <div 
                    className={`absolute top-0 left-0 h-2 md:h-3 rounded-full ${getSeverityColor(urgencyLevel)} shadow-sm`}
                    style={{ width: `${diagnosis.probability}%` }}
                  />
                </div>
                {diagnosis.original_name && diagnosis.original_name !== diagnosis.name && (
                  <p className="text-xs text-gray-500 italic">
                    Terme médical: {diagnosis.original_name}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Analyse détaillée */}
          {analysis && (
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg md:rounded-xl">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Analyse médicale :</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{analysis}</p>
            </div>
          )}

          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg md:rounded-xl">
            <p className="text-gray-700 text-xs md:text-sm flex items-start gap-2">
              <span className="text-base mt-0.5">ℹ️</span>
              Ces résultats sont générés par IA et ne remplacent pas un diagnostic médical professionnel. 
              Consultez toujours un médecin pour un diagnostic définitif.
            </p>
          </div>
        </Card>

        {/* Recommendations - DONNÉES RÉELLES (max 4) */}
        <Card className="p-4 md:p-6 lg:p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
            Recommandations {recommendations.length > 0 && `(${recommendations.length})`}
          </h2>
          <div className="space-y-3 md:space-y-4">
            {recommendations.map((rec, index) => {
              const Icon = getIconComponent(rec.icon);
              return (
                <div 
                  key={index} 
                  className="flex gap-3 md:gap-4 p-4 md:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg md:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2 break-words">
                      {rec.title}
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base lg:text-lg break-words">
                      {rec.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Button
            variant="outline"
            className="flex-1 h-12 md:h-14 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl font-semibold text-base md:text-lg transition-all duration-200"
            onClick={() => {
              alert('Téléchargement du rapport PDF...');

              // Ici on intégrere la génération PDF réelle

            }}
          >
            <FileText className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
            Télécharger (PDF)
          </Button>
          <Button
            className="flex-1 h-12 md:h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl text-base md:text-lg transition-all duration-200"
            onClick={handleSaveReport}
          >
            <Save className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
            Sauvegarder
          </Button>
        </div>

        <Button
          variant="outline"
          className="w-full h-12 md:h-14 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 rounded-xl font-semibold text-base md:text-lg transition-all duration-200"
          onClick={() => onNavigate('userinfo')}
        >
          <RotateCcw className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
          Nouveau diagnostic
        </Button>
      </div>
    </div>
  );
}

// Helper pour les icônes - ÉTENDU
function getIconComponent(iconName) {
  const icons = {
    'HomeIcon': HomeIcon,
    'Pill': Pill,
    'Stethoscope': Stethoscope,
    'Building2': Building2,
    'FileText': FileText,
    'Heart': Heart,
    'Activity': Activity,
    'Thermometer': Thermometer,
    'AlertTriangle': AlertTriangle,
    'AlertCircle': AlertCircle
  };
  return icons[iconName] || HomeIcon;
}