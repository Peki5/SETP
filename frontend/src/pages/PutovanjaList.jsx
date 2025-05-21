import React from 'react';

const mockPutovanja = [
  { id: 1, naziv: 'Putovanje u Rim', datum: '2024-05-01' },
  { id: 2, naziv: 'Putovanje u Berlin', datum: '2024-06-15' },
];

export default function PutovanjaList() {
  return (
    <div>
      <h1>Sva Putovanja</h1>
      <ul>
        {mockPutovanja.map((p) => (
          <li key={p.id}>
            {p.naziv} — {p.datum}
          </li>
        ))}
      </ul>
    </div>
  );
}
