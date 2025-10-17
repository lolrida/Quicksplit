# QuickSplit - Sistema di Autenticazione

## 🎯 Panoramica
L'applicazione QuickSplit include un sistema completo di autenticazione con template Material-UI professionali per login e registrazione.

## 🎨 Template UI
Utilizza i template Material-UI (MUI) preinstallati nelle cartelle:
- `/src/sign-in/` - Template di login con design moderno
- `/src/sign-up/` - Template di registrazione con validazione completa

## 🚀 Come Avviare l'Applicazione

### 1. Backend Django (Porta 8000)
```bash
cd backend
source venv/bin/activate  # Su Windows: venv\Scripts\activate
python manage.py runserver
```

### 2. Frontend React (Porta 5173/5174)
```bash
# Dalla root del progetto QuickSplit
npm run dev
```

## 👤 Account di Test
Puoi utilizzare questo account per testare subito l'applicazione:

- **Email**: `test@quicksplit.com`
- **Password**: `test1234`
- **Username**: testuser
- **Nome**: Test User

**Nota**: Il sistema usa la parte prima della @ dell'email come username automaticamente.

## 📝 Creare un Nuovo Account

1. All'avvio dell'app, vedrai la schermata di login Material-UI
2. Clicca su "Sign up" in fondo alla card
3. Compila il form con:
   - **Full name** (Nome completo - es: "Mario Rossi")
   - **Email** (univoca - diventerà username: mario.rossi se email è mario.rossi@esempio.it)
   - **Password** (minimo 6 caratteri)
4. Dopo la registrazione, verrai reindirizzato al login
5. Inserisci email e password per accedere

## 🔐 Funzionalità di Autenticazione

### Login (SignIn.jsx)
- Design Material-UI professionale
- Validazione email e password
- Sessione persistente con cookie Django
- Messaggio di errore chiaro per credenziali non valide
- Info account di test visibile nella UI
- Toggle dark/light mode in alto a destra

### Registrazione (SignUp.jsx)
- Template Material-UI completo
- Validazione form in tempo reale
- Controllo duplicati (username/email) lato server
- Password minimo 6 caratteri
- Divisione automatica nome/cognome
- Generazione username automatica da email

### Logout
- Pulsante logout nell'header (in alto a destra)
- Pulizia della sessione Django
- Redirect automatico alla pagina di login

## 🔌 API Endpoints

### Autenticazione
- `POST /api/auth/register/` - Registrazione nuovo utente
  ```json
  {
    "username": "mario.rossi",
    "email": "mario.rossi@esempio.it",
    "password": "password123",
    "first_name": "Mario",
    "last_name": "Rossi"
  }
  ```

- `POST /api/auth/login/` - Login
  ```json
  {
    "username": "mario.rossi",
    "password": "password123"
  }
  ```

- `POST /api/auth/logout/` - Logout (richiede autenticazione)
- `GET /api/auth/me/` - Ottieni utente corrente (richiede autenticazione)

### Risorse Protette (richiedono autenticazione)
- `GET/POST /api/users/` - Gestione utenti
- `GET/POST /api/groups/` - Gestione gruppi
- `GET/POST /api/expenses/` - Gestione spese
- `GET/POST /api/settlements/` - Gestione pagamenti

## 🛠️ Configurazione Tecnica

### Backend (Django)
- **Framework**: Django 5.2.7 + Django REST Framework
- **Database**: SQLite (db.sqlite3)
- **Autenticazione**: Session Authentication con cookie
- **CORS**: Configurato per localhost:5173 e localhost:5174

### Frontend (React)
- **Framework**: React + Vite
- **UI Library**: Ant Design
- **Gestione Stato**: React useState/useEffect
- **API Calls**: Fetch API con credentials: 'include'

## 📊 Flusso di Autenticazione

1. **Primo Accesso**:
   - L'app verifica se esiste una sessione attiva (`/api/auth/me/`)
   - Se non autenticato → mostra schermata Login
   - Se autenticato → mostra Dashboard

2. **Login**:
   - Invio credenziali a `/api/auth/login/`
   - Django crea una sessione
   - Cookie di sessione salvato nel browser
   - Redirect alla Dashboard

3. **Navigazione**:
   - Tutte le chiamate API includono il cookie di sessione
   - Backend verifica autenticazione su ogni richiesta
   - Se sessione scaduta → redirect a Login

4. **Logout**:
   - Chiamata a `/api/auth/logout/`
   - Django distrugge la sessione
   - Frontend pulisce lo stato
   - Redirect a Login

## 🎨 Pagine dell'Applicazione

### Pagine Pubbliche
- **Login** (`/src/pages/Login.jsx`)
- **Registrazione** (`/src/pages/Register.jsx`)

### Pagine Protette (richiedono autenticazione)
- **Dashboard** - Panoramica saldo, spese, risparmi
- **Aggiungi Spesa** - Form per inserire nuove spese
- **Report Dettagliato** - Statistiche e tabella spese
- **Impostazioni** - Configurazione account e preferenze

## 🔍 Troubleshooting

### Il backend non si avvia
```bash
cd backend
python manage.py migrate  # Applica le migrazioni
python manage.py createsuperuser  # Crea admin (opzionale)
```

### Errore CORS
Verifica che in `backend/quicksplit_api/settings.py` ci sia:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
]
CORS_ALLOW_CREDENTIALS = True
```

### Login non funziona
1. Verifica che Django sia in esecuzione (http://localhost:8000)
2. Controlla la console del browser per errori
3. Verifica che le credenziali siano corrette
4. Prova con l'account di test: testuser / test1234

## 📱 Prossimi Step

- [ ] Recupero password
- [ ] Conferma email
- [ ] OAuth (Google/Facebook)
- [ ] 2FA (Two-Factor Authentication)
- [ ] Gestione sessioni multiple
- [ ] Token JWT (per mobile app)

## 💡 Note per lo Sviluppo

- Le password sono hashate con l'algoritmo di Django (PBKDF2)
- Le sessioni hanno una durata di 2 settimane (configurabile)
- CSRF protection è abilitato per tutte le richieste POST
- In produzione, cambiare SECRET_KEY e DEBUG=False
