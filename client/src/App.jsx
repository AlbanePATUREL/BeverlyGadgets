import { useState } from 'react';
import PageClient from './pages/client.jsx';
import PageGerant from './pages/admin.jsx';
import PagePanier from './Items/Panier.jsx';          // NOUVEAU : la page panier
import Header from './Items/Header.jsx';
import Footer from './Items/Footer.jsx';

export default function App() {
  const [page, setPage] = useState('client'); // 'client', 'admin' ou 'panier'
  const [panier, setPanier] = useState([]);   // chaque ligne = { ...gadget, quantite }

  // CHANGÉ : si le gadget est déjà dans le panier, on augmente sa quantité
  function ajouterAuPanier(gadget) {
    setPanier((prev) => {
      const existant = prev.find((l) => l.id === gadget.id);
      if (existant) {
        return prev.map((l) =>
          l.id === gadget.id ? { ...l, quantite: l.quantite + 1 } : l
        );
      }
      return [...prev, { ...gadget, quantite: 1 }];
    });
  }

  // NOUVEAU : +1 ou -1 sur une ligne (à 0, la ligne disparaît)
  function changerQuantite(id, delta) {
    setPanier((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, quantite: l.quantite + delta } : l))
        .filter((l) => l.quantite > 0)
    );
  }

  // NOUVEAU : supprime une ligne
  function retirerDuPanier(id) {
    setPanier((prev) => prev.filter((l) => l.id !== id));
  }

  // NOUVEAU : vide tout le panier
  function viderPanier() {
    setPanier([]);
  }

  // CHANGÉ : on additionne les quantités (et non plus panier.length)
  const nbPanier = panier.reduce((total, l) => total + l.quantite, 0);

  return (
    <>
      <div className="bandeau">Livraison discrète offerte dès 100 € · Emballage top secret</div>

      {/* le header reçoit la page actuelle, le moyen d'en changer et le nombre d'articles du panier */}
      <Header page={page} setPage={setPage} nbPanier={nbPanier} />

      <main className="page">
        {/* CHANGÉ : trois pages au lieu de deux */}
        {page === 'client' && <PageClient ajouterAuPanier={ajouterAuPanier} />}
        {page === 'admin' && <PageGerant />}
        {page === 'panier' && (
          <PagePanier
            panier={panier}
            onChangerQuantite={changerQuantite}
            onRetirer={retirerDuPanier}
            onVider={viderPanier}
            onContinuer={() => setPage('client')}
          />
        )}
      </main>

      <Footer />
    </>
  );
}