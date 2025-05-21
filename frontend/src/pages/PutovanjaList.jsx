import React, { useEffect, useState } from 'react';
import './PutovanjaList.css';

function PutovanjaList() {
  const [putovanja, setPutovanja] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    datumPocetka: '',
    datumZavrsetka: '',
    svrha: '',
    opis: '',
    katPutovanjaId: '',
    lokacijaId: '',
  });

  useEffect(() => {
    fetch('/putovanja')
      .then((res) => res.json())
      .then((data) => setPutovanja(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      datumPocetka: formData.datumPocetka,
      datumZavrsetka: formData.datumZavrsetka,
      svrha: formData.svrha,
      opis: formData.opis,
      katPutovanja: { katPutovanjaId: Number(formData.katPutovanjaId) },
      lokacija: { lokacijaId: Number(formData.lokacijaId) },
    };

    fetch('/putovanja', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create');
        return res.json();
      })
      .then((newPutovanje) => {
        setPutovanja([...putovanja, newPutovanje]);
        setShowForm(false);
        setFormData({
          datumPocetka: '',
          datumZavrsetka: '',
          svrha: '',
          opis: '',
          katPutovanjaId: '',
          lokacijaId: '',
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Putovanja</h1>
        <button className="button" onClick={() => setShowForm(true)}>
          NOVO
        </button>
      </div>

      <table className={`table ${showForm ? 'disabled' : ''}`}>
        <thead>
          <tr>
            <th className="th">Grad</th>
            <th className="th">Država</th>
            <th className="th">Datum početka</th>
            <th className="th">Datum završetka</th>
          </tr>
        </thead>
        <tbody>
          {putovanja.length === 0 ? (
            <tr>
              <td colSpan="4" className="noData">
                Nema podataka
              </td>
            </tr>
          ) : (
            putovanja.map((p) => (
              <tr key={p.id} className="tr">
                <td className="td">{p.lokacija?.grad || '-'}</td>
                <td className="td">{p.lokacija?.drzava || '-'}</td>
                <td className="td">{p.datumPocetka}</td>
                <td className="td">{p.datumZavrsetka}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showForm && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Novo putovanje</h2>
            <form onSubmit={handleSubmit}>
              <div className="formRow">
                <label className="label">Datum početka</label>
                <input
                  type="date"
                  name="datumPocetka"
                  className="input"
                  value={formData.datumPocetka}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formRow">
                <label className="label">Datum završetka</label>
                <input
                  type="date"
                  name="datumZavrsetka"
                  className="input"
                  value={formData.datumZavrsetka}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formRow">
                <label className="label">Svrha</label>
                <input
                  type="text"
                  name="svrha"
                  className="input"
                  value={formData.svrha}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formRow">
                <label className="label">Opis</label>
                <input
                  type="text"
                  name="opis"
                  className="input"
                  value={formData.opis}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formRow">
                <label className="label">Kategorija putovanja ID</label>
                <input
                  type="number"
                  name="katPutovanjaId"
                  className="input"
                  value={formData.katPutovanjaId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formRow">
                <label className="label">Lokacija ID</label>
                <input
                  type="number"
                  name="lokacijaId"
                  className="input"
                  value={formData.lokacijaId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formButtons">
                <button type="submit" className="button">
                  Spremi
                </button>
                <button
                  type="button"
                  className="cancelButton"
                  onClick={() => setShowForm(false)}
                >
                  Odustani
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PutovanjaList;
