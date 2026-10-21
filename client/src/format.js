export function formatPrix(prix) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',   // format monétaire
    currency: 'EUR',     // en euros (ajoute le € tout seul)
  }).format(prix);
}