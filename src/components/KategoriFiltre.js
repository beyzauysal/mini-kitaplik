import React from 'react';

export default function KategoriFiltre({ value, onChange, options = [] }) {
  return (
    <select
      className="kategori-filtre"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Tümü</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
