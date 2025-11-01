"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card"; // Ajout de CardContent
import { Checkbox } from "@/components/ui/checkbox"; // Utilisation du composant Checkbox de shadcn/ui
import { ExternalLink, Home, Activity } from "lucide-react"; // Remplacement de l'icône personnalisée par une icône lucide

// Renommée pour plus de clarté et utilise l'icône 'Activity' de lucide
function ActivityIcon({ className }) {
  return <Activity className={className} />;
}

export function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");

  // Déplacé l'état du formulaire ici pour une meilleure gestion de l'état (même si non utilisé pour l'API)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Gestion des changements de formulaire (ajouté pour l'interactivité future)
  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.id.replace("login-", "")]: e.target.value,
    });
  };
  const handleSignupChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.id.replace("signup-", "")]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Ajouter ici la logique d'appel API de Connexion
    console.log("Tentative de Connexion avec:", loginForm);
    router.push("/userinfo");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: Ajouter ici la logique d'appel API d'Inscription
    console.log("Tentative d'Inscription avec:", signupForm);
    router.push("/userinfo");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        {/* Logo et Slogan */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-14 h-14 bg-blue-600 rounded-xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <ActivityIcon className="w-8 h-8 text-white animate-pulse" />{" "}
              {/* Effet plus dynamique */}
            </div>
            <span className="text-blue-900 font-extrabold text-3xl tracking-tight">
              MyHealth AI
            </span>
          </div>
          <p className="text-gray-500 mt-2 text-md">
            Votre assistant santé intelligent et{" "}
            <span className="text-blue-600 font-semibold">sécurisé</span>
          </p>
        </div>

        {/* Auth Card Améliorée */}
        <Card className="p-0 border-none shadow-2xl bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            {" "}
            {/* Utilisation de CardContent pour un meilleur padding */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg p-1 mb-6">
                <TabsTrigger
                  value="login"
                  className="font-semibold text-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                >
                  Connexion
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="font-semibold text-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                >
                  Inscription
                </TabsTrigger>
              </TabsList>

              {/* Contenu de Connexion */}
              <TabsContent
                value="login"
                className="space-y-6 mt-4 animate-in fade-in-50 slide-in-from-right-2"
              >
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="login-email"
                      className="text-gray-700 font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="votre.email@exemple.com"
                      required
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="login-password"
                      className="text-gray-700 font-medium"
                    >
                      Mot de passe
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm pt-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        className="border-gray-400 data-[state=checked]:bg-blue-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="text-gray-600 select-none cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        Se souvenir de moi
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1"
                    >
                      Mot de passe oublié ? <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-lg shadow-blue-500/50 transition-all duration-300 transform hover:scale-[1.01]"
                  >
                    Se connecter
                  </Button>
                </form>
              </TabsContent>

              {/* Contenu d'Inscription */}
              <TabsContent
                value="signup"
                className="space-y-6 mt-4 animate-in fade-in-50 slide-in-from-left-2"
              >
                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-name"
                      className="text-gray-700 font-medium"
                    >
                      Nom complet
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="KOUASSI Konan Jean Luc"
                      required
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                      value={signupForm.name}
                      onChange={handleSignupChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-email"
                      className="text-gray-700 font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="kouassi@exemple.com"
                      required
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-password"
                      className="text-gray-700 font-medium"
                    >
                      Mot de passe
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                      value={signupForm.password}
                      onChange={handleSignupChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-confirm"
                      className="text-gray-700 font-medium"
                    >
                      Confirmer le mot de passe
                    </Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                      value={signupForm.confirmPassword}
                      onChange={handleSignupChange}
                    />
                  </div>

                  <div className="flex items-start gap-2 text-sm pt-1">
                    <Checkbox
                      id="terms"
                      required
                      className="mt-1 border-gray-400 data-[state=checked]:bg-blue-600"
                    />
                    <label
                      htmlFor="terms"
                      className="text-gray-600 select-none cursor-pointer"
                    >
                      J'accepte les{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        conditions d'utilisation
                      </a>{" "}
                      et la{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        politique de confidentialité
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-lg shadow-blue-500/50 transition-all duration-300 transform hover:scale-[1.01]"
                  >
                    Créer un compte
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/")}
            className="text-gray-500 hover:text-blue-600 text-base font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <Home className="w-4 h-4" /> Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}
