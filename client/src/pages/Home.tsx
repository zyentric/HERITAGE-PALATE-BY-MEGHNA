import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Rating,
  Stack,
  useTheme,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as WishlistIcon,
  ShoppingBagOutlined as BagIcon,
  ArrowForward as ArrowForwardIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AutoAwesome as SparkleIcon,
  WhatsApp as WhatsAppIcon,
  Instagram as InstagramIcon,
  FormatQuote as QuoteIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { SEOHead } from '../components/SEOHead';

const heroSlides = [
  {
    image: '/assets/hero_1.png',
    tagline: 'The Autumn / Winter Atelier Drop',
    title: 'Timeless Indian Craftsmanship, Reimagined.',
    subtitle: 'Exquisite hand-embroidered Chikankari and royal silhouettes tailored to your individual poise.',
    primaryCta: 'Explore Collection',
    primaryLink: '/shop',
    secondaryCta: 'Our Artisanal Craft',
    secondaryLink: '/craft',
  },
  {
    image: '/assets/hero_2.png',
    tagline: 'The Banarasi & Chanderi Archive',
    title: 'Heirloom Weaves of Varanasi & Chanderi.',
    subtitle: 'Pure mulberry silks woven with tested gold zari for unforgettable moments.',
    primaryCta: 'Discover Sarees',
    primaryLink: '/shop?category=Sarees',
    secondaryCta: 'Custom Tailoring',
    secondaryLink: '/about',
  },
  {
    image: '/assets/hero_3.png',
    tagline: 'Royal Kalidar Silhouettes',
    title: 'Splendor of Lucknowi Anarkalis.',
    subtitle: 'Dramatic 32-kali volume embellished with mukaish and badla handcrafting.',
    primaryCta: 'Shop Anarkalis',
    primaryLink: '/shop?category=Anarkali',
    secondaryCta: 'WhatsApp Concierge',
    secondaryLink: 'https://wa.me/917303466990',
    external: true,
  },
];

const categories = [
  {
    name: 'Chikankari',
    desc: '32-stitch hand embroidery on mulmul & chanderi',
    image: '/assets/chikankari_suit.png',
    link: '/shop?category=Chikankari',
  },
  {
    name: 'Anarkali Sets',
    desc: 'Regal kalidars with expansive flared volume',
    image: '/assets/ivory_anarkali.png',
    link: '/shop?category=Anarkali',
  },
  {
    name: 'Heritage Sarees',
    desc: 'Handwoven Banarasi and sheer Chanderi drapes',
    image: '/assets/gold_saree.png',
    link: '/shop?category=Sarees',
  },
  {
    name: 'Festive Suits',
    desc: 'Straight-cut silk kurtas and regal shararas',
    image: '/assets/white_suit.png',
    link: '/shop?category=Suits',
  },
];

const testimonials = [
  {
    name: 'Ananya Singhania',
    city: 'New Delhi',
    rating: 5,
    text: 'The Noor Chikankari suit exceeded every expectation. The handwork is breathtakingly intricate, and the made-to-measure custom fit was impeccable. Meghna personally assisted me on WhatsApp with styling advice!',
  },
  {
    name: 'Dr. Radhika Nair',
    city: 'Bengaluru',
    rating: 5,
    text: 'Finding pure authentic handloom sarees online is rare. The Banarasi silk drape from Heritage Palate felt like an heirloom piece passed down through generations. Truly regal craftsmanship.',
  },
  {
    name: 'Simran Walia',
    city: 'London, UK',
    rating: 5,
    text: 'Ordered the Mumtaz Ivory Anarkali for my brother’s wedding in the UK. The international express shipping was smooth, and I received countless compliments on the delicate Lucknowi embroidery.',
  },
];

