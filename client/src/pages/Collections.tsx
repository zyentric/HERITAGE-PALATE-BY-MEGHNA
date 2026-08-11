import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

const Collections: React.FC = () => {
  // Group products by category to show collections
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>Our Collections</Typography>
      <Grid container spacing={4}>
        {categories.map((category) => {
          const categoryProducts = products.filter(p => p.category === category);
          const featuredImage = categoryProducts[0]?.image || '/assets/chikankari_suit.png';
          
          return (
            <Grid size={{ xs: 12, md: 6 }} key={category}>
              <Box component={Link} to="/shop" sx={{ textDecoration: 'none', color: 'inherit', display: 'block', group: 'true' }}>
                <Box sx={{ position: 'relative', height: { xs: '300px', md: '400px' }, overflow: 'hidden', mb: 2, borderRadius: 1 }}>
                  <Box component="img" 
                    src={featuredImage} 
                    alt={category}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', transition: 'transform 0.5s', '&:hover': { transform: 'scale(1.05)' } }}
                  />
                  <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h3" sx={{ color: '#fff', letterSpacing: '0.1em' }}>{category}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Collections;
