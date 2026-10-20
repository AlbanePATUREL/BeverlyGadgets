import { useState } from 'react';
import PageClient from './pages/client.jsx';
import PageGerant from './pages/admin.jsx';

export default function App() {
  const [page, setPage] = useState('client'); // quelle page afficher

    return (
    <>
      <div className="bandeau">Livraison discrète offerte dès 100 € · Emballage top secret</div>
      <header className="header">
        <h1 className="logo">Beverly <span>Gadgets</span></h1>
        <nav>
          {/* La classe "actif" colore le bouton de la page affichée */}
          <button className={page === 'client' ? 'actif' : ''} onClick={() => setPage('client')}>Boutique</button>
          <button className={page === 'gerant' ? 'actif' : ''} onClick={() => setPage('gerant')}>QG</button>
        </nav>
      </header>

      <main className="page">
        {page === 'client' ? <PageClient /> : <PageGerant />}
      </main>
    </>
  );
}