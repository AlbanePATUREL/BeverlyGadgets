// Une carte produit : image, catégorie, nom, prix
import { formatPrix } from '../format.js';
export default function Carte({ gadget, onClick }) {
  return (
    <div className={gadget.disponible ? 'carte' : 'carte indispo'} onClick={onClick}>
      {/* si...sinon */}
      {!gadget.disponible && <span className="badge">En mission</span>}

      {/* Les images sont dans client/public/images */}
      <img className="carte-image" src={`/images/${gadget.visuel}`} alt={gadget.nom} />

      <div className="carte-infos">
        <h2>{gadget.nom}</h2>
        <p className="carte-prix">{formatPrix(gadget.prix)}</p>
      </div>
    </div>
  );
}