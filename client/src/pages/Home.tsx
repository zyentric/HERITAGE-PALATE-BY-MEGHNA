import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, IconButton } from '@mui/material';
import { FavoriteBorder as WishlistIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { products } from '../data/products';
const newArrivals = products.slice(0, 4);

const categories = [
  { name: 'Chikankari', image: '/assets/chikankari_suit.png' },
  { name: 'Anarkali', image: '/assets/ivory_anarkali.png' },
  { name: 'Suits', image: '/assets/white_suit.png' },
  { name: 'Sarees', image: '/assets/gold_saree.png' }
];

const heroImages = [
  '/assets/hero_1.png',
  '/assets/hero_2.png',
  '/assets/hero_3.png'
];

const Home: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        color: '#fff',
        px: 2,
        overflow: 'hidden'
      }}>
        {heroImages.map((img, index) => (
          <Box key={img} sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${img}")`,
            backgroundPosition: 'center 15%',
            backgroundSize: 'cover',
            opacity: currentImage === index ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 0,
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }
          }} />
        ))}
        <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
          <Typography variant="overline" sx={{ display: 'block', fontSize: '1rem', letterSpacing: '0.2em', mb: 2 }}>
            Heritage Palate by Meghna
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, mb: 4, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            Timeless Indian craftsmanship, reimagined for today.
          </Typography>
          <Button component={Link} to="/shop" variant="outlined" size="large" sx={{ 
            color: '#fff', 
            borderColor: '#fff', 
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: '#fff' } 
          }}>
            Explore Collection
          </Button>
        </Box>
      </Box>

      {/* New Arrivals Section */}
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ mb: 1 }}>New Arrivals</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Discover our latest handcrafted pieces.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {newArrivals.map(item => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
              <Box sx={{ cursor: 'pointer', group: 'true' }} component={Link} to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ position: 'relative', pt: '133%', bgcolor: 'background.paper', overflow: 'hidden' }}>
                  <Box component="img" 
                    src={item.image}
                    alt={item.name}
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
                    onClick={(e) => { e.preventDefault(); /* add to wishlist */ }}>
                    <WishlistIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 0.5 }}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">₹{item.price}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button component={Link} to="/shop" variant="outlined" color="primary">View All</Button>
        </Box>
      </Container>

      {/* Shop By Category Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 10 }}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6 }}>Shop By Category</Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={category.name}>
                <Box component={Link} to={`/shop`} sx={{ display: 'block', position: 'relative', height: '400px', overflow: 'hidden', textDecoration: 'none' }}>
                  <Box component="img"
                    src={category.image}
                    alt={category.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', '&:hover': { transform: 'scale(1.05)' } }}
                  />
                  <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#fff', letterSpacing: '0.1em' }}>{category.name}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Craft Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="overline" sx={{ letterSpacing: '0.2em' }}>Heritage</Typography>
          <Typography variant="h2" sx={{ mb: 4, mt: 2 }}>The Art of Indian Craft</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: '1.2rem', lineHeight: 1.8 }}>
            A celebration of traditional craftsmanship, fine fabrics, and timeless silhouettes. Every piece carries the character of Indian heritage, carefully crafted to bring out elegance and grace.
          </Typography>
          <Button component={Link} to="/about" variant="outlined" size="large">Discover Our Craft</Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
