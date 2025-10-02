import { useState } from 'react'
import { Rotate3d, Rotate3DIcon, TextAlignStart } from 'lucide-react';
import { House } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import { ClipboardPlus } from 'lucide-react';
import { Bolt } from 'lucide-react';

import './App.css';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable"

function App() {




  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
          <Rotate3d size={48} color="#2196f3" />
          <h1 style={{ color: 'black' }} >QuickSplit</h1>
        </div>

        <div style={{border:'1px solid black', paddingLeft:'30px', marginRight:'30%'}}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
            <House size={32} color="#000000ff" />
            <span
              className="span"
              style={{ color: 'black', fontWeight: 'bold', fontSize: '18px', marginLeft: '2px' }}
            >
              Dashboard
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
            <CirclePlus size={32} color="#2196f3" />
            <span
              className="span"
              style={{ color: 'black', fontWeight: 'bold', fontSize: '18px', marginLeft: '2px' }}
            >
              Aggiungi spesa
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
            <ClipboardPlus size={32} color="#2196f3" />
            <span
              className="span"
              style={{ color: 'black', fontWeight: 'bold', fontSize: '18px', marginLeft: '2px' }}
            >
              Report dettagliato
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
            <Bolt size={32} color="#2196f3" />
            <span
              className="span"
              style={{ color: 'black', fontWeight: 'bold', fontSize: '18px', marginLeft: '2px' }}
            >
              Impostazioni
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
