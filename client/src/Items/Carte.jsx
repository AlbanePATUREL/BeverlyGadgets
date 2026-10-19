export default function Carte({ gadget }) {
  return (
        <div className={gadget.disponible ? 'carte' : 'carte indispo'}>  {/* si....sinon */}
      <h2>{gadget.nom}</h2>
      <p>{gadget.prix} €</p>
    </div>
  );
}