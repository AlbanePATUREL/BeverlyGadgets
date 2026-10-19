import { useState } from 'react';
import PageClient from './pages/client.jsx';
import PageGerant from './pages/admin.jsx';

export default function App() {
  const [page, setPage] = useState('client'); // quelle page afficher

  return (
    <>
      <h1>Beverly Gadgets</h1>
      <button onClick={() => setPage('client')}>Boutique</button>
      <button onClick={() => setPage('gerant')}>QG</button>

      {page === 'client' ? <PageClient /> : <PageGerant />}
    </>
  );
}