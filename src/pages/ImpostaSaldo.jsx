import React, { useState } from 'react';
import { InputNumber, Button, message } from 'antd';

export default function ImpostaSaldo({ onSaved, initialBalance = null }) {
  const [value, setValue] = useState(initialBalance !== null ? parseFloat(initialBalance) : null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (value === null) {
      message.error('Inserisci un valore valido');
      return;
    }
    setLoading(true);
    try {
      // assicurati di avere il cookie CSRF (server imposta csrftoken)
      await fetch('http://localhost:8000/api/auth/csrf/', { method: 'GET', credentials: 'include' });

      const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
        return null;
      };

      const csrftoken = getCookie('csrftoken');

      const res = await fetch('http://localhost:8000/api/auth/update-balance/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrftoken ? { 'X-CSRFToken': csrftoken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({ balance: value }),
      });
      const data = await res.json();
      if (res.ok) {
        message.success('Saldo aggiornato');
        if (onSaved) onSaved(data.user);
      } else {
        message.error(data.error || 'Errore aggiornamento saldo');
      }
    } catch (err) {
      console.error(err);
      message.error('Errore di connessione');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div style={{ paddingLeft: '25%'}}>
      <h2>Imposta il tuo saldo</h2>
      <div style={{ maxWidth: 1000 }}>
        <h1 style={{color: 'black'}}>Imposta Saldo</h1>
        <InputNumber
          autoFocus
          style={{ width: '100%', marginTop: '10%' }}
          min={0}
          step={0.01}
          value={value}
          formatter={v => `€ ${v}`}
          parser={v => v.replace(/€\s?|(,)/g, '')}
          onChange={setValue}
        />
        <div style={{ marginTop: 12 }}>
          <Button type="primary" onClick={handleSave} loading={loading} disabled={value === null || (initialBalance !== null && parseFloat(initialBalance) === parseFloat(value))}>
            Salva
          </Button>
        </div>
      </div>
    </div>
  );
}
