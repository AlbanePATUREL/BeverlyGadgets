// Tous les appels du front passent par NOTRE API, jamais par Supabase directement
const API = import.meta.env.VITE_API_URL;

export async function listerGadgets() {
  const reponse = await fetch(`${API}/gadgets`);
  return reponse.json();
}


// Demande un gadget à l'API : GET /gadgets/:id
export async function lireGadget(id) {
  const reponse = await fetch(`${API}/gadgets/${id}`);
  const data = await reponse.json();
  if (!reponse.ok) {
    throw new Error(data.erreur); // ex : "Gadget introuvable" (404)
  }
  return data;
}
 // Modifier un gadget via notre API Express
export async function modifierGadget(id, modifications) {
  const reponse = await fetch(`${API}/gadgets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(modifications),
  });

  const data = await reponse.json();

  if (!reponse.ok) {
    throw new Error(data.erreur || 'Erreur lors de la modification');
  }



  return data;
}