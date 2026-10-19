import { useEffect, useState } from 'react';
import { listerGadgets } from '../api.js';
import Carte from '../Items/Carte.jsx';

export default function PageClient() {
  const [gadgets, setGadgets] = useState([]);
  const [recherche, setRecherche] = useState('');

  // Au chargement de la page, on demande la liste à l'API
  useEffect(() => {
  listerGadgets().then(setGadgets);
  }, []);

const gadgetsFiltres = gadgets.filter((g) =>
g.nom.toLowerCase().includes(recherche.toLowerCase())
  );

      return (
    <div>
      <input
        placeholder="Rechercher un gadget..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />

      <div className="cartes">
        {gadgetsFiltres.map((g) => (
          <Carte key={g.id} gadget={g} />
        ))}
      </div>
    </div>
  );
}