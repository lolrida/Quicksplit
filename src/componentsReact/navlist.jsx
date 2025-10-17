import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { House, CirclePlus, ClipboardPlus, Settings } from 'lucide-react';

export default function BasicList({ onNavigate, currentPage }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: House },
    { id: 'aggiungi-spesa', label: 'Aggiungi spesa', icon: CirclePlus },
    { id: 'report', label: 'Report dettagliato', icon: ClipboardPlus },
    { id: 'impostazioni', label: 'Impostazioni', icon: Settings },
  ];

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: 360, 
      bgcolor: 'white', 
      color: 'black', 
      marginRight: 'auto', 
      marginLeft: '-14%', 
      marginTop: '5%',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <nav aria-label="main navigation">
        <List>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton 
                  onClick={() => onNavigate(item.id)}
                  sx={{
                    backgroundColor: isActive ? '#e3f2fd' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive ? '#bbdefb' : '#f5f5f5',
                    },
                  }}
                >
                  <ListItemIcon>
                    <Icon color={isActive ? '#2196f3' : '#666'} size={24} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    sx={{ 
                      color: isActive ? '#2196f3' : 'black',
                      fontWeight: isActive ? 'bold' : 'normal'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
}