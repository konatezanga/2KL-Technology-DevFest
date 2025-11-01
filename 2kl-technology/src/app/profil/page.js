"use client ";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bell, Lock, HelpCircle, Info } from "lucide-react";

export default function Page() {
  const user = {
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328d7ed7?w=160&auto=format&fit=crop&q=80",
  };

  const menuItems = [
    { label: "Informations personnelles", icon: User },
    { label: "Notifications", icon: Bell },
    { label: "Confidentialité et sécurité", icon: Lock },
    { label: "Aide et support", icon: HelpCircle },
    { label: "À propos de MyHealth AI", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-blue-600 text-white py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Mon Profil</h1>
            <p className="text-sm opacity-90">Espace personnel du patient</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-[60px] h-[60px]">
            <Image
              src={user.avatar}
              alt="Profil"
              fill
              sizes="60px"
              className="rounded-full border border-white object-cover"
              priority
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm opacity-80">{user.email}</p>
          </div>
        </div>
      </header>

      {/* STATISTIQUES */}
      <div className="flex justify-center mt-6 gap-4 px-4 flex-wrap">
        <Card className="w-32 text-center p-4 shadow-md">
          <p className="text-3xl font-bold text-blue-600">3</p>
          <p className="text-sm text-gray-600">Consultations</p>
        </Card>
        <Card className="w-32 text-center p-4 shadow-md">
          <p className="text-3xl font-bold text-blue-600">2</p>
          <p className="text-sm text-gray-600">Résultats</p>
        </Card>
        <Card className="w-32 text-center p-4 shadow-md">
          <p className="text-3xl font-bold text-blue-600">1</p>
          <p className="text-sm text-gray-600">Rendez-vous</p>
        </Card>
      </div>

      {/* BLOCS D'OPTIONS */}
      <div className="max-w-xl mx-auto mt-8 space-y-4 px-4">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-md transition-all cursor-pointer hover:bg-blue-50"
            >
              <CardContent className="py-4 px-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </div>
                <span className="text-blue-500 text-lg">&gt;</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ACTIONS */}
      <div className="max-w-xl mx-auto flex flex-col sm:flex-row justify-between sm:justify-end gap-3 mt-8 mb-6 px-4">
        <Button asChild variant="outline" className="hidden sm:inline-flex">
          <Link href="/Accueil">Accueil</Link>
        </Button>
        <Button variant="destructive">Se déconnecter</Button>
      </div>
    </div>
  );
}
