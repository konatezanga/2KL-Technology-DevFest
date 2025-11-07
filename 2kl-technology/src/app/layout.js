import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Diagnostic App",
  description: "IA et Cloud Computing pour fournir un outil de diagnostic préliminaire intelligent, rapide et accessible partout.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen pb-16">
        {children}
      </body>
    </html>
  );
}