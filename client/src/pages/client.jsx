import { useEffect, useState } from 'react';
import { listerGadgets } from '../api.js';

export default function PageClient() {
  const [gadgets, setGadgets] = useState([]);

  // Au chargement de la page, on demande la liste à l'API
  useEffect(() => {
    listerGadgets().then(setGadgets);
  }, []);

  return (
    <ul>
      {gadgets.map((g) => (
        <li key={g.id}>{g.nom} — {g.prix} €</li>
      ))}
    </ul>
  );
}