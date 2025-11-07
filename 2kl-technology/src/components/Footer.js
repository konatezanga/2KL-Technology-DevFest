"use client";
import { Home, Activity, History, User } from "lucide-react";

export default function Footer({ currentPage, onNavigate }) {
  const navItems = [
    { key: "home", label: "Accueil", icon: <Home size={22} /> },
    { key: "diagnosis", label: "Diagnostic", icon: <Activity size={22} /> },
    { key: "history", label: "Historique", icon: <History size={22} /> },
    { key: "profile", label: "Profil", icon: <User size={22} /> },
  ];

  const handleNavigation = (pageKey) => {
    if (typeof onNavigate === 'function') {
      onNavigate(pageKey);
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-center md:gap-16 gap-8 py-4 z-50">
      {navItems.map((item) => {
        const active = currentPage === item.key;
        return (
          <button
            key={item.key}
            onClick={() => handleNavigation(item.key)}
            className={`flex flex-col items-center text-sm gap-0.5 transition-colors duration-200 ${
              active 
                ? "text-blue-600" 
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            <div className={active ? "scale-110 transition-transform" : ""}>
              {item.icon}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </footer>
  );
}