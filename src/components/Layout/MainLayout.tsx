// 'use client'

// import { useState } from "react";
// import { 
//   Box, 
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Divider,
//   Toolbar,
//   Typography
// } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
// import ArticleIcon from '@mui/icons-material/Article';
// import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import SettingsIcon from '@mui/icons-material/Settings';

// export default function MainLayout({ children }: { children: React.ReactNode }) {
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const toggleDrawer = (open: boolean) => () => {
//     setDrawerOpen(open);
//   };

//   const drawerItems = [
//     { text: 'Inicio', icon: <HomeIcon />, path: '/' },
//     { text: 'Noticias', icon: <ArticleIcon />, path: '/news' },
//     { text: 'Juegos', icon: <SportsEsportsIcon />, path: '/games' },
//     { text: 'Configuración', icon: <SettingsIcon />, path: '/settings' },
//   ];

//   return (
//     <Box sx={{ display: 'flex' }}>
//       {/* AppBar */}
//       <Toolbar sx={{ position: 'fixed', top: 0, zIndex: 1200 }}>
//         <IconButton
//           edge="start"
//           color="inherit"
//           aria-label="menu"
//           onClick={toggleDrawer(true)}
//           sx={{ mr: 2 }}
//         >
//           <MenuIcon />
//         </IconButton>
//       </Toolbar>

//       {/* Drawer */}
//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={toggleDrawer(false)}
//       >
//         <Box
//           sx={{ width: 250 }}
//           role="presentation"
//           onClick={toggleDrawer(false)}
//           onKeyDown={toggleDrawer(false)}
//         >
//           <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
//             Menú
//           </Typography>
//           <Divider />
//           <List>
//             {drawerItems.map((item) => (
//               <ListItem key={item.text} disablePadding>
//                 <ListItemButton component="a" href={item.path}>
//                   <ListItemIcon>
//                     {item.icon}
//                   </ListItemIcon>
//                   <ListItemText primary={item.text} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       {/* Contenido principal */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
//         {children}
//       </Box>
//     </Box>
//   );
// }


'use client'

import { useState } from "react";
import { 
  Box, 
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SettingsIcon from '@mui/icons-material/Settings';
import TheatersIcon from '@mui/icons-material/Theaters'; // Icono para Media

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Noticias', icon: <ArticleIcon />, path: '/news' },
    { text: 'Juegos', icon: <SportsEsportsIcon />, path: '/games' },
    { text: 'Media', icon: <TheatersIcon />, path: '/media' }, // Solo el ícono de Media
    { text: 'Configuración', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <Toolbar sx={{ position: 'fixed', top: 0, zIndex: 1200 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer principal */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
            Menú
          </Typography>
          <Divider />
          <List>
            {drawerItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component="a" href={item.path}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}