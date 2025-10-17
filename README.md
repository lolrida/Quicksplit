# QuickSplit - Laboratorio API (Django REST Framework)

## Descrizione del progetto
QuickSplit è una piccola applicazione per la gestione condivisa delle spese: consente la registrazione di utenti, la creazione di gruppi, l'inserimento di spese e la gestione dei saldi degli utenti.

Il backend è realizzato con Django + Django REST Framework e usa SQLite per sviluppo.

## Come usare questo repository 

Prerequisiti:
- Python 3.11+ (il progetto è stato testato con Python 3.13 in venv)
- Node.js + npm (per la SPA con Vite)

Passaggi per avviare il backend:

1. Entrare nella cartella backend:

```bash
cd backend
```

2. Creare e attivare un virtualenv (esempio con venv):

```bash
python -m venv venv
source venv/bin/activate
```

3. Installare dipendenze:

```bash
pip install -r requirements.txt
```

4. Applicare migrazioni :

```bash
python manage.py migrate
```

5. Avviare il server di sviluppo:

```bash
python manage.py runserver
```

Passaggi per avviare il frontend (SPA con Vite):

1. Nella root del progetto (o nella cartella dove c'è package.json), installare dipendenze:

```bash
npm install
```

2. Avviare il dev server:

```bash
npm run dev
```

3. Aprire il browser su http://localhost:5173 (o porta indicata da Vite).

Credenziali di prova (nel DB di esempio sono presenti alcuni utenti di test):
- admin@quicksplit.com / la password dell'admin (se esiste, usare create_superuser)
- test@quicksplit.com / test1234

API principali (esempi curl)

- Registrazione (POST):
  - POST /api/auth/register/  {"username":"rida","email":"rida@gmail.com","password":"test123"}

- Login (POST):
  - POST /api/auth/login/ {"email":"rida@gmail.com","password":"test123"}  (usa session cookie)

- CSRF token (GET):
  - GET /api/auth/csrf/  (imposta cookie csrftoken)

- Utente corrente (GET):
  - GET /api/auth/me/

- Update balance (POST):
  - POST /api/auth/update-balance/ {"balance":"123.45"}  (autenticato)

Esempio rapido per login+update-balance (usare cookie jar):

```bash
curl -c cookies.txt -X GET http://localhost:8000/api/auth/csrf/
curl -b cookies.txt -c cookies.txt -X POST http://localhost:8000/api/auth/login/ -H "Content-Type: application/json" -H "X-CSRFToken: $(cat cookies.txt | grep csrftoken | awk '{print $7}')" -d '{"email":"rida@gmail.com","password":"test123"}'
curl -b cookies.txt -X POST http://localhost:8000/api/auth/update-balance/ -H "Content-Type: application/json" -H "X-CSRFToken: $(cat cookies.txt | grep csrftoken | awk '{print $7}')" -d '{"balance":"100.00"}'
curl -b cookies.txt -X GET http://localhost:8000/api/auth/me/
```

Funzionalità future suggerite
- Migrazione a database relazionale in produzione (Postgres)
- Aggiunta di token-based auth (JWT) per API REST senza cookie
- Endpoint per storicizzare modifiche al saldo (audit)




***

## DB schema
Vedi `DB_SCHEMA.md` per lo schema e le relazioni principali.
