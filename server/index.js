require('dotenv').config(); // lit le fichier .env
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());         // autorise le front React à appeler l'API
app.use(express.json()); // permet de lire le JSON envoyé par le front

// Connexion à Supabase avec la clé secrète (elle reste côté serveur)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

// GET /gadgets : renvoie la liste des gadgets
app.get('/gadgets', async (req, res) => {
  const { data, error } = await supabase.from('gadgets').select('*').order('id');
  if (error) return res.status(500).json({ erreur: error.message });
  res.status(200).json(data);
});


app.get('/gadgets/:id', async (req, res) => {
  const id = req.params.id; 

  if (isNaN(id)) {
    return res.status(404).json({ erreur: 'Gadget introuvable' });
  }

  const { data, error } = await supabase
    .from('gadgets')
    .select('*')
    .eq('id', id)   
    .maybeSingle(); 

  if (error) return res.status(500).json({ erreur: error.message });
  if (!data) return res.status(404).json({ erreur: 'Gadget introuvable' });

  res.status(200).json(data);
});

// POST /gadgets : ajoute un gadget
app.post('/gadgets', async (req, res) => {
  const { nom, prix, description, visuel, disponible } = req.body;

  // Validation : on refuse les données incorrectes avec un code 400
  if (!nom || nom.trim() === '') {
    return res.status(400).json({ erreur: 'Le nom est obligatoire' });
  }
  if (prix === undefined || prix === '' || isNaN(prix)) {
    return res.status(400).json({ erreur: 'Le prix est obligatoire' });
  }
  if (Number(prix) < 0) {
    return res.status(400).json({ erreur: 'Le prix ne peut pas être négatif' });
  }

  const { data, error } = await supabase
    .from('gadgets')
    .insert({ nom: nom.trim(), prix: Number(prix), description, visuel, disponible })
    .select()   // pour récupérer le gadget créé (avec son id)
    .single();

  if (error) return res.status(500).json({ erreur: error.message });
  res.status(201).json(data); // 201 = créé
});

 // PUT /gadgets/:id : modifier un gadget
app.put('/gadgets/:id', async (req, res) => {
  const id = req.params.id;
  const { nom, prix, description, visuel, disponible } = req.body;

  // 1. Vérifier que l'identifiant est valide
  if (!/^\d+$/.test(id) || Number(id) <= 0) {
    return res.status(404).json({ erreur: 'Gadget introuvable' });
  }

  // 2. Vérifier les données envoyées
  if (nom !== undefined && (typeof nom !== 'string' || nom.trim() === '')) {
    return res.status(400).json({ erreur: 'Le nom ne peut pas être vide' });
  }

  if (prix !== undefined && (prix === '' || !Number.isFinite(Number(prix)))) {
    return res.status(400).json({ erreur: 'Le prix doit être un nombre valide' });
  }

  if (prix !== undefined && Number(prix) < 0) {
    return res.status(400).json({ erreur: 'Le prix ne peut pas être négatif' });
  }

  if (disponible !== undefined && typeof disponible !== 'boolean') {
    return res.status(400).json({ erreur: 'La disponibilité doit être vraie ou fausse' });
  }

  // 3. Préparer uniquement les champs à modifier
  const modifications = {};

  if (nom !== undefined) modifications.nom = nom.trim();
  if (prix !== undefined) modifications.prix = Number(prix);
  if (description !== undefined) modifications.description = description;
  if (visuel !== undefined) modifications.visuel = visuel;
  if (disponible !== undefined) modifications.disponible = disponible;

  if (Object.keys(modifications).length === 0) {
    return res.status(400).json({ erreur: 'Aucune modification fournie' });
  }

  // 4. Modifier le gadget dans Supabase
  const { data, error } = await supabase
    .from('gadgets')
    .update(modifications)
    .eq('id', Number(id))
    .select()
    .maybeSingle();

  if (error) {
    return res.status(500).json({ erreur: error.message });
  }

  // 5. Vérifier que le gadget existe
  if (!data) {
    return res.status(404).json({ erreur: 'Gadget introuvable' });
  }

  // 6. Renvoyer le gadget modifié
  res.status(200).json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API lancée sur http://localhost:${PORT}`));