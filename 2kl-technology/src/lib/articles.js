export const articles = [
  {
    slug: "prevenir-diabete-10-conseils",
    title: "10 conseils pour prévenir le diabète",
    date: "01 Oct 2025",
    image:
      "https://images.unsplash.com/photo-1576091160399-7d8e55e7a9d9?w=1600&auto=format&fit=crop&q=80",
    alt: "Conseils prévention diabète",
    content: `
Le diabète peut être prévenu par des habitudes de vie saines. Voici 10 conseils pratiques:

1. Adoptez une alimentation équilibrée riche en fibres.
2. Réduisez les sucres ajoutés et les boissons sucrées.
3. Pratiquez une activité physique régulière (150 min/semaine).
4. Surveillez votre poids et votre tour de taille.
5. Dormez suffisamment (7-8h par nuit).
6. Gérer le stress (respiration, méditation, marche).
7. Faites des bilans réguliers si vous avez des facteurs de risque.
8. Préférez les céréales complètes aux raffinées.
9. Cuisinez maison pour mieux contrôler les apports.
10. Évitez le tabac et l'alcool excessif.
`,
  },
  {
    slug: "gerer-hypertension-maison",
    title: "Comment gérer l'hypertension à la maison",
    date: "28 Sep 2025",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&auto=format&fit=crop&q=80",
    alt: "Mesure de la tension artérielle",
    content: `
La gestion de l'hypertension repose sur la mesure régulière, l'alimentation pauvre en sel, et l'observance du traitement.
- Mesurez votre pression artérielle à la même heure chaque jour.
- Limitez le sel à < 5 g/jour et privilégiez les fruits et légumes.
- Pratiquez une activité physique modérée.
- Suivez scrupuleusement les prescriptions de votre médecin.
`,
  },
  {
    slug: "tout-savoir-vaccination-grippe",
    title: "Vaccination contre la grippe : ce qu'il faut savoir",
    date: "20 Sep 2025",
    image:
      "https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=1600&auto=format&fit=crop&q=80",
    alt: "Vaccination grippe",
    content: `
La vaccination antigrippale protège contre les formes sévères et réduit la transmission.
- Idéale pour personnes âgées, femmes enceintes, malades chroniques.
- Se fait annuellement, avant la saison grippale.
- Effets secondaires le plus souvent bénins (douleur locale, fièvre légère).
`,
  },
  {
    slug: "sante-mentale-retrouver-equilibre",
    title: "Santé mentale : comment retrouver l'équilibre",
    date: "15 Sep 2025",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=80",
    alt: "Bien-être et santé mentale",
    content: `
Retrouver l'équilibre passe par de petits gestes durables:
- Routine sommeil, alimentation, activité physique.
- Soutien social et expression des émotions.
- Techniques de relaxation (respiration, pleine conscience).
- Demander de l'aide à un professionnel si nécessaire.
`,
  },
];

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug);
}
