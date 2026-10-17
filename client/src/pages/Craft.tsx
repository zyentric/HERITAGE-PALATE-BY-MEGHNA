import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import {
  VolunteerActivismOutlined as HeartIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const stitches = [
  {
    name: 'Bakhiya (Shadow Work)',
    desc: 'Embroidered from the reverse of gossamer fabrics like mulmul and organza. The herringbone threads cast an ethereal shadow on the front, creating misty floral silhouettes.',
    badge: 'Signature Awadhi Stitch',
  },
  {
    name: 'Tepchi (Running Stitch)',
    desc: 'A simple yet hypnotic linear stitch running across lengths of warp and weft. Used to trace delicate vines, paisleys, and floral creepers with geometric precision.',
    badge: 'Line Motifs',
  },
  {
    name: 'Phanda & Murri (Pearl & Rice Knots)',
    desc: 'Tightly rolled French-style knotting resembling miniature grains of rice and lustrous seed pearls. Adds tactile three-dimensional texture to floral petals and buds.',
    badge: 'Tactile Relief',
  },
  {
    name: 'Jaali (Lattice Work)',
    desc: 'The hallmark of master artisan skill. Without cutting a single strand of fabric, the artisan gently parts the warp and weft threads to form delicate lace-like lattice screens.',
    badge: 'Master Karigar Art',
  },
  {
    name: 'Mukaish & Badla Wire',
    desc: 'Flattened strands of pure silver and gold metallic wires threaded and hammered into the weave, capturing glimmers of light with every gentle movement.',
    badge: 'Royal Luster',
  },
  {
    name: 'Gota Patti & Marodi',
    desc: 'Originating in royal Rajasthan and Awadh, ribbons of metallic zari are folded, pinched into flower petals, and hand-appliqued along hemlines and necklines.',
    badge: 'Festive Grandeur',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Motif Sketching & Woodblock Chhapai',
    desc: 'Traditional paisley, lotus, and jasmine motifs are carved into seasoned teakwood blocks. The pattern is hand-stamped onto raw fabric using washable natural indigo solutions.',
  },
  {
    step: '02',
    title: 'The Artisanal Kadhai (Embroidery)',
    desc: 'Each garment is passed to skilled women artisans in Lucknow. For weeks—and often months—they sit together under natural daylight, translating the stamped designs into delicate needlework.',
  },
  {
    step: '03',
    title: 'Pure River Washing & Curing',
    desc: 'Once the embroidery is complete, the garments are gently hand-washed in freshwater tanks to remove all stamp traces, then sun-bleached and cured on open grass meadows.',
  },
  {
    step: '04',
    title: 'Mukaish Embellishment & Detailing',
    desc: 'Specialist artisans (Badla karigars) pierce tiny metallic dots and hand-stitch scalloped lace borders onto dupattas and hems to impart regal shimmer.',
  },
  {
    step: '05',
    title: 'Bespoke Atelier Tailoring',
    desc: 'In our personal studio, master tailors cut and stitch the kalis and linings to your exact measurements, ensuring your silhouette drapes with effortless royalty.',
  },
];

const Craft: React.FC = () => {

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      {/* Hero Banner */}
      <Container maxWidth="lg" sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
        <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.22em' }}>
          Heritage & Legacy
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.8rem' }, mt: 1, mb: 2.5 }}>
          The Sacred Art of Indian Craft
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mx: 'auto', fontSize: '1.15rem', lineHeight: 1.8 }}>
          Discover the centuries-old techniques, master karigars, and dedicated slow-fashion processes behind every Heritage Palate creation.
        </Typography>
      </Container>

      {/* Featured Atmosphere Banner */}
      <Container maxWidth="xl" sx={{ mb: { xs: 8, md: 14 } }}>
        <Box sx={{ position: 'relative', height: { xs: 340, md: 540 }, overflow: 'hidden' }}>
          <Box
            component="img"
            src="/assets/chikankari_suit.png"
            alt="Handcrafted Artisanal Work"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,14,13,0.85) 0%, transparent 60%)',
              display: 'flex',
              alignItems: 'flex-end',
              p: { xs: 3, md: 6 },
            }}
          >
            <Box sx={{ maxWidth: 640 }}>
              <Typography variant="h4" sx={{ color: '#FAF8F5', mb: 1, fontFamily: 'Playfair Display, serif' }}>
                Born in Royal Awadh
              </Typography>
              <Typography variant="body2" sx={{ color: '#D4AF37', lineHeight: 1.6 }}>
                Patronized by the Nawabs and Mughal queens, Lucknowi Chikankari remains one of the world’s most refined needlecrafts—impossible to replicate by machines.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* The 6 Stitches Showcase */}
      <Container maxWidth="xl" sx={{ mb: { xs: 8, md: 14 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" color="secondary.main">
            Artisanal Lexicon
          </Typography>
          <Typography variant="h2" sx={{ mt: 0.5, mb: 1.5 }}>
            The Stitches of Awadh
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto' }}>
            Traditional Chikankari encompasses over 32 intricate stitches. Here are the core techniques that define our collection.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {stitches.map((stitch) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={stitch.name}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'secondary.main',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                      display: 'block',
                      mb: 1,
                    }}
                  >
                    {stitch.badge}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 1.5, fontFamily: 'Playfair Display, serif' }}>
                    {stitch.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {stitch.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* The 5-Step Lifecycle */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 }, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider', mb: { xs: 8, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="secondary.main">
              From Loom to Wardrobe
            </Typography>
            <Typography variant="h2" sx={{ mt: 0.5 }}>
              The 5-Step Artisanal Journey
            </Typography>
          </Box>

          <Stack spacing={4}>
            {processSteps.map((step) => (
              <Box
                key={step.step}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 2, sm: 4 },
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.default',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: 'Playfair Display, serif',
                    color: 'secondary.main',
                    minWidth: 80,
                    fontWeight: 600,
                  }}
                >
                  {step.step}
                </Typography>
                <Box>
                  <Typography variant="h5" sx={{ mb: 0.5, fontFamily: 'Playfair Display, serif' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Ethical Commitment Banner */}
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <HeartIcon sx={{ color: 'secondary.main', fontSize: 44, mb: 1.5 }} />
        <Typography variant="overline" color="secondary.main" sx={{ display: 'block' }}>
          Ethical & Sustainable Atelier
        </Typography>
        <Typography variant="h2" sx={{ mt: 0.5, mb: 2.5 }}>
          Empowering Generational Women Artisans
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 740, mx: 'auto', lineHeight: 1.8, mb: 4, fontSize: '1.05rem' }}>
          More than 80% of our embroidery is crafted by women artisans in rural villages surrounding Lucknow. By providing fair living wages, healthcare, and flexible home-based working environments, Heritage Palate ensures this royal art form continues to flourish for generations.
        </Typography>

        <Button
          component={Link}
          to="/shop"
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{ py: 1.8, px: 4 }}
        >
          Explore Handcrafted Creations
        </Button>
      </Container>
    </Box>
  );
};

export default Craft;