const instagramPosts = [
  {
    image: '/assets/hero_1.png',
    productId: 7,
    title: 'Lilac Chikankari Sharara Set',
    likes: '2.4k',
    caption: 'Soft pastels for royal festivities. Handcrafted by master craftswomen in Lucknow.',
  },
  {
    image: '/assets/red_saree.png',
    productId: 2,
    title: 'Banarasi Crimson Silk Saree',
    likes: '3.1k',
    caption: 'Pure katan silk with real silver and antique gold tested zari. A true heirloom piece.',
  },
  {
    image: '/assets/ivory_anarkali.png',
    productId: 3,
    title: 'Mumtaz Ivory Chikankari Anarkali',
    likes: '4.8k',
    caption: '32 kalis of expansive flare adorned with mukaish and badla wire embroidery.',
  },
  {
    image: '/assets/gold_saree.png',
    productId: 4,
    title: 'Gold Chanderi Tissue Saree',
    likes: '1.9k',
    caption: 'Luminous metallic luster for unforgettable soirées. Light as air, rich as heritage.',
  },
];

const Home: React.FC = () => {
  const theme = useTheme();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTab, setSelectedTab] = useState<string>('All');

  // Auto rotate hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedTab === 'All') return true;
    return p.category === selectedTab;
  });

  return (
    <Box>
      <SEOHead
        title="Timeless Handcrafted Indian Luxury Wear"
        description="Heritage Palate by Meghna celebrates timeless Indian craftsmanship. Discover handcrafted Lucknowi Chikankari, heirloom Banarasi silk sarees, and royal kalidar Anarkalis tailored with bespoke precision."
        canonical="https://heritage-palate-by-meghna.onrender.com/"
      />
      {/* Hero Carousel Section */}
      <Box
        sx={{
          minHeight: { xs: '85vh', md: '90vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          color: '#FAF8F5',
          px: 2,
          overflow: 'hidden',
        }}
      >
        {heroSlides.map((slide, index) => (
          <Box
            key={slide.image}
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("${slide.image}")`,
              backgroundPosition: 'center 20%',
              backgroundSize: 'cover',
              opacity: currentSlide === index ? 1 : 0,
              transform: currentSlide === index ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 1.2s ease-in-out, transform 8s ease-out',
              zIndex: 0,
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%), linear-gradient(to top, rgba(15,14,13,0.8) 0%, transparent 40%)',
              },
            }}
          />
        ))}

        {/* Interactive Three.js 3D Golden Silk & Zari Stardust Canvas */}
        <Hero3DCanvas mode={theme.palette.mode} />

        {/* Hero Content */}
        <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '880px', px: { xs: 2, md: 4 } }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.6,
              bgcolor: 'rgba(212, 175, 55, 0.2)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              backdropFilter: 'blur(8px)',
              mb: 3,
            }}
          >
            <SparkleIcon sx={{ color: '#D4AF37', fontSize: 16 }} />
            <Typography variant="overline" sx={{ color: '#FAF8F5', fontSize: '0.75rem', letterSpacing: '0.22em' }}>
              {heroSlides[currentSlide].tagline}
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.6rem', md: '4.8rem' },
              fontWeight: 500,
              lineHeight: 1.15,
              mb: 2.5,
              textShadow: '0 4px 24px rgba(0,0,0,0.7)',
            }}
          >
            {heroSlides[currentSlide].title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.25rem' },
              color: 'rgba(250, 248, 245, 0.9)',
              maxWidth: 680,
              mx: 'auto',
              mb: 4.5,
              fontWeight: 300,
              lineHeight: 1.6,
              textShadow: '0 2px 10px rgba(0,0,0,0.6)',
            }}
          >
            {heroSlides[currentSlide].subtitle}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
            <Button
              component={Link}
              to={heroSlides[currentSlide].primaryLink}
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#D4AF37',
                color: '#141312',
                px: 4,
                py: 1.8,
                fontWeight: 600,
                '&:hover': { bgcolor: '#F3E5AB' },
              }}
            >
              {heroSlides[currentSlide].primaryCta}
            </Button>

            {heroSlides[currentSlide].external ? (
              <Button
                component="a"
                href={heroSlides[currentSlide].secondaryLink}
                target="_blank"
                variant="outlined"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{
                  color: '#FAF8F5',
                  borderColor: 'rgba(255,255,255,0.7)',
                  px: 3.5,
                  py: 1.8,
                  backdropFilter: 'blur(4px)',
                  '&:hover': { borderColor: '#D4AF37', color: '#D4AF37', bgcolor: 'rgba(212,175,55,0.1)' },
                }}
              >
                {heroSlides[currentSlide].secondaryCta}
              </Button>
            ) : (
              <Button
                component={Link}
                to={heroSlides[currentSlide].secondaryLink}
                variant="outlined"
                size="large"
                sx={{
                  color: '#FAF8F5',
                  borderColor: 'rgba(255,255,255,0.7)',
                  px: 3.5,
                  py: 1.8,
                  backdropFilter: 'blur(4px)',
                  '&:hover': { borderColor: '#D4AF37', color: '#D4AF37', bgcolor: 'rgba(212,175,55,0.1)' },
                }}
              >
                {heroSlides[currentSlide].secondaryCta}
              </Button>
            )}
          </Stack>
        </Box>

        {/* Carousel Navigation Arrows */}
        <IconButton
          onClick={handlePrevSlide}
          aria-label="previous slide"
          sx={{
            position: 'absolute',
            left: { xs: 8, md: 24 },
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#FAF8F5',
            bgcolor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.6)', color: '#D4AF37' },
            zIndex: 3,
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>

        <IconButton
          onClick={handleNextSlide}
          aria-label="next slide"
          sx={{
            position: 'absolute',
            right: { xs: 8, md: 24 },
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#FAF8F5',
            bgcolor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.6)', color: '#D4AF37' },
            zIndex: 3,
          }}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>

        {/* Slide Indicators */}
        <Box sx={{ position: 'absolute', bottom: 24, display: 'flex', gap: 1.5, zIndex: 3 }}>
          {heroSlides.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              sx={{
                width: currentSlide === idx ? 32 : 10,
                height: 4,
                bgcolor: currentSlide === idx ? '#D4AF37' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Brand Intro Banner */}
      <Box sx={{ py: 6, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="overline" color="secondary.main" sx={{ mb: 1, display: 'block' }}>
            The Essence of Heritage Palate
          </Typography>
          <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '1.6rem', md: '2.2rem' } }}>
            Where Royal Awadh Meets Contemporary Splendor
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 780, mx: 'auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
            Founded by designer Meghna, Heritage Palate is a celebration of artisanal slow fashion. Every weave, knot, and needle-stroke honors hundreds of years of craftsmanship passed through generational families in Lucknow and Varanasi.
          </Typography>
        </Container>
      </Box>

      {/* Shop By Category Showcase */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" color="secondary.main">
            Curated Categories
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, mb: 1.5 }}>
            Signature Collections
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Explore artisanal edits hand-embroidered on pure silk, organza, and mulmul fabrics.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={cat.name}>
              <Box
                component={Link}
                to={cat.link}
                sx={{
                  display: 'block',
                  position: 'relative',
                  height: { xs: 380, md: 460 },
                  overflow: 'hidden',
                  textDecoration: 'none',
                  group: 'true',
                  '&:hover img': {
                    transform: 'scale(1.08)',
                  },
                  '&:hover .overlay': {
                    bgcolor: 'rgba(0,0,0,0.45)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={cat.image}
                  alt={cat.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.3)',
                    transition: 'background-color 0.4s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 3,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#FAF8F5', mb: 0.5 }}>
                    {cat.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.78rem', mb: 2 }}>
                    {cat.desc}
                  </Typography>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: '#D4AF37' }}>
                    <Typography variant="button" sx={{ fontSize: '0.75rem', letterSpacing: '0.12em' }}>
                      Explore Pieces
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Pieces / New Arrivals with Category Tabs */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 }, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-end' }, mb: 5, gap: 2 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="overline" color="secondary.main">
                New Arrivals
              </Typography>
              <Typography variant="h2" sx={{ mt: 0.5 }}>
                Masterpiece Creations
              </Typography>
            </Box>

            {/* Filter Tabs */}
            <Tabs
              value={selectedTab}
              onChange={(_, val) => setSelectedTab(val)}
              variant="scrollable"
              scrollButtons={false}
              sx={{
                maxWidth: '100%',
                '& .MuiTabs-scroller': {
                  overflowX: 'auto !important',
                  px: { xs: 1.5, sm: 0 },
                },
                '& .MuiTabs-flexContainer': {
                  gap: { xs: 0.5, sm: 1 },
                },
                '& .MuiTabs-indicator': { bgcolor: 'secondary.main', height: 2 },
                '& .MuiTab-root': {
                  letterSpacing: '0.1em',
                  fontSize: { xs: '0.78rem', md: '0.84rem' },
                  fontWeight: 500,
                  minWidth: { xs: 60, md: 80 },
                  px: { xs: 1.5, md: 2 },
                  py: 1,
                  textTransform: 'uppercase',
                  '&.Mui-selected': { color: 'secondary.main', fontWeight: 600 },
                },
              }}
            >
              {['All', 'Chikankari', 'Anarkali', 'Sarees', 'Suits'].map((tab) => (
                <Tab key={tab} label={tab} value={tab} />
              ))}
            </Tabs>
          </Box>

          <Grid container spacing={3.5}>
            {filteredProducts.slice(0, 8).map((product) => {
              const inWish = isInWishlist(product.id);

              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                  <Card
                    elevation={0}
                    sx={{
                      bgcolor: 'transparent',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      '&:hover .quick-add': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    {/* Media Container */}
                    <Box sx={{ position: 'relative', pt: '135%', overflow: 'hidden', bgcolor: 'background.default' }}>
                      <Box
                        component={Link}
                        to={`/product/${product.id}`}
                        sx={{ position: 'absolute', inset: 0 }}
                      >
                        <CardMedia
                          component="img"
                          image={product.image}
                          alt={product.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.6s ease',
                            '&:hover': { transform: 'scale(1.06)' },
                          }}
                        />
                      </Box>

                      {/* Badges */}
                      <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 0.5, zIndex: 2 }}>
                        {product.bestseller && (
                          <Chip
                            label="Bestseller"
                            size="small"
                            sx={{
                              bgcolor: '#141312',
                              color: '#D4AF37',
                              borderRadius: 0,
                              fontWeight: 600,
                              fontSize: '0.65rem',
                              letterSpacing: '0.08em',
                              height: 22,
                            }}
                          />
                        )}
                        {product.isNew && (
                          <Chip
                            label="New Season"
                            size="small"
                            sx={{
                              bgcolor: 'secondary.main',
                              color: '#FAF8F5',
                              borderRadius: 0,
                              fontWeight: 600,
                              fontSize: '0.65rem',
                              letterSpacing: '0.08em',
                              height: 22,
                            }}
                          />
                        )}
                      </Box>

                      {/* Wishlist Button */}
                      <IconButton
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="save to wishlist"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          bgcolor: 'rgba(255, 255, 255, 0.85)',
                          backdropFilter: 'blur(4px)',
                          color: inWish ? '#D32F2F' : '#141312',
                          '&:hover': { bgcolor: '#FFFFFF', color: '#D32F2F' },
                          zIndex: 2,
                        }}
                      >
                        {inWish ? <FavoriteIcon fontSize="small" /> : <WishlistIcon fontSize="small" />}
                      </IconButton>

                      {/* Quick Add To Bag on Desktop Hover */}
                      <Box
                        className="quick-add"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: 1.5,
                          bgcolor: 'rgba(20, 19, 18, 0.85)',
                          backdropFilter: 'blur(6px)',
                          opacity: { xs: 1, md: 0 },
                          transform: { xs: 'none', md: 'translateY(100%)' },
                          transition: 'all 0.3s ease',
                          zIndex: 2,
                        }}
                      >
                        <Button
                          fullWidth
                          size="small"
                          variant="contained"
                          startIcon={<BagIcon fontSize="small" />}
                          onClick={() => addToCart(product, product.sizes[0] || 'M')}
                          sx={{
                            bgcolor: '#D4AF37',
                            color: '#141312',
                            py: 1,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            '&:hover': { bgcolor: '#F3E5AB' },
                          }}
                        >
                          Quick Add to Bag
                        </Button>
                      </Box>
                    </Box>

                    {/* Content Details */}
                    <CardContent sx={{ px: 1, pt: 2, pb: 1, textAlign: 'left', flexGrow: 1 }}>
                      <Typography variant="caption" color="secondary.main" sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 0.5 }}>
                        {product.category} • {product.fabric.split(' ')[0]}
                      </Typography>

                      <Typography
                        component={Link}
                        to={`/product/${product.id}`}
                        variant="subtitle1"
                        sx={{
                          textDecoration: 'none',
                          color: 'text.primary',
                          fontWeight: 500,
                          fontSize: '1rem',
                          lineHeight: 1.35,
                          display: 'block',
                          mb: 1,
                          '&:hover': { color: 'secondary.main' },
                        }}
                      >
                        {product.name}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </Typography>
                        {product.originalPrice && (
                          <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary', fontSize: '0.85rem' }}>
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button
              component={Link}
              to="/shop"
              variant="outlined"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Explore All Handcrafted Creations
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Atelier Story Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 14 } }}>
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative', pr: { md: 4 } }}>
              <Box
                component="img"
                src="/assets/chikankari_suit.png"
                alt="Meghna Artisanal Crafting"
                sx={{
                  width: '100%',
                  maxHeight: 560,
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -24,
                  right: { xs: 12, md: 0 },
                  bgcolor: 'background.paper',
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  maxWidth: 240,
                  display: { xs: 'none', sm: 'block' },
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
              >
                <Typography variant="h6" sx={{ fontFamily: 'Playfair Display, serif', color: 'secondary.main' }}>
                  Over 120 Hours
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Dedicated by our master craftswomen to each Chikankari anarkali.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ pl: { md: 2 } }}>
              <Typography variant="overline" color="secondary.main">
                The Atelier Philosophy
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                Handcrafted with Love, Rooted in Indian Heritage
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.8 }}>
                At Heritage Palate, every outfit is conceived as wearable poetry. We work directly with master craftswomen in the historic mohallas of Lucknow and handloom weavers across Varanasi, preserving the endangered art of authentic 32-stitch Chikankari and kadhwa zari weaving.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                No mass machinery, no synthetic compromises. Each piece is hand-stamped with wooden blocks, intricately stitched with silken resham threads, and tailored to your specific measurements for a flattering, bespoke drape.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={Link}
                  to="/craft"
                  variant="contained"
                  color="primary"
                  sx={{ py: 1.5, px: 3.5 }}
                >
                  Discover The Craft
                </Button>
                <Button
                  component={Link}
                  to="/about"
                  variant="outlined"
                  color="primary"
                  sx={{ py: 1.5, px: 3.5 }}
                >
                  Read Meghna&rsquo;s Story
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Client Testimonials Carousel */}
      <Box sx={{ bgcolor: theme.palette.mode === 'light' ? 'rgba(156, 122, 74, 0.05)' : 'rgba(212, 175, 55, 0.04)', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <QuoteIcon sx={{ fontSize: 48, color: 'secondary.main', opacity: 0.5, mb: 1 }} />
          <Typography variant="overline" color="secondary.main" sx={{ display: 'block' }}>
            Words of Love
          </Typography>
          <Typography variant="h2" sx={{ mt: 0.5, mb: 6 }}>
            Patrons Across The Globe
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((item, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <Box
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    textAlign: 'left',
                  }}
                >
                  <Box>
                    <Rating value={item.rating} readOnly size="small" sx={{ mb: 2, color: 'secondary.main' }} />
                    <Typography variant="body2" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 3, fontStyle: 'italic' }}>
                      &ldquo;{item.text}&rdquo;
                    </Typography>
                  </Box>
                  <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.city}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Instagram Community & Shop The Feed Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'secondary.main', mb: 1 }}>
            <InstagramIcon sx={{ fontSize: 22 }} />
            <Typography variant="overline" sx={{ letterSpacing: '0.2em', fontWeight: 600 }}>
              @heritagepalatebymeghna
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ mt: 0.5, mb: 1.5 }}>
            As Seen on Instagram
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto', mb: 3 }}>
            Discover how real patrons, brides, and style icons drape our handcrafted creations across the world.
          </Typography>
          <Button
            component="a"
            href="https://www.instagram.com/heritagepalatebymeghna/"
            target="_blank"
            variant="outlined"
            size="small"
            startIcon={<InstagramIcon />}
            sx={{ px: 3, py: 1, letterSpacing: '0.1em' }}
          >
            Follow on Instagram ↗
          </Button>
        </Box>

        <Grid container spacing={3}>
          {instagramPosts.map((post, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
              <Box
                component={Link}
                to={`/product/${post.productId}`}
                sx={{
                  display: 'block',
                  position: 'relative',
                  pt: '125%',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: '#FAF8F5',
                  group: 'true',
                  '&:hover img': { transform: 'scale(1.08)' },
                  '&:hover .insta-overlay': { opacity: 1 },
                }}
              >
                <Box
                  component="img"
                  src={post.image}
                  alt={post.title}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                />
                <Box
                  className="insta-overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(20, 19, 18, 0.85)',
                    backdropFilter: 'blur(4px)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <InstagramIcon sx={{ color: '#D4AF37' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em' }}>
                      ♥ {post.likes}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#FAF8F5', mb: 0.5 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#A0988E', display: 'block', mb: 2, lineHeight: 1.4 }}>
                      {post.caption}
                    </Typography>
                    <Typography variant="button" sx={{ color: '#D4AF37', fontSize: '0.72rem', letterSpacing: '0.12em' }}>
                      Shop This Piece ↗
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* WhatsApp Personal Concierge Banner */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 10 } }}>
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            bgcolor: theme.palette.mode === 'light' ? '#141312' : '#1A1816',
            color: '#FAF8F5',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box sx={{ maxWidth: 640 }}>
            <Typography variant="overline" sx={{ color: '#D4AF37', letterSpacing: '0.2em' }}>
              Personal Boutique Styling
            </Typography>
            <Typography variant="h3" sx={{ color: '#FAF8F5', mt: 1, mb: 1.5, fontFamily: 'Playfair Display, serif' }}>
              Have Questions or Need Bespoke Fitting?
            </Typography>
            <Typography variant="body2" sx={{ color: '#ABA49A', lineHeight: 1.7 }}>
              Connect directly with designer Meghna on WhatsApp for fabric video consultations, custom measurement guidance, and personalized styling recommendations for your special occasions.
            </Typography>
          </Box>

          <Button
            component="a"
            href="https://wa.me/917303466990?text=Hi%20Meghna!%20I%20would%20love%20a%20personal%20styling%20consultation%20for%20an%20upcoming%20occasion."
            target="_blank"
            variant="contained"
            size="large"
            startIcon={<WhatsAppIcon />}
            sx={{
              bgcolor: '#128C7E',
              color: '#FFFFFF',
              px: 4,
              py: 2,
              fontWeight: 600,
              flexShrink: 0,
              '&:hover': { bgcolor: '#075E54' },
            }}
          >
            Chat with Meghna
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
