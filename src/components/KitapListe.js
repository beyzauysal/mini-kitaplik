import React from 'react';
import KitapKarti from './KitapKarti';

export default function KitapListe({ kitaplar, favorilerSeti, onToggleFavori, selectedKategori, onCategoryClick }) {
  if (!kitaplar.length) return <p>Gösterilecek kitap yok.</p>;

  return (
    <ul className="kitap-listesi">
      {kitaplar.map((k) => (
        <li key={k.id} className="kitap-listesi-item">
          <KitapKarti
            {...k}
            favorideMi={favorilerSeti.has(k.id)}
            onToggleFavori={onToggleFavori}
            selectedKategori={selectedKategori}
            onCategoryClick={onCategoryClick}
          />
        </li>
      ))}
    </ul>
  );
}
