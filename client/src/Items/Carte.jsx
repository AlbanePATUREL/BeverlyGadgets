// Une carte produit : image, catégorie, nom, prix
export default function Carte({ gadget }) {
  return (
    <div className={gadget.disponible ? 'carte' : 'carte indispo'}>
      {/* si...sinon */}
      {!gadget.disponible && <span className="badge">En mission</span>}

      {/* Les images sont dans client/public/images */}
      <img className="carte-image" src={`/images/${gadget.visuel}`} alt={gadget.nom} />

      <div className="carte-infos">
        <p className="carte-categorie">{gadget.categorie}</p>
        <h2>{gadget.nom}</h2>
        <p className="carte-prix">{gadget.prix} €</p>
      </div>
    </div>
  );
}