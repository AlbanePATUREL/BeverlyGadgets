// Tous les appels du front passent par NOTRE API, jamais par Supabase directement
const API = import.meta.env.VITE_API_URL;

export async function listerGadgets() {
  const reponse = await fetch(`${API}/gadgets`);
  return reponse.json();
}