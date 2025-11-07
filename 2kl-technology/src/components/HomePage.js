"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Activity, BookOpen, Stethoscope, TrendingUp, ArrowRight } from 'lucide-react';

// Composant ImageWithFallback pour Next.js
function ImageWithFallback({ src, alt, className }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <Activity className="w-12 h-12 text-gray-400" />
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
      color: 'bg-blue-100 text-blue-600',
      action: () => onNavigate('diagnosis'),
    },
    {
      icon: BookOpen,
      title: 'Articles santé',
      description: 'Découvrez nos guides médicaux',
      color: 'bg-purple-100 text-purple-600',
      action: () => onNavigate('articles'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">MyHealth AI</h1>
          </div>
          <p className="text-blue-100">
            Bienvenue ! Que souhaitez-vous faire aujourd'hui ?
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all cursor-pointer border-gray-200"
                onClick={action.action}
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Featured Articles Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-blue-900">Articles en vedette</h2>
              <p className="text-sm text-gray-600">
                Informez-vous sur les maladies courantes
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => onNavigate('articles')}
              className="text-blue-600 hover:text-blue-700"
            >
              Voir tout
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-gray-200"
                onClick={() => onNavigate('article-detail', article.id)}
              >
                <div className="aspect-video overflow-hidden relative">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h4 className="text-base font-semibold text-blue-900 mb-2">{article.title}</h4>
                  <p className="text-sm text-gray-600">{article.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Nouveau : Tests de dépistage</h3>
              <p className="text-sm text-gray-700 mb-4">
                Découvrez nos articles avec des questionnaires interactifs pour évaluer votre 
                risque de développer certaines maladies. Répondez à quelques questions simples 
                et obtenez une évaluation personnalisée.
              </p>
              <Button
                onClick={() => onNavigate('articles')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
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