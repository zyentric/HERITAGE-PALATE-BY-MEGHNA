import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import {
  WhatsApp as WhatsAppIcon,
  CheckCircle as CheckIcon,
  Diversity3Outlined as CommunityIcon,
  YardOutlined as EcoIcon,
  DesignServicesOutlined as AtelierIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: <AtelierIcon sx={{ fontSize: 36, color: 'secondary.main' }} />,
    title: 'Artisanal Authenticity',
    desc: 'We never compromise on handcrafting. Every single stitch on our Chikankari and every motif on our sarees is painstakingly created by generational artisans.',
  },
  {
    icon: <CheckIcon sx={{ fontSize: 36, color: 'secondary.main' }} />,
    title: 'Bespoke Made-to-Measure',
    desc: 'No two bodies are identical. We believe luxury ethnic wear should fit you like a second skin, which is why we provide complimentary custom measurements on our garments.',
  },
  {
    icon: <EcoIcon sx={{ fontSize: 36, color: 'secondary.main' }} />,
    title: 'Slow Fashion & Sustainability',
    desc: 'We produce limited artisanal editions using natural mulberry silks, fine mulmul cottons, and biodegradable pigments, rejecting fast-fashion mass production.',
  },
  {
    icon: <CommunityIcon sx={{ fontSize: 36, color: 'secondary.main' }} />,
    title: 'Personal Boutique Care',
    desc: 'Shopping with Heritage Palate feels like visiting an intimate personal salon. Meghna and our stylists are always just a WhatsApp message away to help you choose.',
  },
];

const About: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      {/* Editorial Header */}
      <Container maxWidth="lg" sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
        <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.22em' }}>
          Our Story & Philosophy
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.8rem' }, mt: 1, mb: 2.5 }}>
          The Heart of Heritage Palate
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 740, mx: 'auto', fontSize: '1.15rem', lineHeight: 1.8 }}>
          A luxury boutique born out of a lifelong reverence for India&rsquo;s living textile heritage and the timeless poetry of traditional silhouettes.
        </Typography>
      </Container>

      {/* Founder's Letter Section */}
      <Container maxWidth="xl" sx={{ mb: { xs: 8, md: 14 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src="/assets/hero_2.png"
                alt="Meghna at the Atelier"
                sx={{
                  width: '100%',
                  maxHeight: 600,
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  left: { xs: 16, md: -20 },
                  bgcolor: 'background.paper',
                  p: 3,
                  border: '1px solid',
                  borderColor: 'secondary.main',
                  maxWidth: 260,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
              >
                <Typography variant="subtitle2" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                  Meghna
                </Typography>
                <Typography variant="caption" color="secondary.main" sx={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Founder & Creative Director
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ pl: { md: 4 } }}>
              <Typography variant="overline" color="secondary.main">
                Letter From The Founder
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: '1.8rem', md: '2.6rem' } }}>
                &ldquo;We don&rsquo;t just craft clothes; we preserve living heirlooms.&rdquo;
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.8 }}>
                Dear Patron,
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.8 }}>
                Growing up surrounded by the rhythmic click of traditional wooden handlooms and the delicate whispers of Lucknowi karigars, I was captivated by the patience that goes into Indian textile art. A single Chikankari anarkali takes over 120 artisan hours—an act of pure dedication that no machine will ever replicate.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.8 }}>
                When I founded <strong>Heritage Palate by Meghna</strong>, my vision was clear: to take these imperial crafts out of museum cabinets and infuse them into the lives of modern women who cherish their cultural roots. Whether it is an intimate wedding or a festive celebration, our garments are designed to make you feel majestic, poised, and utterly comfortable.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                Thank you for being part of our artisanal journey and empowering generational craft families across India.
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
                <Box
                  component="img"
                  src="/assets/hpm_emblem_hd.png"
                  alt="Heritage Palate Royal Seal"
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    border: '1.5px solid #D4AF37',
                    boxShadow: '0 2px 10px rgba(212, 175, 55, 0.25)',
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontFamily: 'Playfair Display, serif', color: 'secondary.main', fontStyle: 'italic' }}>
                    With warmth and gratitude,
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, letterSpacing: '0.04em' }}>
                    Meghna — Founder & Creative Director
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Brand Values Grid */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 }, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider', mb: { xs: 8, md: 14 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="secondary.main">
              Our Core Principles
            </Typography>
            <Typography variant="h2" sx={{ mt: 0.5 }}>
              The Pillars of Our Atelier
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {values.map((v) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={v.title}>
                <Box
                  sx={{
                    p: 4,
                    height: '100%',
                    bgcolor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box>{v.icon}</Box>
                  <Typography variant="h5" sx={{ fontFamily: 'Playfair Display, serif' }}>
                    {v.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {v.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Boutique Appointment & WhatsApp Styling CTA */}
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="overline" color="secondary.main">
          Personal Styling Concierge
        </Typography>
        <Typography variant="h2" sx={{ mt: 0.5, mb: 2 }}>
          Experience Bespoke Luxury
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 4, fontSize: '1.1rem' }}>
          Have an upcoming family wedding, festival, or special occasion? Schedule a complimentary video styling appointment or chat with Meghna directly to explore custom colorways, fabrics, and bespoke silhouettes.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
          <Button
            component="a"
            href="https://wa.me/917303466990?text=Hello%20Meghna!%20I%20would%20like%20to%20book%20a%20personal%20styling%20session."
            target="_blank"
            variant="contained"
            size="large"
            startIcon={<WhatsAppIcon />}
            sx={{
              bgcolor: '#128C7E',
              color: '#FFFFFF',
              px: 4,
              py: 1.8,
              fontWeight: 600,
              '&:hover': { bgcolor: '#075E54' },
            }}
          >
            Chat with Meghna on WhatsApp
          </Button>

          <Button
            component={Link}
            to="/shop"
            variant="outlined"
            color="primary"
            size="large"
            sx={{ px: 4, py: 1.8 }}
          >
            Explore Collections
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default About;
