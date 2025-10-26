"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, History, User } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Accueil", icon: <Home size={22} /> },
    { href: "/diagnostic", label: "Diagnostic", icon: <Activity size={22} /> },
    { href: "/historique", label: "Historique", icon: <History size={22} /> },
    { href: "/profil", label: "Profil", icon: <User size={22} /> },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-center md:gap-16 gap-8 py-4">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center text-sm gap-0.5 ${
              active ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <div>{item.icon}</div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </footer>
  );
}
