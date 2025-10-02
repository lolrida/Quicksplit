# QuickSplit API Test

## Test delle API con curl

### 1. Test server
```bash
curl http://localhost:5000/
curl http://localhost:5000/api/health
```

### 2. Users API

#### Crea un utente
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mario Rossi",
    "email": "mario@example.com",
    "password_hash": "password123"
  }'
```

#### Ottieni tutti gli utenti
```bash
curl http://localhost:5000/api/users
```

#### Ottieni un utente specifico
```bash
curl http://localhost:5000/api/users/[USER_ID]
```

### 3. Groups API

#### Crea un gruppo
```bash
curl -X POST http://localhost:5000/api/groups \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Viaggio a Roma",
    "created_by": "[USER_ID]"
  }'
```

#### Ottieni tutti i gruppi
```bash
curl http://localhost:5000/api/groups
```

#### Ottieni gruppi di un utente
```bash
curl http://localhost:5000/api/groups/user/[USER_ID]
```

### 4. Expenses API

#### Crea una spesa
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "group_id": "[GROUP_ID]",
    "user_id": "[USER_ID]",
    "amount": 50.00,
    "description": "Cena al ristorante"
  }'
```

#### Ottieni tutte le spese
```bash
curl http://localhost:5000/api/expenses
```

#### Ottieni spese di un gruppo
```bash
curl http://localhost:5000/api/expenses/group/[GROUP_ID]
```

#### Ottieni spese di un utente
```bash
curl http://localhost:5000/api/expenses/user/[USER_ID]
```

#### Statistiche spese per gruppo
```bash
curl http://localhost:5000/api/expenses/stats/group/[GROUP_ID]
```

## Comandi per avviare il progetto

### Avvia solo il backend
```bash
npm run server
```

### Avvia frontend e backend insieme
```bash
npm run dev:full
```

### MongoDB locale
Assicurati che MongoDB sia in esecuzione:
```bash
# Ubuntu/Debian
sudo systemctl start mongod

# macOS con Homebrew
brew services start mongodb-community

# Windows
# Avvia MongoDB Compass o il servizio MongoDB
```
