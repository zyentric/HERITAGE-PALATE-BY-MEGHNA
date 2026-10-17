import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import {
  Instagram as InstagramIcon,
  WhatsApp as WhatsAppIcon,
  WorkspacePremiumOutlined as QualityIcon,
  CheckCircle as CheckIcon,
  AutoAwesome as SparkleIcon,
  VerifiedUserOutlined as SecurityIcon,
  LocalShippingOutlined as ShippingIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { CustomerCareDialog, type CustomerCareType } from './CustomerCareDialog';
import { Footer3DCanvas } from './Footer3DCanvas';
import { useStore } from '../context/StoreContext';

const Footer: React.FC = () => {
  const [careType, setCareType] = useState<CustomerCareType>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const { showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError(null);
    setSubscribed(true);
    showToast('Welcome to The Atelier Circle! Exclusive drops will be sent to your inbox.');
    setEmail('');
  };

  return (
    <>
      <Box
        component="footer"
        sx={{
          bgcolor: '#100f0e',
          color: '#FAF8F5',
          pt: { xs: 8, md: 10 },
          pb: 4,
          mt: 'auto',
          borderTop: '1px solid rgba(212, 175, 55, 0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 3D Interactive Three.js Zari Silk & Stardust Background */}
        <Footer3DCanvas />

        {/* Subtle Ambient Gold Gradient Glow */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '240px',
            background: 'radial-gradient(ellipse at bottom, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Top Atelier Trust Pillars */}
          <Box
            sx={{
              pb: 6,
              mb: 6,
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: 3.5,
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            {[
              {
                icon: <QualityIcon sx={{ color: '#D4AF37', fontSize: 22 }} />,
                title: '100% Handcrafted Indian Couture',
                desc: 'Authentic 32-stitch Lucknowi needlework & Varanasi pit-looms',
              },
              {
                icon: <SparkleIcon sx={{ color: '#D4AF37', fontSize: 22 }} />,
                title: 'Bespoke Custom Measurements',
                desc: 'Personalized couture fit tailored to your individual silhouette',
              },
              {
                icon: <ShippingIcon sx={{ color: '#D4AF37', fontSize: 22 }} />,
                title: 'Complimentary Pan-India Express',
                desc: 'Insured worldwide delivery via DHL & premier express couriers',
              },
              {
                icon: <SecurityIcon sx={{ color: '#D4AF37', fontSize: 22 }} />,
                title: 'Direct WhatsApp Concierge',
                desc: 'Chat directly with designer Meghna for styling & reservations',
              },
            ].map((pillar) => (
              <Box key={pillar.title} sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: 1.2 }}>
                  {pillar.icon}
                  <Typography variant="subtitle2" sx={{ color: '#FAF8F5', letterSpacing: '0.06em', fontSize: '0.88rem', fontWeight: 600 }}>
                    {pillar.title}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#A0988E', fontSize: '0.78rem', lineHeight: 1.5 }}>
                  {pillar.desc}
                </Typography>
              </Box>
            ))}
          </Box>

          <Grid container spacing={5} sx={{ mb: 6 }}>
            {/* Column 1: Grand Brand Identity & Official Logo */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box
                  component="img"
                  src="/assets/hpm_emblem_hd.png"
                  alt="Heritage Palate by Meghna Royal Insignia"
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #D4AF37',
                    boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)',
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Playfair Display, serif',
                      letterSpacing: '0.14em',
                      fontWeight: 600,
                      color: '#FAF8F5',
                      lineHeight: 1.15,
                    }}
                  >
                    HERITAGE PALATE
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      letterSpacing: '0.28em',
                      color: '#D4AF37',
                      display: 'block',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      fontSize: '0.62rem',
                    }}
                  >
                    BY MEGHNA
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ color: '#A0988E', maxWidth: 360, lineHeight: 1.8, mb: 2.5, fontSize: '0.86rem' }}>
                &ldquo;A space for true handloom lovers ✨ Honoring the art, culture and stories behind every weave 💕&rdquo;
              </Typography>
              <Typography variant="caption" sx={{ color: '#7E766D', display: 'block', mb: 3, lineHeight: 1.6 }}>
                Each heirloom silhouette is handcrafted by master karigars across Lucknow and Varanasi, celebrating slow ethical fashion.
              </Typography>

              {/* Verified Direct Social Hotline */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <IconButton
                  component="a"
                  href="https://www.instagram.com/heritagepalatebymeghna/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @heritagepalatebymeghna"
                  sx={{
                    color: '#D4AF37',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    bgcolor: 'rgba(212, 175, 55, 0.05)',
                    '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.15)', borderColor: '#D4AF37' },
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://wa.me/917303466990?text=Hi%20Meghna!%20I%20am%20chatting%20from%20the%20website%20footer."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Concierge +91 73034 66990"
                  sx={{
                    color: '#25D366',
                    border: '1px solid rgba(37, 211, 102, 0.35)',
                    bgcolor: 'rgba(37, 211, 102, 0.05)',
                    '&:hover': { bgcolor: 'rgba(37, 211, 102, 0.15)', borderColor: '#25D366' },
                  }}
                >
                  <WhatsAppIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption" sx={{ color: '#A0988E', fontSize: '0.74rem' }}>
                  WhatsApp Hotline: <strong>+91 73034 66990</strong>
                </Typography>
              </Box>
            </Grid>

            {/* Column 2: Quick Atelier Navigation */}
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Typography variant="subtitle2" sx={{ letterSpacing: '0.15em', mb: 2.5, color: '#D4AF37', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>
                Haute Couture
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { name: 'Lucknowi Chikankari', path: '/shop?category=Chikankari' },
                  { name: 'Royal Anarkali Sets', path: '/shop?category=Anarkalis' },
                  { name: 'Heritage Varanasi Sarees', path: '/shop?category=Sarees' },
                  { name: 'Festive Kurta Ensembles', path: '/shop?category=Suits' },
                  { name: 'Collection Lookbooks', path: '/collections' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    component={RouterLink}
                    to={item.path}
                    underline="hover"
                    sx={{
                      color: '#A0988E',
                      fontSize: '0.85rem',
                      transition: 'color 0.2s',
                      '&:hover': { color: '#FAF8F5' },
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Column 3: Customer Care & Services */}
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Typography variant="subtitle2" sx={{ letterSpacing: '0.15em', mb: 2.5, color: '#D4AF37', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>
                Customer Care
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { name: 'Bespoke Size Guide', type: 'size-guide' as const },
                  { name: 'Insured Shipping Policy', type: 'shipping' as const },
                  { name: 'Exchange & Alterations', type: 'returns' as const },
                  { name: 'Client FAQs', type: 'faqs' as const },
                  { name: 'Track My Orders', path: '/orders' },
                ].map((item) => (
                  item.path ? (
                    <Link
                      key={item.name}
                      component={RouterLink}
                      to={item.path}
                      underline="hover"
                      sx={{
                        color: '#A0988E',
                        fontSize: '0.85rem',
                        '&:hover': { color: '#FAF8F5' },
                      }}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      key={item.name}
                      component="button"
                      onClick={() => setCareType(item.type!)}
                      underline="hover"
                      sx={{
                        color: '#A0988E',
                        fontSize: '0.85rem',
                        textAlign: 'left',
                        '&:hover': { color: '#FAF8F5' },
                      }}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </Box>
            </Grid>

            {/* Column 4: The Atelier Circle VIP Newsletter */}
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <Typography variant="subtitle2" sx={{ letterSpacing: '0.15em', mb: 1, color: '#D4AF37', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>
                The Atelier Circle
              </Typography>
              <Typography variant="body2" sx={{ color: '#A0988E', mb: 2.5, lineHeight: 1.6, fontSize: '0.85rem' }}>
                Join Meghna’s private list for limited artisan batch drops, preview trunk shows, and handloom memoirs.
              </Typography>

              {subscribed ? (
                <Box
                  sx={{
                    p: 2.5,
                    bgcolor: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid #D4AF37',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <CheckIcon sx={{ color: '#D4AF37' }} />
                  <Typography variant="body2" sx={{ color: '#FAF8F5', fontWeight: 500 }}>
                    Welcome to The Atelier Circle! Private previews will arrive in your inbox.
                  </Typography>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubscribe} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (newsletterError) setNewsletterError(null);
                      }}
                      sx={{
                        flexGrow: 1,
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        input: { color: '#FAF8F5', fontSize: '0.85rem' },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 0,
                          '& fieldset': { borderColor: newsletterError ? '#E57373' : 'rgba(255, 255, 255, 0.2)' },
                          '&:hover fieldset': { borderColor: newsletterError ? '#E57373' : '#D4AF37' },
                          '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: '#D4AF37',
                        color: '#141312',
                        borderRadius: 0,
                        px: 3,
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        '&:hover': { bgcolor: '#F3E5AB' },
                      }}
                    >
                      Join
                    </Button>
                  </Box>
                  {newsletterError && (
                    <Typography variant="caption" sx={{ color: '#E57373', fontSize: '0.74rem' }}>
                      {newsletterError}
                    </Typography>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 3 }} />

          {/* Bottom Copyright & Legal Links */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Link
                component="button"
                onClick={() => setCareType('privacy')}
                underline="hover"
                sx={{ color: '#888075', fontSize: '0.78rem' }}
              >
                Privacy Policy
              </Link>
              <Link
                component="button"
                onClick={() => setCareType('terms')}
                underline="hover"
                sx={{ color: '#888075', fontSize: '0.78rem' }}
              >
                Terms of Service
              </Link>
              <Link
                component="button"
                onClick={() => setCareType('returns')}
                underline="hover"
                sx={{ color: '#888075', fontSize: '0.78rem' }}
              >
                Refund Policy
              </Link>
            </Box>

            <Typography variant="body2" sx={{ color: '#888075', fontSize: '0.78rem', textAlign: { xs: 'center', md: 'right' } }}>
              © {new Date().getFullYear()} Heritage Palate by Meghna. All rights reserved. Handcrafted with pride in India.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Customer Care Dialog */}
      <CustomerCareDialog type={careType} onClose={() => setCareType(null)} />
    </>
  );
};

export default Footer;
