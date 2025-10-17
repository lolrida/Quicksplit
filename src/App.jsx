import { useState, useEffect } from 'react'
import { Rotate3d } from 'lucide-react';
import { UserOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import './App.css';
import BasicList from './componentsReact/navlist.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AggiungiSpesa from './pages/AggiungiSpesa.jsx';
import ReportDettagliato from './pages/ReportDettagliato.jsx';
import Impostazioni from './pages/Impostazioni.jsx';
import ImpostaSaldo from './pages/ImpostaSaldo.jsx';
import SignIn from './sign-in/SignIn.jsx';
import SignUp from './sign-up/SignUp.jsx';
import "./componentsReact/avatar.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "./componentsReact/avatar.jsx";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login' o 'register'
  const [user, setUser] = useState(null);
  const [saldo, setSaldo] = useState(2150.00);
  const [spese, setSpese] = useState(1250.00);
  const [risparmi, setRisparmi] = useState(900.00);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Verifica se l'utente è già autenticato
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/me/', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        // assicurati che saldo sia numerico
        setSaldo(parseFloat(data.balance || 0));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setSaldo(parseFloat(userData.balance || 0));
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    setAuthView('login');
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/auth/logout/', {
        method: 'POST',
        credentials: 'include',
      });
      setIsAuthenticated(false);
      setUser(null);
      setCurrentPage('dashboard');
      message.success('Logout effettuato con successo');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Funzione per renderizzare la pagina corrente
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard saldo={saldo} spese={spese} risparmi={risparmi} />;
      case 'aggiungi-spesa':
        return <AggiungiSpesa />;
      case 'report':
        return <ReportDettagliato />;
      case 'imposta-saldo':
        return <ImpostaSaldo initialBalance={user?.balance} onSaved={(updatedUser) => { setUser(updatedUser); setSaldo(parseFloat(updatedUser.balance || 0)); setCurrentPage('dashboard'); }} />;
      case 'impostazioni':
        return <Impostazioni />;
      default:
        return <Dashboard saldo={saldo} spese={spese} risparmi={risparmi} />;
    }
  };

  // Se non è autenticato, mostra login/register
  if (!isAuthenticated) {
    if (authView === 'login') {
      return <SignIn onLogin={handleLogin} onNavigateToSignUp={() => setAuthView('register')} />;
    } else {
      return <SignUp onRegisterSuccess={handleRegisterSuccess} onNavigateToSignIn={() => setAuthView('login')} />;
    }
  }

  // Se è autenticato, mostra l'app principale
  return (
    <>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '20px 40px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Rotate3d className="icons" size={48} color="#2196f3" />
          <h1 style={{ color: 'black', margin: 0 }}>QuickSplit</h1>
        </div>

        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>
              {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : user?.username}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>{user?.email}</div>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('imposta-saldo')}>
            <Avatar style={{ width: '48px', height: '48px' }}>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username}`} />
              <AvatarFallback>{user?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <Button onClick={handleLogout} danger>Logout</Button>
        </div>
      </div>

      {/* Container principale con sidebar e contenuto affiancati */}
      <div style={{ display: 'flex', gap: '20px', padding: '0 20px 20px 20px', paddingRight:'10%' }}>
        {/* Sidebar sinistra */}
        <div style={{ minWidth: '250px', maxWidth: '300px' }}>
          <BasicList onNavigate={setCurrentPage} currentPage={currentPage} />
        </div>

        {/* Contenuto principale a destra */}
        {renderPage()}
      </div>
    </>
  )
}

export default App


