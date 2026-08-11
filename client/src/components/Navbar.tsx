import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Container, Button, useTheme } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, FavoriteBorder as WishlistIcon, ShoppingBagOutlined as CartIcon, Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { ColorModeContext } from '../theme/ThemeContext';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

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
            <IconButton size="large" aria-label="menu" color="inherit">
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
            <IconButton color="inherit" aria-label="search"><SearchIcon /></IconButton>
            <IconButton color="inherit" aria-label="wishlist"><WishlistIcon /></IconButton>
            <IconButton color="inherit" aria-label="cart"><CartIcon /></IconButton>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
