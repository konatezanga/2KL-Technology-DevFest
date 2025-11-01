"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Clock,
  Navigation,
  AlertCircle,
  Activity,
  Brain,
  Cloud,
  Shield,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Sparkles,
  Heart,
  Award,
  BarChart3,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({ diagnostics: 0, users: 0, accuracy: 0 });

  // Animation des statistiques au chargement
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        diagnostics: prev.diagnostics < 1250 ? prev.diagnostics + 25 : 1250,
        users: prev.users < 500 ? prev.users + 10 : 500,
        accuracy: prev.accuracy < 87 ? prev.accuracy + 1 : 87,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Rotation automatique des features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const problems = [
    {
      icon: Clock,
      title: "Retards de diagnostic",
      description: "Des délais d'attente trop longs pour obtenir un diagnostic",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: Navigation,
      title: "Mauvaise orientation",
      description: "Difficulté à identifier le bon service médical",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: AlertCircle,
      title: "Surmenage médical",
      description: "Personnel soignant surchargé par des cas non urgents",
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  const features = [
    {
      icon: Brain,
      title: "IA de Diagnostic",
      description:
        "Analyse intelligente des symptômes avec algorithmes de machine learning avancés",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      icon: Cloud,
      title: "Stockage Cloud Sécurisé",
      description:
        "Tous vos dossiers médicaux accessibles partout, en toute sécurité",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Confidentialité Garantie",
      description:
        "Chiffrement de bout en bout et conformité aux normes médicales",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      title: "Téléconsultation",
      description: "Connectez-vous avec des médecins spécialistes à distance",
      color: "bg-gradient-to-br from-orange-500 to-red-500",
    },
    {
      icon: TrendingUp,
      title: "Recommandations Intelligentes",
      description:
        "Suggestions d'actions précises basées sur votre état de santé",
      color: "bg-gradient-to-br from-indigo-500 to-purple-500",
    },
    {
      icon: Globe,
      title: "Accessible Partout",
      description: "Fonctionne même avec une connexion internet limitée",
      color: "bg-gradient-to-br from-teal-500 to-green-500",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Marie Kouassi",
      role: "Centre de Santé Rural, Bouaké",
      content:
        "HealthCloud a transformé notre façon de travailler. Nous pouvons maintenant diagnostiquer rapidement et orienter efficacement nos patients.",
      avatar: "MK",
      rating: 5,
    },
    {
      name: "Infirmier Jean Yao",
      role: "Dispensaire de Korhogo",
      content:
        "Un outil indispensable pour les zones rurales. L'IA nous aide à ne rater aucun cas urgent.",
      avatar: "JY",
      rating: 5,
    },
    {
      name: "Dr. Fatou Diallo",
      role: "Hôpital Général de Man",
      content:
        "La téléconsultation intégrée nous permet d'accompagner les agents de santé à distance. Excellent !",
      avatar: "FD",
      rating: 5,
    },
  ];

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header avec effet glassmorphism */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                HealthCloud
              </span>
              <p className="text-xs text-gray-500">Diagnostic Intelligent</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Fonctionnalités
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Comment ça marche
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Témoignages
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => handleNavigate("/login")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Connexion
            </Button>
            <Button
              onClick={() => handleNavigate("/login")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Commencer
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section avec animations */}
      <div className="pt-32 pb-20 bg-gradient-to-b from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Éléments décoratifs animés */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              {/* Badge animé */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-700 text-sm font-medium border border-blue-200 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Zap className="w-4 h-4 animate-pulse" />
                <span>Intelligence Artificielle + Cloud Computing</span>
                <Sparkles className="w-4 h-4" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
                  Diagnostic préliminaire intelligent
                </span>
                <br />
                <span className="text-gray-900">
                  pour centres de santé éloignés
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                HealthCloud combine{" "}
                <span className="font-semibold text-blue-600">IA</span> et{" "}
                <span className="font-semibold text-purple-600">Cloud</span>{" "}
                pour offrir aux agents de santé un outil de diagnostic
                accessible partout, même dans les zones les plus reculées
                d'Afrique.
              </p>

              {/* Statistiques animées */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stats.diagnostics}+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Diagnostics</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {stats.users}+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Utilisateurs</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {stats.accuracy}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Précision</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => handleNavigate("/login")}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6 group"
                >
                  Essayer gratuitement
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 text-lg px-8 py-6"
                >
                  Voir la démo
                </Button>
              </div>
            </div>

            {/* Image hero avec effet 3D */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Medical professional using technology"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>

              {/* Badges flottants */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      Diagnostic rapide
                    </div>
                    <div className="text-sm text-gray-600">&lt;2 minutes</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float animation-delay-2000">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Fiable à 87%</div>
                    <div className="text-sm text-gray-600">Vérifié par IA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Section avec hover effects */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full text-red-700 text-sm font-medium mb-4">
              <AlertCircle className="w-4 h-4" />
              Problèmes actuels
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Les défis que nous résolvons
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des solutions concrètes pour les zones rurales africaines
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Card
                  key={index}
                  className="group p-8 hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-blue-200 cursor-pointer transform hover:-translate-y-2 relative overflow-hidden"
                >
                  {/* Effet de fond animé */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 ${problem.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                    >
                      <Icon className={`w-8 h-8 ${problem.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>

                  {/* Indicateur de numéro */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center text-gray-400 group-hover:text-blue-600 font-bold text-sm transition-colors">
                    {index + 1}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section avec interactions */}
      <div
        id="features"
        className="py-20 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Fonctionnalités puissantes
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Une solution complète et intelligente
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tous les outils nécessaires pour un diagnostic préliminaire rapide
              et fiable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 cursor-pointer bg-white"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div
                    className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
              <BarChart3 className="w-4 h-4" />
              Processus simple
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un diagnostic en 3 étapes simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Ligne de connexion */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200"></div>

            {[
              {
                number: "01",
                title: "Saisie des symptômes",
                description:
                  "L'agent de santé entre les symptômes et signes vitaux du patient",
                icon: Activity,
                color: "from-blue-500 to-cyan-500",
              },
              {
                number: "02",
                title: "Analyse par l'IA",
                description:
                  "Notre algorithme analyse les données et génère un diagnostic préliminaire",
                icon: Brain,
                color: "from-purple-500 to-pink-500",
              },
              {
                number: "03",
                title: "Recommandations",
                description:
                  "Obtention des recommandations d'action et niveau d'urgence",
                icon: TrendingUp,
                color: "from-green-500 to-emerald-500",
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
                    {/* Numéro de l'étape */}
                    <div className="absolute -top-6 left-8 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-blue-50">
                      <span
                        className={`text-xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}
                      >
                        {step.number}
                      </span>
                    </div>

                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl mt-4`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Articles Feature Section */}
      <div className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1659353886114-9aa119aef5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Medical articles and research"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
              </div>
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium border border-purple-200">
                <Sparkles className="w-4 h-4 animate-pulse" />
                Nouvelle fonctionnalité
              </div>

              <h2 className="text-4xl font-bold text-gray-900">
                Articles santé et tests de dépistage interactifs
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Accédez à une bibliothèque complète d'articles détaillés sur les
                maladies courantes et leurs symptômes. Chaque article est
                accompagné d'un test interactif personnalisé pour évaluer votre
                risque.
              </p>

              <ul className="space-y-4">
                {[
                  { text: "Informations médicales vérifiées", icon: Shield },
                  { text: "Tests interactifs personnalisés", icon: Brain },
                  {
                    text: "Évaluation du risque en quelques minutes",
                    icon: Clock,
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={i}
                      className="flex items-start gap-4 group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium group-hover:text-purple-600 transition-colors">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <Button
                onClick={() => handleNavigate("/login")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group mt-4"
              >
                Explorer les articles
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full text-yellow-700 text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Témoignages
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les retours de nos utilisateurs sur le terrain
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-yellow-200 group"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section finale */}
      <div className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 relative overflow-hidden">
        {/* Effet de fond animé */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/30">
            <Zap className="w-4 h-4" />
            Rejoignez-nous dès aujourd'hui
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à révolutionner vos diagnostics ?
          </h2>

          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Obtenez des recommandations médicales personnalisées en quelques
            minutes grâce à l'intelligence artificielle et le cloud computing
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => handleNavigate("/login")}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg px-10 py-6 group w-full sm:w-auto"
            >
              Commencer gratuitement
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button
              onClick={() => handleNavigate("/login")}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-lg px-10 py-6 w-full sm:w-auto"
            >
              Demander une démo
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-white/20">
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                Gratuit pendant 30 jours
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Données sécurisées</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Support 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo et description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">
                    HealthCloud
                  </span>
                  <p className="text-xs text-gray-400">
                    Diagnostic Intelligent
                  </p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Solution de diagnostic préliminaire intelligent pour centres de
                santé éloignés. Propulsé par l'Intelligence Artificielle et
                Google Cloud.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  AI
                </div>
                <span className="text-sm text-gray-400">
                  Powered by Google Cloud
                </span>
              </div>
            </div>

            {/* Liens rapides */}
            <div>
              <h3 className="text-white font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Comment ça marche
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Témoignages
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Globe className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Abidjan, Côte d'Ivoire</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>contact@healthcloud.ci</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Support 24/7 disponible</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Ligne de séparation */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                © 2025 HealthCloud. Tous droits réservés.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Confidentialité
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Conditions
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Sécurité
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles CSS personnalisés pour les animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
