
"use client";
import { AuthPage } from "@/components/AuthPage";

export default function Auth() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <AuthPage onNavigate={() => {}} />
      </div>
    </div>
  );
}
