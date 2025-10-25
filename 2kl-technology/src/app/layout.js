import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mon Application",
  description: "Interface avec footer de navigation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen pb-16"> {/* pb-16 = espace pour le footer */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
