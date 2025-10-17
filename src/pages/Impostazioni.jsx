import React, { useState } from 'react';

function Impostazioni() {
  const [settings, setSettings] = useState({
    nome: 'Admin',
    email: 'admin@quicksplit.com',
    notifiche: true,
    tema: 'chiaro',
    lingua: 'italiano'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Impostazioni salvate:', settings);
    alert('Impostazioni salvate con successo!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'black', fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>
        Impostazioni
      </h2>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '700px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <form onSubmit={handleSubmit}>
          {/* Profilo Utente */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              color: '#333', 
              fontSize: '20px', 
              fontWeight: 'bold', 
              marginTop: 0,
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '2px solid #f0f0f0'
            }}>
              Profilo Utente
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#333'
              }}>
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={settings.nome}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#333'
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Preferenze */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              color: '#333', 
              fontSize: '20px', 
              fontWeight: 'bold', 
              marginTop: 0,
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '2px solid #f0f0f0'
            }}>
              Preferenze
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#333'
              }}>
                Tema
              </label>
              <select
                name="tema"
                value={settings.tema}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: 'white'
                }}
              >
                <option value="chiaro">Chiaro</option>
                <option value="scuro">Scuro</option>
                <option value="automatico">Automatico</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#333'
              }}>
                Lingua
              </label>
              <select
                name="lingua"
                value={settings.lingua}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: 'white'
                }}
              >
                <option value="italiano">Italiano</option>
                <option value="inglese">Inglese</option>
                <option value="spagnolo">Spagnolo</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  name="notifiche"
                  checked={settings.notifiche}
                  onChange={handleChange}
                  style={{
                    marginRight: '10px',
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ fontWeight: '600', color: '#333' }}>
                  Abilita notifiche
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1976d2'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2196f3'}
          >
            Salva Impostazioni
          </button>
        </form>
      </div>
    </div>
  );
}

export default Impostazioni;
