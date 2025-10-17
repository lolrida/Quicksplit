import { useState } from 'react'
import { Rotate3d, Rotate3DIcon, TextAlignStart } from 'lucide-react';
import { House } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import { ClipboardPlus } from 'lucide-react';
import { Bolt } from 'lucide-react';
import navlist from './componentsReact/navlist.jsx';

import './App.css';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable.jsx"
import BasicList from './componentsReact/navlist.jsx';

function App() {

  const [saldo, setSaldo] = useState(0);
  const [spese, setSpese] = useState(0);
  const [risparmi, setRisparmi] = useState(0);


  return (
    <>
      <div >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
          <Rotate3d className="icons" size={48} color="#2196f3" />
          <h1 style={{ color: 'black' }} >QuickSplit</h1>
        </div>
      </div>

      {/* Container principale con sidebar e contenuto affiancati */}
      <div style={{ display: 'flex', gap: '20px', padding: '20px', paddingRight:'10%' }}>
        {/* Sidebar sinistra */}
        <div style={{ minWidth: '250px', maxWidth: '300px' }}>
          <BasicList />
        </div>

        {/* Contenuto principale a destra */}
        <div style={{ flex: '1' }}>
          <h2 style={{color:'black', fontSize: '28px', fontWeight: 'bold', marginTop: '10px', marginBottom: '20px' }}>
            Panoramica
          </h2>

          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            flexWrap: 'wrap'
          }}>
            
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
                {saldo} €
              </p>
            </div>

            
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
                {spese} €
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
                {risparmi} €
              </p>
            </div>
          </div>
        </div>
      </div>

      

    </>
  )
}

export default App


