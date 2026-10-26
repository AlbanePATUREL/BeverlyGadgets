import './Panier.css';
import { formatPrix } from '../format.js';

export default function PagePanier({ panier, onRetirer, onVider, onContinuer }) {
  const total = panier.reduce((somme, l) => somme + l.prix * l.quantite, 0);

  // panier vide
  if (panier.length === 0) {
    return (
      <div className="panier-vide">
        <h2>Votre panier est vide</h2>
        <p>Aucun gadget n'a encore été sélectionné.</p>
        <button className="panier-bouton" onClick={onContinuer}>Découvrir la boutique</button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="panier-titre">Votre panier</h2>

      <div className="panier-lignes">
        {panier.map((l) => (
          <div className="panier-ligne" key={l.id}>
            <img className="panier-image" src={`/images/${l.visuel}`} alt={l.nom} />

            <div className="panier-nom">
              <strong>{l.nom}</strong>
              <span>{formatPrix(l.prix)}</span>
            </div>

            <div className="panier-quantite">
              <span>Quantité : 1</span>
            </div>

            <div className="panier-sous-total">{formatPrix(l.prix * l.quantite)}</div>

            <button className="panier-retirer" onClick={() => onRetirer(l.id)}>Retirer</button>
          </div>
        ))}
      </div>

      <div className="panier-resume">
        <button className="panier-lien" onClick={onVider}>Vider le panier</button>
        <div className="panier-total">
          <span>Total</span>
          <strong>{formatPrix(total)}</strong>
        </div>
      </div>

      <div className="panier-actions">
        <button className="panier-lien" onClick={onContinuer}>← Continuer mes achats</button>
        <button className="panier-bouton" onClick={() => alert('Commande à venir !')}>
          Commander
        </button>
      </div>
    </div>
  );
}