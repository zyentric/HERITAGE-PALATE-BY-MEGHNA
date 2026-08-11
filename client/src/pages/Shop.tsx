import React from 'react';
import { Box, Container, Typography, Grid, IconButton, Checkbox, FormControlLabel, FormGroup, Divider, Button } from '@mui/material';
import { FavoriteBorder as WishlistIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { products as mockProducts } from '../data/products';

const Shop: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h2" sx={{ mb: 4, textAlign: 'center' }}>Shop Collection</Typography>
      
      <Grid container spacing={6}>
        {/* Sidebar Filters */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Box sx={{ position: 'sticky', top: '100px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Categories</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="All Products" />
              <FormControlLabel control={<Checkbox />} label="Suits" />
              <FormControlLabel control={<Checkbox />} label="Sarees" />
              <FormControlLabel control={<Checkbox />} label="Anarkali" />
            </FormGroup>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" sx={{ mb: 2 }}>Fabric</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Georgette" />
              <FormControlLabel control={<Checkbox />} label="Chanderi" />
              <FormControlLabel control={<Checkbox />} label="Cotton" />
            </FormGroup>
          </Box>
        </Grid>

        {/* Product Grid */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="body2" color="text.secondary">{mockProducts.length} Products</Typography>
            <Button variant="text" color="inherit">Sort By: Featured</Button>
          </Box>
          
          <Grid container spacing={4}>
            {mockProducts.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <Box component={Link} to={`/product/${product.id}`} sx={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <Box sx={{ position: 'relative', pt: '133%', bgcolor: 'background.paper', overflow: 'hidden', mb: 2 }}>
                    <Box component="img" 
                      src={product.image}
                      alt={product.name}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                    />
                    <IconButton sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper', '&:hover': { bgcolor: 'background.default' } }}
                      onClick={(e) => { e.preventDefault(); }}>
                      <WishlistIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" sx={{ fontSize: '1rem', mb: 0.5 }}>{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">₹{product.price}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Shop;
