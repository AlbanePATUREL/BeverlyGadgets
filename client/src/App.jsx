import { useState } from 'react';
import PageClient from './pages/client.jsx';
import PageGerant from './pages/admin.jsx';
import Header from './Items/Header.jsx';
import Footer from './Items/Footer.jsx';

export default function App() {
  const [page, setPage] = useState('client'); // quelle page afficher
  const [panier, setPanier] = useState([]);   //creation panier avc useState (création tableau vide)

  function ajouterAuPanier(gadget) {
    setPanier([...panier, gadget]); //ajout gadget au panier en last
  }

  return (
    <>
      <div className="bandeau">Livraison discrète offerte dès 100 € · Emballage top secret</div>

      {/* le header reçoit la page actuelle, le moyen d'en changer et le nombre d'articles du panier */}
      <Header page={page} setPage={setPage} nbPanier={panier.length} />

      <main className="page">
        {page === 'client'
          ? <PageClient ajouterAuPanier={ajouterAuPanier} />
          : <PageGerant />}
      </main>

      <Footer />
    </>
  );
}