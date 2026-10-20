import './Layout.css';

// Le haut du site : logo + menu.
export default function Header({ page, setPage, nbPanier }) {
  return (
    <header className="header">
      <h1 className="logo">Beverly <span>Gadgets</span></h1>
      <nav>
        <button className={page === 'client' ? 'actif' : ''} onClick={() => setPage('client')}>Boutique</button>
        <button className={page === 'gerant' ? 'actif' : ''} onClick={() => setPage('gerant')}>QG</button>
        <button>Panier ({nbPanier})</button>
      </nav>
    </header>
  );
}