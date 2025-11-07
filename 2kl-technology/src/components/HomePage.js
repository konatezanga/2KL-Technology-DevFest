'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Activity, 
  BookOpen, 
  Stethoscope, 
  TrendingUp, 
  ArrowRight,
  Clock
} from 'lucide-react';

// Composant ImageWithFallback pour Next.js
function ImageWithFallback({ src, alt, className }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
        <Activity className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      onError={() => setError(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

export default function HomePage({ onNavigate }) {
  const featuredArticles = [
    {
      id: 'diabetes',
      title: 'Le Diabète de Type 2',
      description: 'Comprendre les symptômes, les causes et la prévention',
      image: 'https://images.unsplash.com/photo-1563866715647-f42420ed5ccc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFiZXRlcyUyMGhlYWx0aHxlbnwxfHx8fDE3NTk2OTA0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '5 min',
      category: 'Maladies chroniques',
    },
    {
      id: 'hypertension',
      title: "L'Hypertension Artérielle",
      description: 'Les signes silencieux à ne pas ignorer',
      image: 'https://images.unsplash.com/photo-1646441453885-86f3cbc260b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGRpc2Vhc2UlMjBtZWRpY2FsfGVufDF8fHx8MTc1OTY5MDQ5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '4 min',
      category: 'Cardiovasculaire',
    },
    {
      id: 'migraine',
      title: 'La Migraine Chronique',
      description: 'Identifier et gérer les crises migraineuses',
      image: 'https://images.unsplash.com/photo-1659353886114-9aa119aef5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBhcnRpY2xlc3xlbnwxfHx8fDE3NTk2OTA0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '6 min',
      category: 'Neurologie',
    },
  ];

  const quickActions = [
    {
      icon: Stethoscope,
      title: 'Diagnostic rapide',
      description: 'Analysez vos symptômes avec l\'IA',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      action: () => onNavigate('diagnosis'),
    },
    {
      icon: BookOpen,
      title: 'Articles santé',
      description: 'Découvrez nos guides médicaux',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      action: () => onNavigate('articles'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Consult</h1>
              <p className="text-sm text-gray-600">
                Que souhaitez-vous faire aujourd'hui ?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm rounded-2xl"
                onClick={action.action}
              >
                <div className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-lg">{action.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Featured Articles Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Articles en vedette</h2>
              <p className="text-lg text-gray-600">
                Informez-vous sur les maladies courantes
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => onNavigate('articles')}
              className="text-blue-600 hover:text-blue-700 text-lg font-semibold"
            >
              Voir tout
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm rounded-2xl"
                onClick={() => onNavigate('article-detail', article.id)}
              >
                <div className="aspect-video overflow-hidden relative">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 px-3 py-1 rounded-lg font-semibold">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{article.title}</h4>
                  <p className="text-gray-600 text-lg leading-relaxed">{article.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nouveau : Tests de dépistage</h3>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Découvrez nos articles avec des questionnaires interactifs pour évaluer votre 
                risque de développer certaines maladies. Répondez à quelques questions simples 
                et obtenez une évaluation personnalisée.
              </p>
              <Button
                onClick={() => onNavigate('articles')}
                className="h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
              >
                Explorer les articles
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}