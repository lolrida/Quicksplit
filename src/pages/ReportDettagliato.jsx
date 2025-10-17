import React, { useState } from 'react';

function ReportDettagliato() {
  // Dati di esempio - sostituirai con dati dal backend
  const [spese] = useState([
    { id: 1, descrizione: 'Supermercato', importo: 45.50, data: '2025-10-10', categoria: 'Alimentari' },
    { id: 2, descrizione: 'Benzina', importo: 60.00, data: '2025-10-09', categoria: 'Trasporti' },
    { id: 3, descrizione: 'Cinema', importo: 15.00, data: '2025-10-08', categoria: 'Svago' },
    { id: 4, descrizione: 'Ristorante', importo: 35.00, data: '2025-10-07', categoria: 'Alimentari' },
  ]);

  const totaleSpese = spese.reduce((sum, spesa) => sum + spesa.importo, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'black', fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>
        Report Dettagliato
      </h2>

      {/* Statistiche */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          backgroundColor: '#2196f3',
          borderRadius: '12px',
          padding: '20px',
          minWidth: '200px',
          flex: '1',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: 0 }}>
            Totale Spese
          </h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
            {totaleSpese.toFixed(2)} €
          </p>
        </div>

        <div style={{
          backgroundColor: '#5eb87b',
          borderRadius: '12px',
          padding: '20px',
          minWidth: '200px',
          flex: '1',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: 0 }}>
            Numero Spese
          </h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
            {spese.length}
          </p>
        </div>

        <div style={{
          backgroundColor: '#f4b461',
          borderRadius: '12px',
          padding: '20px',
          minWidth: '200px',
          flex: '1',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: 0 }}>
            Media Spesa
          </h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
            {(totaleSpese / spese.length).toFixed(2)} €
          </p>
        </div>
      </div>

      {/* Tabella spese */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflowX: 'auto'
      }}>
        <h3 style={{ color: '#333', fontSize: '20px', fontWeight: 'bold', marginTop: 0, marginBottom: '20px' }}>
          Elenco Spese
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#666' }}>Data</th>
              <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#666' }}>Descrizione</th>
              <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#666' }}>Categoria</th>
              <th style={{ textAlign: 'right', padding: '12px', fontWeight: '600', color: '#666' }}>Importo</th>
            </tr>
          </thead>
          <tbody>
            {spese.map(spesa => (
              <tr key={spesa.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', color: '#333' }}>{spesa.data}</td>
                <td style={{ padding: '12px', color: '#333' }}>{spesa.descrizione}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '14px'
                  }}>
                    {spesa.categoria}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#333' }}>
                  {spesa.importo.toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportDettagliato;
