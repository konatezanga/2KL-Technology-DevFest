"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
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
  FileText,
  BarChart3,
} from "lucide-react";

export default function LandingPage({ onNavigate }) {
    const router = useRouter();
    const [activeFeature, setActiveFeature] = useState(0);

  /*const [stats, setStats] = useState({ diagnostics: 0, users: 0, accuracy: 0 });*/

  // Animation des statistiques au chargement
  /*useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        diagnostics: prev.diagnostics < 1250 ? prev.diagnostics + 25 : 1250,
        users: prev.users < 500 ? prev.users + 10 : 500,
        accuracy: prev.accuracy < 87 ? prev.accuracy + 1 : 87,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);*/

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
    /*{
      icon: Users,
      title: "Téléconsultation",
      description: "Connectez-vous avec des médecins spécialistes à distance",
      color: "bg-gradient-to-br from-orange-500 to-red-500",
    },*/
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
    {
        icon: FileText,
        title: "Articles médicaux",
        description: "Ressources éducatives pour mieux comprendre la santé et se dépister",
        color: "bg-gradient-to-br from-pink-500 to-red-500",
    }
  ];

  /*const testimonials = [
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
  ];*/

  const handleNavigate = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      router.push(path);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header avec effet glassmorphism */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Consult
              </span>
              <p className="text-xs text-gray-500 xs:block">Diagnostic Intelligent</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base"
            >
              Fonctionnalités
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base"
            >
              Comment ça marche
            </a>
            {/*<a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Témoignages
            </a>*/}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              onClick={() => handleNavigate("auth")}
              className="bg-gradient-to-r from-blue-600 cursor-pointer to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group py-2 px-3 sm:px-4 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Commencer</span>
              <span className="sm:hidden">Start</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section avec animations */}
      <div className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 bg-gradient-to-b from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Éléments décoratifs animés */}
        <div 
          className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
          aria-hidden="true"
        ></div>
        <div 
          className="absolute top-20 sm:top-40 right-4 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
          aria-hidden="true"
        ></div>
        <div 
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
          aria-hidden="true"
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              {/* Badge animé */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-700 text-xs sm:text-sm font-medium border border-blue-200 hover:scale-105 transition-transform duration-300">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                <span className="hidden xs:inline">Intelligence Artificielle + Cloud Computing</span>
                <span className="xs:hidden">IA + Cloud</span>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
                  Diagnostic préliminaire intelligent
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Consult combine{" "}
                <span className="font-semibold text-blue-600">IA</span> et{" "}
                <span className="font-semibold text-purple-600">Cloud</span>{" "}
                pour offrir aux agents de santé et à la population un outil de diagnostic
                accessible partout, même dans les zones les plus reculées
                d'Afrique.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button
                  onClick={() => handleNavigate("auth")}
                  size="lg"
                  className="bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 group w-full sm:w-auto"
                >
                  Essayer gratuitement
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  size="lg"
                  variant="outline"
                  className="border-2 cursor-pointer border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                >
                  Voir la démo
                </Button>
              </div>
            </div>

            {/* Image hero réduite */}
            <div className="relative group flex justify-center order-first lg:order-last mb-8 lg:mb-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl sm:blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Medical professional using technology"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>

              {/* Badges flottants - cachés sur mobile */}
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-2 sm:p-4 animate-float hidden sm:block">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm sm:text-base">
                      Diagnostic rapide
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">&lt;2 minutes</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-2 sm:p-4 animate-float animation-delay-2000 hidden sm:block">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm sm:text-base">Fiable</div>
                    <div className="text-xs sm:text-sm text-gray-600">Vérifié par IA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Section avec hover effects */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-red-100 rounded-full text-red-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              Problèmes actuels
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Les défis que nous résolvons
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Des solutions concrètes pour les zones rurales africaines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Card
                  key={index}
                  className="group p-4 sm:p-6 lg:p-8 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 sm:hover:-translate-y-2 relative overflow-hidden"
                >
                  {/* Effet de fond animé */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${problem.iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                    >
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${problem.iconColor}`} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {problem.description}
                    </p>
                  </div>

                  {/* Indicateur de numéro */}
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center text-gray-400 group-hover:text-blue-600 font-bold text-xs sm:text-sm transition-colors">
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
        className="py-16 sm:py-20 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-blue-100 rounded-full text-blue-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Fonctionnalités puissantes
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Une solution complète et intelligente
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Tous les outils nécessaires pour un diagnostic préliminaire rapide
              et fiable
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group p-4 sm:p-6 hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 bg-white"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ${feature.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how-it-works" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-purple-100 rounded-full text-purple-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
              Processus simple
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Un diagnostic en 3 étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Ligne de connexion */}
            <div className="hidden md:block absolute top-8 sm:top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200"></div>

            {[
              {
                number: "01",
                title: "Saisie des symptômes",
                description:
                  "L'utilisateurs entre les symptômes et signes vitaux",
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
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 sm:hover:-translate-y-2">
                    {/* Numéro de l'étape */}
                    <div className="absolute -top-4 sm:-top-6 left-4 sm:left-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-blue-50">
                      <span
                        className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}
                      >
                        {step.number}
                      </span>
                    </div>

                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${step.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-xl mt-2 sm:mt-4`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
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
      <div className="py-16 sm:py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:w-80 lg:h-56 xl:w-96 xl:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1659353886114-9aa119aef5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Medical articles and research"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-xs sm:text-sm font-medium border border-purple-200">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                Autres fonctionnalités
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Articles santé et tests de dépistage interactifs
              </h2>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Accédez à une bibliothèque complète d'articles détaillés sur les
                maladies courantes et leurs symptômes. Chaque article est
                accompagné d'un test interactif personnalisé pour évaluer votre
                risque.
              </p>

              <ul className="space-y-3 sm:space-y-4">
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
                      className="flex items-start gap-3 sm:gap-4 group"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm sm:text-base">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <Button
                onClick={() => handleNavigate("auth")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group mt-2 sm:mt-4 cursor-pointer w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4"
              >
                Explorer les articles
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section finale */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-blue-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-center text-white shadow-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Prêt à commencer votre diagnostic ?
          </h2>
          <p className="text-blue-100 mb-6 sm:mb-8 text-base sm:text-lg">
            Obtenez des recommandations médicales personnalisées en quelques minutes
          </p>
          <Button 
            onClick={() => handleNavigate("auth")}
            size="lg"
            variant="secondary"
            className="bg-white cursor-pointer text-blue-600 hover:bg-gray-100 font-medium px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
          >
            Commencer gratuitement
          </Button>
        </div>
      </div>

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