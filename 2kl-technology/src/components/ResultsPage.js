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
  RotateCcw
} from 'lucide-react';

export function ResultsPage({ onNavigate }) {
  const diagnoses = [
    {
      name: 'Grippe saisonnière',
      probability: 78,
      severity: 'moderate',
    },
    {
      name: 'Infection virale commune',
      probability: 65,
      severity: 'low',
    },
    {
      name: 'Migraine',
      probability: 42,
      severity: 'low',
    },
  ];

  const recommendations = [
    {
      icon: HomeIcon,
      title: 'Repos à domicile',
      description: 'Restez au repos pendant 2-3 jours',
      type: 'home',
    },
    {
      icon: Pill,
      title: 'Traitement symptomatique',
      description: 'Paracétamol pour la fièvre et les douleurs (selon prescription)',
      type: 'treatment',
    },
    {
      icon: Stethoscope,
      title: 'Consulter un médecin généraliste',
      description: 'Rendez-vous recommandé sous 48-72h si les symptômes persistent',
      type: 'doctor',
    },
  ];

  const urgencyLevel = 'moderate';

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
        {/* Alert */}
        {urgencyLevel === 'critical' && (
          <Card className="p-4 md:p-6 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl md:rounded-2xl shadow-lg">
            <div className="flex gap-3 md:gap-4 items-start">
              <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600 flex-shrink-0 mt-0.5 md:mt-1" />
              <div>
                <p className="text-red-900 text-sm md:text-lg font-semibold">
                  <strong>Attention :</strong> Vos symptômes nécessitent une attention médicale immédiate. 
                  Veuillez consulter un médecin ou vous rendre aux urgences.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Diagnoses */}
        <Card className="p-4 md:p-6 lg:p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Maladies probables</h2>
          <div className="space-y-4 md:space-y-6">
            {diagnoses.map((diagnosis, index) => (
              <div key={index} className="space-y-3 md:space-y-4 p-3 md:p-4 bg-white rounded-lg md:rounded-xl border border-gray-100 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-base md:text-lg font-semibold text-gray-900 break-words">{diagnosis.name}</span>
                    {index === 0 && (
                      <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 px-2 py-1 rounded-lg font-semibold text-xs md:text-sm w-fit">
                        Plus probable
                      </Badge>
                    )}
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-blue-600">{diagnosis.probability}%</span>
                </div>
                <div className="relative">
                  <Progress value={diagnosis.probability} className="h-2 md:h-3 bg-gray-200 rounded-full" />
                  <div 
                    className={`absolute top-0 left-0 h-2 md:h-3 rounded-full ${getSeverityColor(diagnosis.severity)} shadow-sm`}
                    style={{ width: `${diagnosis.probability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg md:rounded-xl">
            <p className="text-blue-800 text-xs md:text-sm flex items-start md:items-center gap-2">
              <span className="text-sm md:text-base mt-0.5 md:mt-0">ℹ️</span>
              Ces résultats sont générés par IA et ne remplacent pas un diagnostic médical professionnel.
            </p>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-4 md:p-6 lg:p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Recommandations</h2>
          <div className="space-y-3 md:space-y-4">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <div 
                  key={index} 
                  className="flex gap-3 md:gap-4 p-4 md:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg md:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2 break-words">{rec.title}</h4>
                    <p className="text-gray-600 text-sm md:text-base lg:text-lg break-words">{rec.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Urgency Recommendation */}
        {urgencyLevel === 'critical' && (
          <Card className="p-4 md:p-6 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl md:rounded-2xl shadow-lg">
            <div className="flex gap-3 md:gap-4 items-center">
              <Building2 className="w-8 h-8 md:w-10 md:h-10 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-red-900 mb-1 md:mb-2">Action immédiate recommandée</h3>
                <p className="text-red-800 text-base md:text-lg">
                  Rendez-vous au CHU ou appelez le SAMU (15) si les symptômes s'aggravent.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Button
            variant="outline"
            className="flex-1 h-12 md:h-14 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl font-semibold text-base md:text-lg transition-all duration-200"
            onClick={() => {
              alert('Téléchargement du rapport PDF...');
            }}
          >
            <FileText className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
            Télécharger (PDF)
          </Button>
          <Button
            className="flex-1 h-12 md:h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl text-base md:text-lg transition-all duration-200"
            onClick={() => {
              alert('Résultats sauvegardés dans votre historique !');
              onNavigate('history');
            }}
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

        {/* Progress Indicator */}
        <div className="mt-8 md:mt-12">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
          </div>
          <p className="text-center text-base md:text-lg text-gray-600 mt-2 md:mt-3 font-semibold">Diagnostic terminé ✓</p>
        </div>
      </div>
    </div>
  );
}