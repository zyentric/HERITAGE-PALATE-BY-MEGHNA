import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Container, Button, useTheme, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, FavoriteBorder as WishlistIcon, ShoppingBagOutlined as CartIcon, Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { ColorModeContext } from '../theme/ThemeContext';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ 
      borderBottom: `1px solid ${theme.palette.divider}`,
      backdropFilter: 'blur(12px)',
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(18, 18, 18, 0.8)',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="menu" color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: { xs: 1, md: 0 } }}>
            <Typography variant="h6" noWrap component="a" href="/" sx={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 600,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              lineHeight: 1.2
            }}>
              HERITAGE PALATE
            </Typography>
            <Typography variant="caption" sx={{ letterSpacing: '.2rem', color: 'text.secondary', fontSize: '0.65rem' }}>
              BY MEGHNA
            </Typography>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            {[
              { title: 'Shop', path: '/shop' },
              { title: 'Collections', path: '/collections' },
              { title: 'Our Craft', path: '/craft' },
              { title: 'About', path: '/about' }
            ].map((page) => (
              <Button 
                key={page.title} 
                component={NavLink}
                to={page.path}
                sx={{ 
                  color: 'text.primary', 
                  display: 'block', 
                  letterSpacing: '.05em',
                  borderRadius: 0,
                  '&.active': {
                    color: 'primary.main',
                    fontWeight: 600,
                    borderBottom: `2px solid ${theme.palette.primary.main}`
                  },
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: 'primary.main'
                  }
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton color="inherit" aria-label="search" sx={{ display: { xs: 'none', md: 'inline-flex' } }}><SearchIcon /></IconButton>
            <IconButton color="inherit" aria-label="wishlist" sx={{ display: { xs: 'none', md: 'inline-flex' } }}><WishlistIcon /></IconButton>
            <IconButton color="inherit" aria-label="cart" sx={{ display: { xs: 'none', md: 'inline-flex' } }}><CartIcon /></IconButton>
          </Box>

        </Toolbar>
      </Container>
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, bgcolor: 'background.default' },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, letterSpacing: '.1rem' }}>
            HERITAGE PALATE
          </Typography>
        </Box>
        <List sx={{ pt: 2 }}>
          {[
            { title: 'Home', path: '/' },
            { title: 'Shop', path: '/shop' },
            { title: 'Collections', path: '/collections' },
            { title: 'Our Craft', path: '/craft' },
            { title: 'About', path: '/about' }
          ].map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton component={NavLink} to={item.path} onClick={handleDrawerToggle} sx={{ 
                textAlign: 'center', py: 2,
                '&.active': { color: 'primary.main', fontWeight: 600, bgcolor: 'action.selected' }
              }}>
                <ListItemText disableTypography primary={<Typography sx={{ letterSpacing: '.05em' }}>{item.title}</Typography>} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ my: 2 }} />

          <ListItem disablePadding>
            <ListItemButton sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
              <SearchIcon sx={{ mr: 1.5, fontSize: 22 }} />
              <Typography sx={{ letterSpacing: '.05em' }}>Search</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
              <WishlistIcon sx={{ mr: 1.5, fontSize: 22 }} />
              <Typography sx={{ letterSpacing: '.05em' }}>Wishlist</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
              <CartIcon sx={{ mr: 1.5, fontSize: 22 }} />
              <Typography sx={{ letterSpacing: '.05em' }}>Cart</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
