import React from 'react';

export default function FavoriPaneli({ favoriKitaplar }) {
  return (
    <aside className="favori-paneli">
      <h4>Favoriler ({favoriKitaplar.length})</h4>
      <ul>
        {favoriKitaplar.map((k) => (
          <li key={k.id}>{k.baslik} — {k.yazar}</li>
        ))}
      </ul>
    </aside>
  );
}
