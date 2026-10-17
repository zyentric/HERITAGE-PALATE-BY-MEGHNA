import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { SEOHead } from '../components/SEOHead';

const collectionEdits = [
  {
    title: 'The Chikankari Edit',
    subtitle: 'Whispers of Awadh',
    category: 'Chikankari',
    desc: 'Breathtaking 32-stitch hand embroidery executed by master women karigars in the heritage lanes of Lucknow. Featuring delicate shadow-work (bakhiya), floral jaali lattices, and sparkling mukaish dots on fine mulmul and gossamer chanderi.',
    heroImage: '/assets/chikankari_suit.png',
    accent: 'Hand-dyed pastels & pristine ivory',
  },
  {
    title: 'The Royal Anarkali Archive',
    subtitle: 'Imperial Volume & Grace',
    category: 'Anarkali',
    desc: 'Kalidar ensembles inspired by Mughal courts and nawabi grandeur. Crafted with expansive 32-kali volume, sweeping flared hems, intricately framed yokes, and paired with handcrafted tissue and scalloped organza dupattas.',
    heroImage: '/assets/ivory_anarkali.png',
    accent: 'Voluminous kalidars & regal flair',
  },
  {
    title: 'The Varanasi & Chanderi Weaves',
    subtitle: 'Golden Looms of India',
    category: 'Sarees',
    desc: 'Heirloom handloom sarees woven on traditional pit looms across Varanasi and Madhya Pradesh. Spun with certified pure katan silk and lightweight tissue yarns, decorated with pure tested zari bootis and grand pallus.',
    heroImage: '/assets/gold_saree.png',
    accent: 'Pure Katan Silk & Antique Gold Zari',
  },
  {
    title: 'Festive & Contemporary Suits',
    subtitle: 'Modern Poise, Ancient Roots',
    category: 'Suits',
    desc: 'Effortlessly luxurious straight-cut silk kurtas, breezy shararas, and tailored trousers. Designed for joyous festivities, sangeet ceremonies, and intimate celebrations where comfort seamlessly meets royal elegance.',
    heroImage: '/assets/white_suit.png',
    accent: 'Resham embroidery & raw silk silhouettes',
  },
];

const Collections: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <SEOHead
        title="Curated Collections & Seasonal Archives"
        description="Immerse yourself in our curated edits: The Chikankari Edit, Royal Anarkali Archive, Varanasi & Chanderi Weaves, and Festive Silk Suits."
        keywords="Chikankari collection, bridal Anarkali, Banarasi saree edit, handloom archives, luxury Indian couture, Heritage Palate by Meghna"
        canonical="https://heritage-palate-by-meghna.onrender.com/collections"
      />
      <Container maxWidth="xl">
        {/* Header Banner */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography variant="overline" color="secondary.main">
            Seasonal Lookbook & Archives
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.6rem' }, mt: 1, mb: 2 }}>
            Curated Collections
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mx: 'auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
            Each collection represents a distinct dialogue between timeless Indian textile traditions and modern sartorial elegance.
          </Typography>
        </Box>

        {/* Collections Chapters */}
        <Stack spacing={{ xs: 8, md: 14 }}>
          {collectionEdits.map((item, index) => {
            const isEven = index % 2 === 0;
            const categoryProducts = products.filter((p) => p.category === item.category);

            return (
              <Box
                key={item.title}
                sx={{
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  p: { xs: 3, md: 6 },
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Grid
                  container
                  spacing={{ xs: 4, md: 8 }}
                  sx={{
                    alignItems: 'center',
                    flexDirection: isEven ? 'row' : { xs: 'column-reverse', md: 'row-reverse' },
                  }}
                >
                  {/* Left Column: Visual Showcase */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      component={Link}
                      to={`/shop?category=${item.category}`}
                      sx={{
                        display: 'block',
                        position: 'relative',
                        pt: '120%',
                        overflow: 'hidden',
                        textDecoration: 'none',
                        '&:hover img': { transform: 'scale(1.05)' },
                      }}
                    >
                      <Box
                        component="img"
                        src={item.heroImage}
                        alt={item.title}
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          left: 16,
                          bgcolor: 'rgba(20, 19, 18, 0.85)',
                          backdropFilter: 'blur(6px)',
                          color: '#D4AF37',
                          py: 0.8,
                          px: 2,
                          fontSize: '0.75rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                        }}
                      >
                        {item.accent}
                      </Box>
                    </Box>
                  </Grid>

                  {/* Right Column: Narrative & Action */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ pl: isEven ? { md: 2 } : 0, pr: !isEven ? { md: 2 } : 0 }}>
                      <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.2em' }}>
                        Chapter 0{index + 1} • {item.subtitle}
                      </Typography>
                      <Typography variant="h2" sx={{ mt: 1, mb: 2.5, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontSize: '1.05rem' }}>
                        {item.desc}
                      </Typography>

                      {/* Mini Preview Grid of Pieces */}
                      <Typography variant="subtitle2" sx={{ letterSpacing: '0.1em', mb: 2, textTransform: 'uppercase' }}>
                        Pieces in this edit:
                      </Typography>
                      <Grid container spacing={2} sx={{ mb: 4 }}>
                        {categoryProducts.slice(0, 2).map((p) => (
                          <Grid size={{ xs: 6 }} key={p.id}>
                            <Box
                              component={Link}
                              to={`/product/${p.id}`}
                              sx={{
                                display: 'flex',
                                gap: 1.5,
                                p: 1.5,
                                border: '1px solid',
                                borderColor: 'divider',
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': { borderColor: 'secondary.main' },
                              }}
                            >
                              <Box
                                component="img"
                                src={p.image}
                                alt={p.name}
                                sx={{ width: 48, height: 64, objectFit: 'cover' }}
                              />
                              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" sx={{ fontWeight: 600, lineHeight: 1.2, mb: 0.5 }}>
                                  {p.name.split(' ').slice(0, 3).join(' ')}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  ₹{p.price.toLocaleString('en-IN')}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>

                      <Button
                        component={Link}
                        to={`/shop?category=${item.category}`}
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ py: 1.6, px: 3.5 }}
                      >
                        Shop {item.title}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
};

export default Collections;
