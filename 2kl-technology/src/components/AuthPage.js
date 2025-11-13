"use client";
import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import { Card, CardContent } from "./ui/Card";
import { Checkbox } from "./ui/Checkbox";
import { Activity, Eye, EyeOff, ArrowLeft, Shield, Heart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { registerUser, loginUser } from "@/firebase/authFunctions";



function ActivityIcon({ className }) {
  return <Activity className={className} />;
}

export function AuthPage({ onNavigate, onAuth }) {
  const [activeTab, setActiveTab] = useState("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await loginUser(loginForm.email, loginForm.password);
    alert("Connecté avec succès !");
    router.push("/accueil"); // Redirection après connexion
  } catch (error) {
    console.error(error);
    alert("Erreur de connexion : " + error.message);
  }
};


 const handleSignup = async (e) => {
  e.preventDefault();
  
  if (signupForm.password !== signupForm.confirmPassword) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  try {
    await registerUser(signupForm.email, signupForm.password);
    alert("Compte créé avec succès !");
    router.push("/accueil"); // Redirection après inscription
  } catch (error) {
    console.error(error);
    alert("Erreur d'inscription : " + error.message);
  }
};


  const handleBackToHome = () => {
    router.push("/");
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Éléments décoratifs animés */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo avec animation */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 mb-3 group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
              <ActivityIcon className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Consult
              </h1>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                Diagnostic Intelligent
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Votre assistant santé{" "}
            <span className="font-semibold text-blue-600">intelligent</span> et{" "}
            <span className="font-semibold text-purple-600">sécurisé</span>
          </p>
        </div>

        {/* Carte d'authentification améliorée */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 bg-gray-100/80 rounded-xl p-1 mb-6 sm:mb-8">
                <TabsTrigger
                  value="login"
                  className="font-semibold text-sm sm:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 py-3 rounded-lg"
                >
                  Connexion
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="font-semibold text-sm sm:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 py-3 rounded-lg"
                >
                  Inscription
                </TabsTrigger>
              </TabsList>

              {/* Connexion */}
              <TabsContent value="login" className="space-y-4 sm:space-y-5 animate-in fade-in-50">
                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-700 font-medium text-sm sm:text-base">
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="votre.email@exemple.com"
                      required
                      className="h-11 sm:h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl bg-white"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-700 font-medium text-sm sm:text-base">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        name="password"
                        type={showLoginPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="h-11 sm:h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl bg-white pr-12"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                      >
                        {showLoginPassword ? (
                          <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                      <Checkbox className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                      Se souvenir de moi
                    </label>
                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium">
                      Mot de passe oublié ?
                    </a>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] rounded-xl"
                  >
                    Se connecter
                  </Button>
                </form>
              </TabsContent>

              {/* Inscription */}
              <TabsContent value="signup" className="space-y-4 sm:space-y-5 animate-in fade-in-50">
                <form onSubmit={handleSignup} className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-gray-700 font-medium text-sm sm:text-base">
                      Nom
                    </Label>
                    <Input
                      id="signup-name"
                      name="name"
                      type="text"
                      placeholder="Nom complet"
                      required
                      className="h-11 sm:h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl bg-white"
                      value={signupForm.name}
                      onChange={handleSignupChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-700 font-medium text-sm sm:text-base">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="votre.email@exemple.com"
                      required
                      className="h-11 sm:h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl bg-white"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-700 font-medium text-sm sm:text-base">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        name="password"
                        type={showSignupPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="h-11 sm:h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl bg-white pr-12"
                        value={signupForm.password}
                        onChange={handleSignupChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                      >
                        {showSignupPassword ? (
                          <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirmPassword" className="text-gray-700 font-medium text-sm sm:text-base">
                      Confirmer le mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="h-11 sm:h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl bg-white pr-12"
                        value={signupForm.confirmPassword}
                        onChange={handleSignupChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <label className="text-gray-600 cursor-pointer leading-relaxed">
                      <Checkbox required className="mr-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                      J'accepte les{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                        conditions d'utilisation
                      </a>{" "}
                      et la{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                        politique de confidentialité
                      </a>
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] rounded-xl"
                  >
                    Créer un compte
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Bouton retour */}
        <div className="text-center mt-6 sm:mt-8">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm sm:text-base font-medium transition-colors duration-200 hover:underline group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </button>
        </div>

        {/* Badge de sécurité */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-300/50">
            <Heart className="w-3 h-3 text-red-500" />
            <span>Vos données médicales sont sécurisées et confidentielles</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;