import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', pt: 8, pb: 4, mt: 'auto' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          
          {/* Brand Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontFamily: 'Playfair Display, serif', letterSpacing: '.1rem', mb: 0 }}>
              HERITAGE PALATE
            </Typography>
            <Typography variant="caption" sx={{ letterSpacing: '.2rem', color: 'secondary.main', display: 'block', mb: 2 }}>
              BY MEGHNA
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 300 }}>
              Timeless Indian craftsmanship, reimagined for today.
            </Typography>
          </Grid>

          {/* Explore Links */}
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', letterSpacing: '.1em', mb: 2 }}>
              Explore
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                { name: 'Shop', path: '/shop' },
                { name: 'Collections', path: '/collections' },
                { name: 'Our Craft', path: '/craft' },
                { name: 'About', path: '/about' }
              ].map((link) => (
                <Link component={RouterLink} to={link.path} key={link.name} color="text.secondary" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Customer Care Links */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', letterSpacing: '.1em', mb: 2 }}>
              Customer Care
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Shipping', 'Returns', 'Size Guide', 'FAQs'].map((text) => (
                <Link href="#" key={text} color="text.secondary" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Connect Links */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', letterSpacing: '.1em', mb: 2 }}>
              Connect
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" underline="hover" sx={{ fontSize: '0.9rem' }}>Instagram</Link>
              <Link href="#" color="text.secondary" underline="hover" sx={{ fontSize: '0.9rem' }}>WhatsApp</Link>
            </Box>
          </Grid>

        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Privacy Policy', 'Terms', 'Refund Policy'].map((text) => (
              <Link href="#" key={text} color="text.secondary" underline="hover" sx={{ fontSize: '0.8rem' }}>
                {text}
              </Link>
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Heritage Palate by Meghna
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
