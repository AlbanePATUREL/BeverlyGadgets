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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API lancée sur http://localhost:${PORT}`));