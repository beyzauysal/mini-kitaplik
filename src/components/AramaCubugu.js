import React from 'react';

export default function AramaCubugu({ value, onChange }) {
  return (
    <input
      className="arama-cubugu"
      placeholder="Kitap başlığı ara..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
