import { useEffect, useState } from 'react';
import { listerGadgets, modifierGadget, ajouterGadget, supprimerGadget } from '../api';
import './stock.css';
import { formatPrix } from '../format.js';

const FORM_VIDE = { nom: '', prix: '', description: '', visuel: '', disponible: true };

export default function ListeStock() {
  const [gadgets, setGadgets] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [enCours, setEnCours] = useState(null);
  const [form, setForm] = useState(FORM_VIDE);

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

  // Un seul handler pour tous les champs : "name" indique quel champ modifier
  function changer(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  async function ajouter(e) {
    e.preventDefault(); // sinon le formulaire recharge la page
    setErreur('');
    try {
      const nouveau = await ajouterGadget(form);
      setGadgets((liste) => [...liste, nouveau]);
      setForm(FORM_VIDE);
    } catch (e) {
      setErreur(e.message); // ex : "Le nom est obligatoire" (400 du serveur)
    }
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

  async function supprimer(gadget) {
    if (!window.confirm(`Supprimer « ${gadget.nom} » ?`)) return;
    setErreur('');
    setEnCours(gadget.id);

    try {
      await supprimerGadget(gadget.id);
      setGadgets((liste) => liste.filter((g) => g.id !== gadget.id));
    } catch (e) {
      setErreur(e.message || 'La suppression a échoué.');
    } finally {
      setEnCours(null);
    }
  }

  if (chargement) return <p>Chargement du stock...</p>;

  return (
    <section className="stock">
      <h1>Gestion du stock</h1>

      {erreur && <p className="stock-erreur">{erreur}</p>}

      <form className="stock-form" onSubmit={ajouter}>
        <h2>Ajouter un gadget</h2>
        <label>Nom
          <input name="nom" value={form.nom} onChange={changer} />
        </label>
        <label>Prix (€)
          <input name="prix" type="number" step="0.01" value={form.prix} onChange={changer} />
        </label>
        <label>Description
          <textarea name="description" rows="3" value={form.description} onChange={changer} />
        </label>
        <label>Image (lien)
          <input name="visuel" value={form.visuel} onChange={changer} />
        </label>
        <label className="stock-case">
          <input name="disponible" type="checkbox" checked={form.disponible} onChange={changer} />
          Disponible
        </label>
        <button type="submit">Ajouter</button>
      </form>

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
            <p>Prix : {formatPrix(gadget.prix)}</p>

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

            <button
              type="button"
              className="stock-supprimer"
              disabled={enCours === gadget.id}
              onClick={() => supprimer(gadget)}
            >
              Supprimer
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}