'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { 
  History, 
  ChevronRight, 
  Calendar,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileText,
  Plus
} from 'lucide-react';

export function HistoryPage({ onNavigate }) {
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const router = useRouter();

  const consultations = [
    {
      id: '1',
      date: '2025-10-03',
      symptoms: ['Fièvre', 'Toux', 'Maux de tête'],
      mainDiagnosis: 'Grippe saisonnière',
      probability: 78,
      urgency: 'moderate',
    },
    {
      id: '2',
      date: '2025-09-15',
      symptoms: ['Douleurs abdominales', 'Nausées'],
      mainDiagnosis: 'Gastro-entérite',
      probability: 82,
      urgency: 'low',
    },
    {
      id: '3',
      date: '2025-08-22',
      symptoms: ['Maux de tête', 'Fatigue', 'Vertiges'],
      mainDiagnosis: 'Migraine',
      probability: 65,
      urgency: 'low',
    },
  ];

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'low':
        return (
          <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 px-3 py-1 rounded-lg font-semibold">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Bénin
          </Badge>
        );
      case 'moderate':
        return (
          <Badge className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 px-3 py-1 rounded-lg font-semibold">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Modéré
          </Badge>
        );
      case 'critical':
        return (
          <Badge className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300 px-3 py-1 rounded-lg font-semibold">
            <AlertCircle className="w-4 h-4 mr-1" />
            Critique
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleNewDiagnosis = () => {
    // Utilise le router Next.js pour la navigation
    router.push('/diagnostic');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Historique</h1>
              <p className="text-sm text-gray-600">
                {consultations.length} consultation{consultations.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {consultations.length === 0 ? (
          <Card className="p-12 text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <History className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Aucune consultation</h3>
            <p className="text-gray-600 text-lg mb-8">
              Vous n'avez pas encore effectué de diagnostic
            </p>
            <Button
              onClick={handleNewDiagnosis}
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Commencer un diagnostic
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {consultations.map((consultation) => (
              <Card
                key={consultation.id}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden"
                onClick={() => setSelectedConsultation(
                  selectedConsultation === consultation.id ? null : consultation.id
                )}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">
                          {formatDate(consultation.date)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{consultation.mainDiagnosis}</h3>
                      <p className="text-lg text-gray-600 font-semibold">
                        Probabilité: {consultation.probability}%
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getUrgencyBadge(consultation.urgency)}
                      <ChevronRight 
                        className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                          selectedConsultation === consultation.id ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div className="flex flex-wrap gap-2">
                    {consultation.symptoms.map((symptom, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-300 px-3 py-1 rounded-lg font-medium"
                      >
                        {symptom}
                      </Badge>
                    ))}
                  </div>

                  {/* Expanded Details */}
                  {selectedConsultation === consultation.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Recommandations</h4>
                        <ul className="text-gray-600 space-y-2 text-lg">
                          <li className="flex items-center gap-2">• Repos à domicile pendant 2-3 jours</li>
                          <li className="flex items-center gap-2">• Traitement symptomatique recommandé</li>
                          <li className="flex items-center gap-2">• Consulter un médecin si les symptômes persistent</li>
                        </ul>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl font-semibold text-lg transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Téléchargement du rapport PDF...');
                        }}
                      >
                        <FileText className="w-5 h-5 mr-2" />
                        Télécharger le rapport
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* New Diagnosis Button */}
        {consultations.length > 0 && (
          <div className="mt-8">
            <Button
              onClick={handleNewDiagnosis}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nouveau diagnostic
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}