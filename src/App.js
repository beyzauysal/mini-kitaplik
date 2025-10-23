import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import AramaCubugu from './components/AramaCubugu';
import KategoriFiltre from './components/KategoriFiltre';
import KitapListe from './components/KitapListe';
import FavoriPaneli from './components/FavoriPaneli';

const SAMPLE_KITAPLAR = [
  { id: 'k1', baslik: "React'a Giriş", yazar: 'D. Usta', kategori: 'Web' },
  { id: 'k2', baslik: 'İleri JavaScript', yazar: 'S. Kılıç', kategori: 'Web' },
  { id: 'k3', baslik: 'Veri Yapıları', yazar: 'A. Demir', kategori: 'CS' },
  { id: 'k4', baslik: 'Algoritmalar', yazar: 'E. Kaya', kategori: 'CS' },
  { id: 'k5', baslik: 'UI/UX Temelleri', yazar: 'N. Akın', kategori: 'Tasarım' },
];

const STORAGE_KEYS = {
  ARAMA: 'mini-kitaplik.arama',
  FAVORILER: 'mini-kitaplik.favoriler'
};

export default function App() {
  const [kitaplar] = useState(SAMPLE_KITAPLAR);
  const [aramaMetni, setAramaMetni] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ARAMA) || '';
    } catch (e) {
      return '';
    }
  });
  const [kategori, setKategori] = useState('');
  const [favoriler, setFavoriler] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.FAVORILER);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // persist aramaMetni and favoriler
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ARAMA, aramaMetni);
    } catch (e) {}
  }, [aramaMetni]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORILER, JSON.stringify(favoriler));
    } catch (e) {}
  }, [favoriler]);

  const favorilerSeti = useMemo(() => new Set(favoriler), [favoriler]);

  const kategoriler = useMemo(() => {
    const s = new Set(kitaplar.map((k) => k.kategori));
    return Array.from(s);
  }, [kitaplar]);

  const filtrelenmis = useMemo(() => {
    const q = aramaMetni.trim().toLowerCase();
    return kitaplar.filter((k) => {
      const matchesSearch = q ? k.baslik.toLowerCase().includes(q) : true;
      const matchesKategori = kategori ? k.kategori === kategori : true;
      return matchesSearch && matchesKategori;
    });
  }, [kitaplar, aramaMetni, kategori]);

  function toggleFavori(id) {
    setFavoriler((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const favoriKitaplar = kitaplar.filter((k) => favorilerSeti.has(k.id));

  return (
    <div className="app">
      <header className="app-header">
        <h1>Okul Kulübü Kitaplığı</h1>
      </header>

      <div className="controls">
        <AramaCubugu value={aramaMetni} onChange={setAramaMetni} />
        <KategoriFiltre value={kategori} onChange={setKategori} options={kategoriler} />
      </div>

      <main className="main">
        <section className="liste-alanı">
          <h2>Kitaplar</h2>
          <KitapListe
            kitaplar={filtrelenmis}
            favorilerSeti={favorilerSeti}
            onToggleFavori={toggleFavori}
            selectedKategori={kategori}
            onCategoryClick={setKategori}
          />
        </section>

        <FavoriPaneli favoriKitaplar={favoriKitaplar} />
      </main>
    </div>
  );
}



