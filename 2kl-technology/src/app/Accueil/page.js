"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Stethoscope, BookOpen, ArrowRight } from "lucide-react";
import { useState } from "react";
import { articles as articlesData } from "@/lib/articles";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const articles = articlesData;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 pb-24">
      {/* HEADER */}
      <header className="py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-blue-600">MyHealth AI</h1>
        </div>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Rechercher une maladie ou symptôme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-white"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </header>

      {/* BANNER */}
      <section className="mt-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Bienvenue !</h2>
            <p className="text-blue-100">Que souhaitez-vous faire aujourd’hui ?</p>
          </div>
          <Button asChild variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
            <Link href="/diagnostic">Commencer le diagnostic</Link>
          </Button>
        </div>
      </section>

      {/* CARDS PRINCIPALES */}
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition-all cursor-pointer border border-blue-100 bg-white">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-xl">Diagnostic rapide</h3>
            <p className="text-gray-600 text-sm">Analysez vos symptômes avec l'IA</p>
            <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-700">
              <Link href="/diagnostic">
                Démarrer <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-all cursor-pointer border border-purple-100 bg-white">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-xl">Articles santé</h3>
            <p className="text-gray-600 text-sm">Découvrez nos guides médicaux</p>
            <Button asChild variant="ghost" className="text-purple-600 hover:text-purple-700">
              <Link href="/articles">
                Explorer <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* ARTICLES EN VEDETTE */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Articles en vedette</h2>
          <Button asChild variant="link" className="text-blue-600">
            <Link href="/articles">
              Voir tout <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {articles.map((article, index) => (
            <Card key={article.slug} className="min-w-[300px] hover:shadow-md transition-all bg-white">
              <CardContent className="p-0">
                <Link href={`/articles/${article.slug}`} className="block">
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
                    <Image
                      src={article.image}
                      alt={article.alt}
                      fill
                      sizes="(max-width: 640px) 320px, 480px"
                      className="object-cover"
                      priority={index < 2}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fallback-image.jpg";
                      }}
                    />
                  </div>
                </Link>
                <div className="p-4 flex flex-col gap-2">
                  <Link href={`/articles/${article.slug}`} className="hover:underline">
                    <h3 className="font-medium line-clamp-2">{article.title}</h3>
                  </Link>
                  <p className="text-gray-500 text-xs">{article.date}</p>
                  <div className="flex justify-between items-center mt-1">
                    <Button asChild variant="ghost" size="sm" className="text-blue-600">
                      <Link href={`/articles/${article.slug}`}>Lire</Link>
                    </Button>
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
