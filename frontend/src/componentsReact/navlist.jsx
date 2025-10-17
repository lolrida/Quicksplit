import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { House } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import { ClipboardPlus } from 'lucide-react';
import { Bolt } from 'lucide-react';

export default function BasicList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'white', color: 'black', marginRight: 'auto', marginLeft: '-14%', marginTop: '5%' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <House />
              </ListItemIcon>
              <ListItemText> <a href="../App.jsx" style={{color: 'black'}}>Dashboard</a> </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CirclePlus />
              </ListItemIcon>
              <ListItemText> <a href="./componentsReact/aggiungiSpesa.jsx" style={{color: 'black'}}>Aggiungi spesa</a> </ListItemText>
            </ListItemButton>
          </ListItem>
        
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ClipboardPlus />
              </ListItemIcon>
              <ListItemText> <a href="#detailed-report" style={{color: 'black'}}>Report dettagliato</a> </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Bolt />
              </ListItemIcon>
              <ListItemText> <a href="#settings" style={{color: 'black'}}>Impostazioni</a> </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}