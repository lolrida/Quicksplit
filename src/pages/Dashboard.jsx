import React from 'react';

function Dashboard({ saldo, spese, risparmi }) {
  return (
    <div style={{ flex: '1' }}>
      <h2 style={{color:'black', fontSize: '28px', fontWeight: 'bold', marginTop: '10px', marginBottom: '20px' }}>
        Panoramica
      </h2>

      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        flexWrap: 'wrap'
      }}>
        {/* Saldo Card */}
        <div style={{
          backgroundColor: '#5eb87b',
          borderRadius: '12px',
          padding: '30px',
          minWidth: '250px',
          flex: '1',
          maxWidth: '350px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            color: 'white', 
            fontSize: '18px', 
            fontWeight: '600',
            marginBottom: '15px',
            marginTop: '0'
          }}>
            Saldo
          </h3>
          <p style={{ 
            color: 'white', 
            fontSize: '36px', 
            fontWeight: 'bold',
            margin: '0'
          }}>
            {saldo.toFixed(2)} €
          </p>
        </div>

        {/* Spese Card */}
        <div style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
          padding: '30px',
          minWidth: '250px',
          flex: '1',
          maxWidth: '350px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            color: '#333', 
            fontSize: '18px', 
            fontWeight: '600',
            marginBottom: '15px',
            marginTop: '0'
          }}>
            Spese
          </h3>
          <p style={{ 
            color: '#333', 
            fontSize: '36px', 
            fontWeight: 'bold',
            margin: '0'
          }}>
            {spese.toFixed(2)} €
          </p>
        </div>

        {/* Risparmi Card */}
        <div style={{
          backgroundColor: '#f4b461',
          borderRadius: '12px',
          padding: '30px',
          minWidth: '250px',
          flex: '1',
          maxWidth: '350px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            color: 'white', 
            fontSize: '18px', 
            fontWeight: '600',
            marginBottom: '15px',
            marginTop: '0'
          }}>
            Risparmi
          </h3>
          <p style={{ 
            color: 'white', 
            fontSize: '36px', 
            fontWeight: 'bold',
            margin: '0'
          }}>
            {risparmi.toFixed(2)} €
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
