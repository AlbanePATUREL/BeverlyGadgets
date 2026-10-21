import { useEffect, useState } from 'react';
import { lireGadget } from '../api.js';
import './Fiche.css';

// fiche détaillée d'un gadget.
// "id" = le gadget à afficher, "onRetour" = la fonction pour revenir au catalogue
export default function FicheGadget({ id, onRetour }) {
  const [gadget, setGadget] = useState(null);
  const [erreur, setErreur] = useState('');

  // quand la fiche s'ouvre : on remonte en haut de la page et on demande ce gadget à l'API
  useEffect(() => {
    window.scrollTo(0, 0);
    lireGadget(id)
      .then(setGadget)
      .catch((err) => setErreur(err.message));
  }, [id]);

  const boutonRetour = (
    <button className="fiche-retour" onClick={onRetour}>← Retour au catalogue</button>
  );

  // trois cas : erreur (404), chargement en cours, ou fiche prête
  if (erreur) return <div>{boutonRetour}<p>{erreur}</p></div>;
  if (!gadget) return <p className="fiche-chargement">Chargement…</p>;

  return (
    <div>
      {boutonRetour}

      <div className="fiche-contenu">
        <img
          className={gadget.disponible ? 'fiche-image' : 'fiche-image fiche-indispo'}
          src={`/images/${gadget.visuel}`}
          alt={gadget.nom}
        />

        <div className="fiche-infos">
          <p className="fiche-description">
            {gadget.description || "Un gadget exclusif sélectionné par le QG. Plus d'informations très bientôt."}
          </p>
          <h2>{gadget.nom}</h2>
          <p className="fiche-prix">{gadget.prix} €</p>
          <p className={gadget.disponible ? 'fiche-stock dispo' : 'fiche-stock'}>
            {gadget.disponible ? '● En stock au QG' : '● En mission, bientôt de retour'}
          </p>
        </div>
      </div>
    </div>
  );
}