import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Craft: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
      <Typography variant="overline" sx={{ letterSpacing: '0.2em' }}>Heritage</Typography>
      <Typography variant="h2" sx={{ mb: 4, mt: 2 }}>Our Craft</Typography>
      <Box sx={{ position: 'relative', height: { xs: '300px', md: '500px' }, mb: 6, overflow: 'hidden', borderRadius: 2 }}>
        <Box component="img" src="/assets/chikankari_suit.png" alt="Craftsmanship" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }} />
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.2rem', lineHeight: 1.8 }}>
        Every garment we create is a testament to the rich heritage of Indian craftsmanship. Our artisans spend countless hours intricately embroidering each motif, ensuring that the legacy of Chikankari and traditional weaving techniques is preserved in every thread.
      </Typography>
    </Container>
  );
};

export default Craft;
