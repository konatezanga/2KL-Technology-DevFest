"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { UserInfoPage } from "@/components/UserInfoPage";
import { SymptomsPage } from "@/components/SymptomsPage";
import { ResultsPage } from "@/components/ResultsPage";
import Footer from "@/components/Footer";

export default function DiagnosticPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("s") || 1);

  const handleNavigate = (pageKey) => {
    // Bottom navigation
    if (pageKey === "home") return router.push("/accueil");
    if (pageKey === "diagnosis") return router.push("/diagnostic?s=1");
    if (pageKey === "history") return router.push("/historique");
    if (pageKey === "profile") return router.push("/profil");

    // Wizard navigation
    if (pageKey === "userinfo") return router.push("/diagnostic?s=1");
    if (pageKey === "symptoms") return router.push("/diagnostic?s=2");
    if (pageKey === "results") return router.push("/diagnostic?s=3");
  };

  const renderStep = () => {
    if (step === 1) return <UserInfoPage onNavigate={handleNavigate} />;
    if (step === 2) return <SymptomsPage onNavigate={handleNavigate} />;
    if (step === 3) return <ResultsPage onNavigate={handleNavigate} />;
    // fallback
    return <UserInfoPage onNavigate={handleNavigate} />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {renderStep()}
      </div>
      <Footer currentPage="diagnosis" onNavigate={handleNavigate} />
    </div>
  );
}
