'use client';

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
  Settings,
  CheckCircle2,
  FileText,
  ShieldCheck
} from 'lucide-react';

// Composant ImageWithFallback pour Next.js
function ImageWithFallback({ src, alt, className }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full overflow-hidden shadow-lg relative flex-shrink-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691463610-3c2ecf5fb3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwc21pbGluZ3xlbnwxfHx8fDE3NTk0MTY5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Profile"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Jean Dupont</h1>
              <div className="flex items-center gap-2 text-lg text-gray-600 mb-1">
                <Mail className="w-5 h-5" />
                jean.dupont@email.com
              </div>
              <div className="flex items-center gap-2 text-lg text-gray-600">
                <Calendar className="w-5 h-5" />
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
          <Card className="p-5 text-center border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
            <div className="text-lg text-gray-600 font-medium">Consultations</div>
          </Card>
          <Card className="p-5 text-center border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">2</div>
            <div className="text-lg text-gray-600 font-medium">Résolues</div>
          </Card>
          <Card className="p-5 text-center border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">1</div>
            <div className="text-lg text-gray-600 font-medium">En cours</div>
          </Card>
        </div>

        {/* Menu Items */}
        <Card className="divide-y divide-gray-200 border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-4 p-5 hover:bg-gray-50/80 transition-all duration-200 text-left"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900 truncate">{item.title}</h4>
                  <p className="text-gray-600 text-lg truncate">{item.description}</p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
              </button>
            );
          })}
        </Card>

        {/* App Info */}
        <Card className="p-6 border-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">À propos de MyHealth AI</h3>
              <p className="text-gray-700 text-lg mb-3 leading-relaxed">
                Version 1.0.0 - Un diagnostic préliminaire intelligent, rapide et accessible 
                grâce à l&apos;IA + Cloud.
              </p>
              <div className="text-gray-700 space-y-2 text-lg">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>Vos données sont sécurisées et chiffrées</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Conçu avec des professionnels de santé</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Propulsé par l&apos;intelligence artificielle</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full h-12 text-red-600 hover:text-red-700 hover:bg-red-50 border-2 border-red-200 rounded-xl font-semibold text-lg transition-all duration-200"
          onClick={() => {
            if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
              onNavigate('landing');
            }
          }}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}