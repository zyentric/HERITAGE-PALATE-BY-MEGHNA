import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Button, IconButton, TextField, Divider, ToggleButton, ToggleButtonGroup, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { FavoriteBorder as WishlistIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id)) || products[0];

  const [size, setSize] = useState<string | null>(null);
  const [customSize, setCustomSize] = useState(false);

  const handleSizeChange = (_event: React.MouseEvent<HTMLElement>, newSize: string | null) => {
    setSize(newSize);
    if (newSize) setCustomSize(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={8}>
        {/* Image Gallery (Simplified) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ position: 'sticky', top: '100px' }}>
            <Box component="img" 
              src={product.image}
              alt={product.name}
              sx={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" sx={{ mb: 1, fontFamily: 'Playfair Display, serif' }}>
              {product.name}
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
              ₹{product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Inclusive of all taxes
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Typography variant="subtitle2" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Select Size
            </Typography>
            
            <ToggleButtonGroup
              value={size}
              exclusive
              onChange={handleSizeChange}
              aria-label="text size"
              sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}
            >
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                <ToggleButton key={s} value={s} aria-label={s} sx={{ 
                  borderRadius: 0, 
                  border: '1px solid',
                  borderColor: 'divider',
                  minWidth: '56px',
                  height: '48px',
                  '&.Mui-selected': { bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.main' } }
                }}>
                  {s}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            <Button 
              variant="text" 
              color="inherit" 
              sx={{ textDecoration: 'underline', mb: 4, textTransform: 'none' }}
              onClick={() => setCustomSize(!customSize)}
            >
              Need Custom Measurements?
            </Button>

            {customSize && (
              <Box sx={{ mb: 4, p: 3, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>Enter your measurements (in inches)</Typography>
                <Grid container spacing={2}>
                  {['Bust', 'Waist', 'Hip', 'Shoulder', 'Sleeve Length', 'Garment Length'].map(field => (
                    <Grid size={{ xs: 6 }} key={field}>
                      <TextField fullWidth label={field} variant="standard" />
                    </Grid>
                  ))}
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth label="Additional Instructions" variant="standard" multiline rows={2} />
                  </Grid>
                </Grid>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button variant="contained" color="primary" fullWidth size="large" disableElevation sx={{ py: 2, borderRadius: 0, letterSpacing: '.1em' }}>
                Add to Bag
              </Button>
              <IconButton sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 0, px: 3 }}>
                <WishlistIcon />
              </IconButton>
            </Box>

            <Button variant="outlined" color="primary" fullWidth size="large" sx={{ py: 2, mb: 6, display: 'flex', gap: 1, borderRadius: 0, letterSpacing: '.1em' }}>
              <Typography variant="button">Ask on WhatsApp</Typography>
            </Button>

            {/* Accordions for Details */}
            <Box>
              <Accordion disableGutters elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' }, borderBottom: '1px solid', borderColor: 'divider' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                  <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>Description</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pb: 3, color: 'text.secondary' }}>
                  A beautifully handcrafted Chikankari Anarkali set in pristine ivory, featuring intricate embroidery and mirror work on premium mul chanderi fabric.
                </AccordionDetails>
              </Accordion>
              
              <Accordion disableGutters elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' }, borderBottom: '1px solid', borderColor: 'divider' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                  <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>Fabric & Care</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pb: 3, color: 'text.secondary' }}>
                  Premium Mul Chanderi. Dry clean only. Iron on reverse.
                </AccordionDetails>
              </Accordion>

              <Accordion disableGutters elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' }, borderBottom: '1px solid', borderColor: 'divider' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                  <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>Shipping & Returns</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pb: 3, color: 'text.secondary' }}>
                  Ships in 7-10 business days. Returns accepted within 7 days for standard sizes. Custom orders are non-refundable.
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
