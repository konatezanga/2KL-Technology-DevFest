
 "use client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { getArticleBySlug } from "@/lib/articles";

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-8 py-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/Accueil">← Retour</Link>
        </Button>
        <Card className="overflow-hidden">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={article.image}
              alt={article.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-image.jpg";
              }}
            />
          </div>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
            <p className="text-gray-500 text-sm mb-6">{article.date}</p>
            <article className="prose prose-blue max-w-none whitespace-pre-wrap">
              {article.content}
            </article>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
