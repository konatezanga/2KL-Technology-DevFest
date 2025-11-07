"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Settings
} from 'lucide-react';

// Composant ImageWithFallback pour Next.js
function ImageWithFallback({ src, alt, className }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <User className="w-8 h-8 text-gray-400" />
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
      sizes="80px"
    />
  );
}

export default function ProfilePage({ onNavigate }) {
  const menuItems = [
    {
      icon: User,
      title: 'Informations personnelles',
      description: 'Nom, âge, sexe, antécédents médicaux',
      action: () => onNavigate('userinfo'),
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Gérer vos préférences de notification',
      action: () => alert('Fonctionnalité en développement'),
    },
    {
      icon: Shield,
      title: 'Confidentialité et sécurité',
      description: 'Paramètres de confidentialité',
      action: () => alert('Fonctionnalité en développement'),
    },
    {
      icon: HelpCircle,
      title: 'Aide et support',
      description: 'FAQ, contact, conditions d\'utilisation',
      action: () => alert('Fonctionnalité en développement'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full overflow-hidden shadow-lg relative flex-shrink-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691463610-3c2ecf5fb3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwc21pbGluZ3xlbnwxfHx8fDE3NTk0MTY5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Profile"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">Jean Dupont</h1>
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <Mail className="w-4 h-4" />
                jean.dupont@email.com
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-100 mt-1">
                <Calendar className="w-4 h-4" />
                Membre depuis octobre 2025
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center shadow-sm border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
            <div className="text-sm text-gray-600">Consultations</div>
          </Card>
          <Card className="p-4 text-center shadow-sm border-gray-200">
            <div className="text-2xl font-bold text-green-600 mb-1">2</div>
            <div className="text-sm text-gray-600">Résolues</div>
          </Card>
          <Card className="p-4 text-center shadow-sm border-gray-200">
            <div className="text-2xl font-bold text-orange-600 mb-1">1</div>
            <div className="text-sm text-gray-600">En cours</div>
          </Card>
        </div>

        {/* Menu Items */}
        <Card className="divide-y divide-gray-200 shadow-sm border-gray-200">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-blue-900 truncate">{item.title}</h4>
                  <p className="text-sm text-gray-600 truncate">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </button>
            );
          })}
        </Card>

        {/* App Info */}
        <Card className="p-6 shadow-sm border-gray-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">À propos de MyHealth AI</h3>
              <p className="text-sm text-blue-800 mb-3">
                Version 1.0.0 - Un diagnostic préliminaire intelligent, rapide et accessible 
                grâce à l&apos;IA + Cloud.
              </p>
              <div className="text-xs text-blue-700 space-y-1">
                <p>🔒 Vos données sont sécurisées et chiffrées</p>
                <p>🏥 Conçu avec des professionnels de santé</p>
                <p>🤖 Propulsé par l&apos;intelligence artificielle</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          onClick={() => {
            if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
              onNavigate('landing');
            }
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}