import React from 'react';

export default function KitapKarti({ baslik, yazar, kategori, id, favorideMi, onToggleFavori, selectedKategori, onCategoryClick }) {
  const highlight = selectedKategori && selectedKategori === kategori;

  return (
    <div className={`kitap-karti ${highlight ? 'highlight' : ''}`}>
      {highlight && (
        <span className="kategori-yildiz" aria-hidden>
          <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M12 17.3l6.18 3.73-1.64-7.03L21.5 9.5l-7.19-.62L12 2 9.69 8.88 2.5 9.5l5 4.5L5.86 21z" />
          </svg>
        </span>
      )}
      <div className="kitap-icerik">
        <h3 className="kitap-baslik">{baslik}</h3>
        <p className="kitap-yazar">{yazar}</p>
  <p className="kitap-kategori" onClick={() => onCategoryClick && onCategoryClick(kategori)}>{kategori}</p>
      </div>
      <button className="favori-btn" onClick={() => onToggleFavori(id)}>
        {favorideMi ? 'Çıkar' : 'Favori'}
      </button>
    </div>
  );
}
