import { useState } from 'react';
import PageClient from './pages/client.jsx';
import PageGerant from './pages/admin.jsx';
import PagePanier from './Items/Panier.jsx';         
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
        return prev;
      }
      return [...prev, { ...gadget, quantite: 1 }];
    });
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
        {page === 'client' && <PageClient ajouterAuPanier={ajouterAuPanier} />}
        {page === 'gerant' && <PageGerant />}
        {page === 'panier' && (
          <PagePanier
            panier={panier}
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