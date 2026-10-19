import { useEffect, useState } from 'react';
import { listerGadgets } from '../api.js';
import Carte from '../Items/Carte.jsx';

export default function PageClient() {
  const [gadgets, setGadgets] = useState([]);

  // Au chargement de la page, on demande la liste à l'API
  useEffect(() => {
    listerGadgets().then(setGadgets);
  }, []);

    return (
    <div className="cartes">
      {gadgets.map((g) => (
        <Carte key={g.id} gadget={g} />
      ))}
    </div>
  );
}