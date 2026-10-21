
import { useEffect, useState } from 'react';
import { listerGadgets, modifierGadget } from '../api';
import './stock.css';

export default function ListeStock() {
  const [gadgets, setGadgets] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [enCours, setEnCours] = useState(null);

  useEffect(() => {
    async function chargerStock() {
      try {
        const donnees = await listerGadgets();
        setGadgets(donnees);
      } catch (e) {
        setErreur(e.message || 'Impossible de charger le stock.');
      } finally {
        setChargement(false);
      }
    }

    chargerStock();
  }, []);

  function cheminImage(visuel) {
    if (!visuel) return '';
    return `/images/${visuel.split('/').pop()}`;
  }

  async function changerDisponibilite(gadget) {
    setErreur('');
    setEnCours(gadget.id);

    try {
      const resultat = await modifierGadget(gadget.id, {
        disponible: !gadget.disponible,
      });

      setGadgets((liste) =>
        liste.map((g) => g.id === resultat.id ? resultat : g)
      );
    } catch (e) {
      setErreur(e.message || 'La modification a échoué.');
    } finally {
      setEnCours(null);
    }
  }

  if (chargement) return <p>Chargement du stock...</p>;

  return (
    <section className="stock">
      <h1>Gestion du stock</h1>

      {erreur && <p className="stock-erreur">{erreur}</p>}

      {gadgets.length === 0 && !erreur && (
        <p>Aucun gadget dans le stock.</p>
      )}

      <div className="stock-liste">
        {gadgets.map((gadget) => (
          <article className="stock-carte" key={gadget.id}>
            {gadget.visuel && (
              <img
                src={cheminImage(gadget.visuel)}
                alt={gadget.nom}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}

            <h3>{gadget.nom}</h3>
            <p>Prix : {gadget.prix} €</p>

            <p>
              Disponibilité :{' '}
              <strong>
                {gadget.disponible ? 'Disponible' : 'Indisponible'}
              </strong>
            </p>

            <button
              type="button"
              disabled={enCours === gadget.id}
              onClick={() => changerDisponibilite(gadget)}
            >
              {enCours === gadget.id
                ? 'Modification...'
                : gadget.disponible
                  ? 'Rendre indisponible'
                  : 'Rendre disponible'}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
