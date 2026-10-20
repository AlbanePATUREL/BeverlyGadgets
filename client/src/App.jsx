import { useState } from 'react';
import PageClient from './pages/client.jsx';
import PageGerant from './pages/admin.jsx';

export default function App() {
  const [page, setPage] = useState('client'); // quelle page afficher
  const [panier, setPanier] = useState([]);//creation panier avc useState (création tableau vide)

  function ajouterAuPanier(gadget) {
    setPanier([...panier, gadget]);//ajout gadget au panier en last
  }

    return (
    <>
      <div className="bandeau">Livraison discrète offerte dès 100 € · Emballage top secret</div>
      <header className="header">
        <h1 className="logo">Beverly <span>Gadgets</span></h1>
        <nav>
          {/* La classe "actif" colore le bouton de la page affichée */}
          <button className={page === 'client' ? 'actif' : ''} onClick={() => setPage('client')}>Boutique</button>
          <button className={page === 'gerant' ? 'actif' : ''} onClick={() => setPage('gerant')}>QG</button>
          <button>Panier ({panier.length})</button>
        </nav>
      </header>

      <main className="page">
        <PageClient ajouterAuPanier={ajouterAuPanier} />
      </main>
    </>
  );
}