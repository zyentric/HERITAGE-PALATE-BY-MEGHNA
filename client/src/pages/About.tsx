import React from 'react';
import { Container, Typography } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ mb: 4 }}>About Us</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.2rem', lineHeight: 1.8 }}>
        Heritage Palate by Meghna was born out of a deep love for Indian textiles and the timeless elegance of traditional silhouettes. We aim to bring you handcrafted luxury that celebrates our cultural roots while offering contemporary appeal.
      </Typography>
    </Container>
  );
};

export default About;
