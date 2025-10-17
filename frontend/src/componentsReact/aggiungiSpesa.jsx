import { useState } from 'react';

export default function AggiungiSpesa() {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState(0);

    const handleAddExpense = (e) => {
    e.preventDefault();
    setSpese(spese + Number(amount));
    setSaldo(saldo - Number(amount));
    setDesc('');
    setAmount(0);
  };

  return (
    <form onSubmit={handleAddExpense}>
    <input
        type="text"
        placeholder="Descrizione"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
    />
    <input
        type="number"
        placeholder="Importo"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        />
    <button type="submit">Aggiungi</button>
    </form>

  );
}
