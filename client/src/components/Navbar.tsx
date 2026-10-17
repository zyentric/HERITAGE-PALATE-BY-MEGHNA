import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Button,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Badge,
  Tooltip,
  Paper,
  Grid,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  FavoriteBorder as WishlistIcon,
  ShoppingBagOutlined as CartIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Close as CloseIcon,
  LocalShippingOutlined as OrdersIcon,
  WhatsApp as WhatsAppIcon,
  Instagram as InstagramIcon,
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as SparkleIcon,
} from '@mui/icons-material';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ColorModeContext } from '../theme/ThemeContext';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const colorMode = useContext(ColorModeContext);
  const { cartCount, cartTotal, wishlist, orders, setIsCartOpen, setIsWishlistOpen, setIsSearchOpen } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dynamic Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMouseEnter = (menuName: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const isDark = theme.palette.mode === 'dark';

  // Mega Menu Data
  const megaMenuData: Record<string, {
    title: string;
    subtitle: string;
    columns: { heading: string; links: { label: string; to: string; badge?: string }[] }[];
    featured?: { title: string; desc: string; link: string; btnText: string };
  }> = {
    shop: {
      title: 'Handcrafted Atelier Catalog',
      subtitle: 'Slow artisanal couture woven on traditional pit-looms',
      columns: [
        {
          heading: 'Signature Silhouettes',
          links: [
            { label: 'Lucknowi Chikankari', to: '/shop?category=Chikankari', badge: 'Artisan' },
            { label: 'Royal Kalidar Anarkalis', to: '/shop?category=Anarkalis', badge: '32-Kali' },
            { label: 'Heritage Varanasi Sarees', to: '/shop?category=Sarees' },
            { label: 'Festive Kurta & Suit Sets', to: '/shop?category=Suits' },
          ],
        },
        {
          heading: 'Artisan Craft & Fabrics',
          links: [
            { label: 'Mulmul Chanderi Weaves', to: '/shop?fabric=Chanderi' },
            { label: 'Pure Organza & Tissue', to: '/shop?fabric=Organza' },
            { label: 'Zari & Mukaish Needlework', to: '/shop?craft=Zari' },
            { label: 'View All Handlooms', to: '/shop' },
          ],
        },
      ],
      featured: {
        title: 'Bespoke Custom Tailoring',
        desc: 'Share your bust, waist & height measurements for a couture fit hand-tailored by master darzis.',
        link: '/product/1',
        btnText: 'Explore Bespoke Sizing',
      },
    },
    collections: {
      title: 'Haute Couture Chapters',
      subtitle: 'Thematic seasonal narratives celebrating indigenous heritage',
      columns: [
        {
          heading: '2026 Collection Series',
          links: [
            { label: 'Chapter I: Awadh Noor (Chikankari)', to: '/collections#chapter-1', badge: 'Iconic' },
            { label: 'Chapter II: Zari & Mukaish Festive', to: '/collections#chapter-2' },
            { label: 'Chapter III: Royal Kalidar Grandeur', to: '/collections#chapter-3' },
            { label: 'Chapter IV: Varanasi Katan Silks', to: '/collections#chapter-4' },
          ],
        },
        {
          heading: 'Curated Lookbooks',
          links: [
            { label: 'Intimate Wedding Trousseau', to: '/shop' },
            { label: 'Summer Soirée Whites', to: '/shop?category=Chikankari' },
            { label: 'Royalty & Velvet Evenings', to: '/shop?category=Suits' },
            { label: 'Full Collection Gallery', to: '/collections' },
          ],
        },
      ],
      featured: {
        title: 'The Noor Lookbook',
        desc: 'Inspired by Awadhi architecture and courtly poetry, hand-stitched over 180 Karigar hours.',
        link: '/collections',
        btnText: 'View Collections',
      },
    },
    craft: {
      title: 'Our Craft & Handloom Heritage',
      subtitle: 'Honoring centuries of textile artistry passed through karigar families',
      columns: [
        {
          heading: 'The Awadhi Embroidery',
          links: [
            { label: '32-Stitch Master Lexicon', to: '/craft#stitches', badge: 'Heritage' },
            { label: 'Phanda, Murri & Tepchi Craft', to: '/craft#stitches' },
            { label: 'Zari Metallic Inlay Technique', to: '/craft#steps' },
            { label: 'Slow Handloom Lifecycle', to: '/craft#steps' },
          ],
        },
        {
          heading: 'Artisan Community',
          links: [
            { label: '450+ Master Karigar Guilds', to: '/craft' },
            { label: 'Fair Living Wage Pledge', to: '/craft' },
            { label: 'Natural Dyes & Pure Silk', to: '/craft' },
            { label: 'Read Craft Manifesto', to: '/craft' },
          ],
        },
      ],
      featured: {
        title: 'Slow Fashion Commitment',
        desc: 'Zero synthetic fibers. Every thread is mulberry silk or organic mulmul, crafted in small conscious batches.',
        link: '/craft',
        btnText: 'Read The Craft Journey',
      },
    },
    story: {
      title: 'The Story of Heritage Palate',
      subtitle: 'Founded by Meghna to preserve living Indian handlooms for the modern world',
      columns: [
        {
          heading: 'Atelier Philosophy',
          links: [
            { label: "Letter from Meghna", to: '/about#letter', badge: 'Founder' },
            { label: 'The Handloom Lover’s Space', to: '/about' },
            { label: 'Generational Karigars', to: '/about' },
            { label: 'Client Testimonials', to: '/about' },
          ],
        },
        {
          heading: 'Community & Culture',
          links: [
            { label: 'Instagram Journal (@heritagepalatebymeghna)', to: 'https://www.instagram.com/heritagepalatebymeghna/' },
            { label: 'Awadhi Cultural Archive', to: '/about' },
            { label: 'Sustainable Slow Living', to: '/about' },
            { label: 'Visit Delhi Atelier', to: '/contact' },
          ],
        },
      ],
      featured: {
        title: 'Honoring Every Weave',
        desc: 'A space for true handloom lovers. Honoring the art, culture and stories behind every weave.',
        link: '/about',
        btnText: 'Explore Meghna’s Story',
      },
    },
    concierge: {
      title: 'Personal Atelier Concierge',
      subtitle: 'Direct one-on-one styling consultation with Meghna and our master drapers',
      columns: [
        {
          heading: 'Direct Assistance',
          links: [
            { label: 'WhatsApp Helpline (+91 73034 66990)', to: 'https://wa.me/917303466990', badge: 'Instant' },
            { label: 'Bespoke Size Consultation', to: '/contact' },
            { label: 'Track My Orders', to: '/orders' },
            { label: 'Worldwide Insured Courier', to: '/contact' },
          ],
        },
        {
          heading: 'Client Services',
          links: [
            { label: 'Complimentary Alterations', to: '/contact' },
            { label: 'Bridal & Trousseau Curation', to: '/contact' },
            { label: 'Care & Preservation Advice', to: '/craft' },
            { label: 'Send Styling Inquiry', to: '/contact' },
          ],
        },
      ],
      featured: {
        title: 'Direct WhatsApp Concierge',
        desc: 'Chat directly with designer Meghna for fabric recommendations, custom fits, and order confirmations.',
        link: 'https://wa.me/917303466990',
        btnText: 'Open WhatsApp Chat ↗',
      },
    },
  };

  const navItems = [
    { key: 'shop', title: 'Shop All', path: '/shop' },
    { key: 'collections', title: 'Collections', path: '/collections' },
    { key: 'craft', title: 'Our Craft', path: '/craft' },
    { key: 'story', title: 'The Story', path: '/about' },
    { key: 'concierge', title: 'Concierge Care', path: '/contact' },
  ];

  return (
    <>
      {/* ---------------- 1. TOP ANNOUNCEMENT TICKER ---------------- */}
      <Box
        sx={{
          bgcolor: isDark ? '#0c0b0a' : '#141312',
          color: '#FAF8F5',
          height: scrolled ? 0 : { xs: 32, md: 36 },
          overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: scrolled ? 0 : 1,
          px: { xs: 1.5, md: 4 },
          display: 'flex',
          justifyContent: { xs: 'center', md: 'space-between' },
          alignItems: 'center',
          fontSize: { xs: '0.68rem', md: '0.72rem' },
          letterSpacing: '0.08em',
          borderBottom: '1px solid rgba(212, 175, 55, 0.22)',
          zIndex: theme.zIndex.appBar + 1,
          position: 'relative',
        }}
      >
        {/* Desktop Left: Verified Instagram Bio */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: '#D4AF37',
              letterSpacing: '0.06em',
              fontWeight: 500,
              fontSize: '0.72rem',
            }}
          >
            &ldquo;A space for true handloom lovers ✨ Honoring the art behind every weave 💕&rdquo;
          </Typography>
        </Box>

        {/* Mobile View: Single Tap Action */}
        <Box
          component="a"
          href="https://wa.me/917303466990?text=Hi%20Meghna!%20I%20am%20chatting%20from%20the%20website%20announcement%20bar."
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            gap: 0.8,
            color: '#FAF8F5',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontSize: '0.7rem',
          }}
        >
          <Box component="span" sx={{ color: '#D4AF37', fontWeight: 600 }}>
            Handcrafted Indian Luxury
          </Box>
          <Box component="span" sx={{ opacity: 0.5 }}>•</Box>
          <WhatsAppIcon sx={{ fontSize: 13, color: '#25D366' }} />
          <Box component="span" sx={{ color: '#25D366', fontWeight: 600 }}>
            +91 73034 66990
          </Box>
        </Box>

        {/* Desktop Right: Handles */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2.5 }}>
          <Box
            component="a"
            href="https://www.instagram.com/heritagepalatebymeghna/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.6,
              color: '#FAF8F5',
              textDecoration: 'none',
              fontSize: '0.72rem',
              transition: 'color 0.2s',
              '&:hover': { color: '#D4AF37' },
            }}
          >
            <InstagramIcon sx={{ fontSize: 14, color: '#D4AF37' }} />
            <span>@heritagepalatebymeghna</span>
          </Box>

          <Box sx={{ width: '1px', height: 14, bgcolor: 'rgba(255,255,255,0.2)' }} />

          <Box
            component="a"
            href="https://wa.me/917303466990?text=Hi%20Meghna!%20I%20am%20chatting%20from%20the%20website%20header."
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.6,
              color: '#25D366',
              textDecoration: 'none',
              fontSize: '0.72rem',
              fontWeight: 600,
              '&:hover': { opacity: 0.85 },
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 14 }} />
            <span>+91 73034 66990</span>
          </Box>
        </Box>
      </Box>

      {/* ---------------- 2. MAIN HAUTE-COUTURE APPBAR ---------------- */}
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          top: 0,
          zIndex: theme.zIndex.appBar,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          px: { xs: scrolled ? 1 : 0, md: scrolled ? 3 : 0 },
          py: scrolled ? { xs: 0.8, md: 1 } : 0,
          bgcolor: 'transparent',
        }}
      >
        <Container
          maxWidth={scrolled ? 'lg' : false}
          disableGutters={!scrolled}
          sx={{
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            px: { xs: 0, md: scrolled ? 0 : 0 },
          }}
        >
          {/* Main Card Wrapper */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: scrolled ? { xs: '16px', md: '50px' } : 0,
              bgcolor: scrolled
                ? isDark
                  ? 'rgba(18, 16, 14, 0.94)'
                  : 'rgba(255, 255, 255, 0.96)'
                : isDark
                ? 'rgba(15, 14, 13, 0.90)'
                : 'rgba(252, 250, 248, 0.95)',
              backdropFilter: 'blur(30px) saturate(200%)',
              border: scrolled
                ? `1px solid ${isDark ? 'rgba(212, 175, 55, 0.38)' : 'rgba(156, 122, 74, 0.28)'}`
                : `1px solid ${theme.palette.divider}`,
              borderTop: 'none',
              boxShadow: scrolled
                ? isDark
                  ? '0 16px 40px rgba(0,0,0,0.6), 0 0 20px rgba(212, 175, 55, 0.12)'
                  : '0 14px 36px rgba(0,0,0,0.08), 0 0 20px rgba(156, 122, 74, 0.08)'
                : 'none',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
            }}
          >
            {/* ---------------- TIER 1: BRAND MAJESTY & CORE ACTIONS ---------------- */}
            <Toolbar
              disableGutters
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: scrolled ? { xs: 54, md: 58 } : { xs: 60, md: 74 },
                px: { xs: 1.5, sm: 2.5, md: 4 },
                transition: 'min-height 0.35s ease',
              }}
            >
              {/* --- LEFT SECTION (with Vertical Dandi Lines) --- */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: { xs: 0.5, md: 1.8 },
                }}
              >
                {/* Mobile Menu Hamburger */}
                <IconButton
                  size="small"
                  aria-label="open navigation menu"
                  color="inherit"
                  onClick={handleDrawerToggle}
                  sx={{
                    display: { xs: 'inline-flex', md: scrolled ? 'inline-flex' : 'none' },
                    p: 0.8,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '8px',
                  }}
                >
                  <MenuIcon sx={{ fontSize: 20 }} />
                </IconButton>

                {/* Desktop Initial: Verified Helpline with Vertical Dandi */}
                {!scrolled && (
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.8 }}>
                    <Box
                      component="a"
                      href="https://wa.me/917303466990?text=Hello%20Meghna!%20I%20would%20like%20to%20inquire%20about%20a%20handcrafted%20piece."
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        fontSize: '0.74rem',
                        letterSpacing: '0.06em',
                        transition: 'color 0.2s',
                        '&:hover': { color: 'secondary.main' },
                      }}
                    >
                      <WhatsAppIcon sx={{ fontSize: 16, color: '#25D366' }} />
                      <span>WhatsApp Concierge</span>
                    </Box>

                    {/* Vertical Dandi Line */}
                    <Box sx={{ width: '1px', height: 18, bgcolor: 'divider' }} />

                    <Box
                      component="a"
                      href="https://www.instagram.com/heritagepalatebymeghna/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.6,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        fontSize: '0.74rem',
                        letterSpacing: '0.06em',
                        transition: 'color 0.2s',
                        '&:hover': { color: 'secondary.main' },
                      }}
                    >
                      <InstagramIcon sx={{ fontSize: 15, color: '#D4AF37' }} />
                      <span>@heritagepalatebymeghna</span>
                    </Box>
                  </Box>
                )}

                {/* Desktop Scrolled: Mini Direct Nav Links */}
                {scrolled && (
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2.2 }}>
                    <Button
                      component={NavLink}
                      to="/shop"
                      sx={{
                        color: 'text.primary',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        p: 0,
                        minWidth: 'auto',
                        '&.active': { color: 'secondary.main' },
                        '&:hover': { bgcolor: 'transparent', color: 'secondary.main' },
                      }}
                    >
                      Shop
                    </Button>
                    <Button
                      component={NavLink}
                      to="/collections"
                      sx={{
                        color: 'text.primary',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        p: 0,
                        minWidth: 'auto',
                        '&.active': { color: 'secondary.main' },
                        '&:hover': { bgcolor: 'transparent', color: 'secondary.main' },
                      }}
                    >
                      Collections
                    </Button>
                    <Button
                      component={NavLink}
                      to="/craft"
                      sx={{
                        color: 'text.primary',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        p: 0,
                        minWidth: 'auto',
                        '&.active': { color: 'secondary.main' },
                        '&:hover': { bgcolor: 'transparent', color: 'secondary.main' },
                      }}
                    >
                      Craft
                    </Button>
                  </Box>
                )}
              </Box>

              {/* --- EXACT CENTER: REGAL ATELIER IDENTITY --- */}
              <Box
                component={Link}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: { xs: 1, sm: 1.5 },
                  textDecoration: 'none',
                  color: 'inherit',
                  flexShrink: 0,
                  textAlign: 'center',
                  mx: 'auto',
                  transition: 'transform 0.25s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                {/* Official Regal Atelier Emblem */}
                <Box
                  component="img"
                  src="/assets/hpm_emblem_hd.png"
                  alt="Heritage Palate by Meghna Insignia"
                  sx={{
                    width: scrolled ? { xs: 32, md: 38 } : { xs: 38, md: 48 },
                    height: scrolled ? { xs: 32, md: 38 } : { xs: 38, md: 48 },
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #D4AF37',
                    boxShadow: '0 2px 12px rgba(212, 175, 55, 0.28)',
                    transition: 'all 0.35s ease',
                    flexShrink: 0,
                  }}
                />

                {/* Haute Couture Wordmark */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontFamily: 'Playfair Display, Georgia, serif',
                      fontWeight: 600,
                      letterSpacing: { xs: '0.14em', md: '0.2em' },
                      color: 'text.primary',
                      lineHeight: 1.1,
                      fontSize: scrolled
                        ? { xs: '0.86rem', sm: '1rem', md: '1.14rem' }
                        : { xs: '0.94rem', sm: '1.15rem', md: '1.38rem' },
                      transition: 'all 0.35s ease',
                    }}
                  >
                    HERITAGE PALATE
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      letterSpacing: { xs: '0.22em', md: '0.34em' },
                      color: 'secondary.main',
                      fontSize: scrolled
                        ? { xs: '0.48rem', md: '0.55rem' }
                        : { xs: '0.52rem', md: '0.62rem' },
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      lineHeight: 1,
                      mt: 0.3,
                      transition: 'all 0.35s ease',
                    }}
                  >
                    BY MEGHNA
                  </Typography>
                </Box>
              </Box>

              {/* --- RIGHT SECTION (with Vertical Dandi Lines) --- */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: { xs: 0.6, sm: 1 },
                }}
              >
                {/* Search Trigger */}
                <Tooltip title="Search Catalog">
                  <IconButton
                    color="inherit"
                    aria-label="search catalog"
                    onClick={() => setIsSearchOpen(true)}
                    size="small"
                    sx={{ p: { xs: 0.6, sm: 0.8 } }}
                  >
                    <SearchIcon sx={{ fontSize: { xs: 19, sm: 20 } }} />
                  </IconButton>
                </Tooltip>

                {/* Vertical Dandi (Desktop) */}
                <Box sx={{ display: { xs: 'none', md: 'block' }, width: '1px', height: 16, bgcolor: 'divider' }} />

                {/* Theme Mode Toggle (Desktop) */}
                <Tooltip title={isDark ? 'Switch to Light Atmosphere' : 'Switch to Dark Atmosphere'}>
                  <IconButton
                    onClick={colorMode.toggleColorMode}
                    color="inherit"
                    size="small"
                    aria-label="toggle mode"
                    sx={{ display: { xs: 'none', md: 'inline-flex' }, p: 0.8 }}
                  >
                    {isDark ? (
                      <LightModeIcon sx={{ fontSize: 19, color: 'secondary.main' }} />
                    ) : (
                      <DarkModeIcon sx={{ fontSize: 19 }} />
                    )}
                  </IconButton>
                </Tooltip>

                {/* Vertical Dandi (Desktop) */}
                <Box sx={{ display: { xs: 'none', md: 'block' }, width: '1px', height: 16, bgcolor: 'divider' }} />

                {/* Saved Wishlist */}
                <Tooltip title="Saved Wishlist">
                  <IconButton
                    color="inherit"
                    aria-label="saved wishlist"
                    onClick={() => setIsWishlistOpen(true)}
                    size="small"
                    sx={{ p: { xs: 0.6, sm: 0.8 } }}
                  >
                    <Badge
                      badgeContent={wishlist.length}
                      color="secondary"
                      sx={{ '& .MuiBadge-badge': { fontSize: '0.62rem', height: 16, minWidth: 16 } }}
                    >
                      <WishlistIcon sx={{ fontSize: { xs: 19, sm: 20 } }} />
                    </Badge>
                  </IconButton>
                </Tooltip>

                {/* Vertical Dandi (Desktop) */}
                <Box sx={{ display: { xs: 'none', md: 'block' }, width: '1px', height: 16, bgcolor: 'divider' }} />

                {/* Order Tracking (Desktop) */}
                <Tooltip title="My Orders & Tracking">
                  <IconButton
                    component={Link}
                    to="/orders"
                    color="inherit"
                    aria-label="track atelier orders"
                    size="small"
                    sx={{ display: { xs: 'none', md: 'inline-flex' }, p: 0.8 }}
                  >
                    <Badge
                      badgeContent={orders.length}
                      color="secondary"
                      sx={{ '& .MuiBadge-badge': { fontSize: '0.62rem', height: 16, minWidth: 16 } }}
                    >
                      <OrdersIcon sx={{ fontSize: 20 }} />
                    </Badge>
                  </IconButton>
                </Tooltip>

                {/* Vertical Dandi (Desktop) */}
                <Box sx={{ display: { xs: 'none', md: 'block' }, width: '1px', height: 16, bgcolor: 'divider' }} />

                {/* Mobile Shopping Bag (Clean matching icon without circle border) */}
                <Tooltip title="Shopping Bag">
                  <IconButton
                    color="inherit"
                    aria-label="shopping bag"
                    onClick={() => setIsCartOpen(true)}
                    size="small"
                    sx={{
                      display: { xs: 'inline-flex', sm: 'none' },
                      p: { xs: 0.6, sm: 0.8 },
                    }}
                  >
                    <Badge
                      badgeContent={cartCount}
                      color="secondary"
                      sx={{ '& .MuiBadge-badge': { fontSize: '0.62rem', height: 16, minWidth: 16 } }}
                    >
                      <CartIcon sx={{ fontSize: { xs: 20, sm: 21 } }} />
                    </Badge>
                  </IconButton>
                </Tooltip>

                {/* Desktop Shopping Bag Pill */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setIsCartOpen(true)}
                  startIcon={
                    <Badge
                      badgeContent={cartCount}
                      color="secondary"
                      sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', height: 16, minWidth: 16 } }}
                    >
                      <CartIcon sx={{ fontSize: 19 }} />
                    </Badge>
                  }
                  sx={{
                    display: { xs: 'none', sm: 'inline-flex' },
                    ml: 0.5,
                    py: 0.6,
                    px: 1.8,
                    borderRadius: '30px',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    borderColor: isDark ? 'rgba(212, 175, 55, 0.45)' : 'rgba(156, 122, 74, 0.35)',
                    bgcolor: isDark ? 'rgba(212, 175, 55, 0.08)' : 'rgba(156, 122, 74, 0.06)',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  {cartTotal > 0 ? `₹${cartTotal.toLocaleString('en-IN')}` : 'Bag'}
                </Button>
              </Box>
            </Toolbar>

            {/* ---------------- TIER 2: GRAND NAVIGATION RAIL WITH HOVER MEGA-MENUS ---------------- */}
            {!scrolled && (
              <Box
                onMouseLeave={handleMouseLeave}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 1.2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  bgcolor: isDark ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.02)',
                  position: 'relative',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 3.5, lg: 5 } }}>
                  {navItems.map((item, index) => {
                    const isCurrentRoute =
                      location.pathname === item.path ||
                      (item.path !== '/' && location.pathname.startsWith(item.path));
                    const showUnderline = activeMenu ? activeMenu === item.key : isCurrentRoute;
                    const isHighlighted = activeMenu ? activeMenu === item.key : isCurrentRoute;

                    return (
                      <React.Fragment key={item.key}>
                        <Box
                          onMouseEnter={() => handleMouseEnter(item.key)}
                          sx={{ position: 'relative', display: 'inline-block' }}
                        >
                          <Button
                            component={Link}
                            to={item.path}
                            onClick={() => setActiveMenu(null)}
                            sx={{
                              color: isHighlighted ? 'secondary.main' : 'text.primary',
                              fontWeight: isHighlighted ? 600 : 500,
                              letterSpacing: '0.16em',
                              fontSize: '0.8rem',
                              textTransform: 'uppercase',
                              whiteSpace: 'nowrap',
                              p: 0,
                              position: 'relative',
                              transition: 'color 0.2s ease',
                              '&:hover': {
                                bgcolor: 'transparent',
                                color: 'secondary.main',
                              },
                            }}
                          >
                            {item.title}
                            <Box
                              sx={{
                                position: 'absolute',
                                bottom: -4,
                                left: 0,
                                right: 0,
                                height: '2px',
                                backgroundColor: 'secondary.main',
                                transform: showUnderline ? 'scaleX(1)' : 'scaleX(0)',
                                transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                                transformOrigin: 'center',
                                borderRadius: '1px',
                              }}
                            />
                          </Button>
                        </Box>

                        {index < navItems.length - 1 && (
                          <Box component="span" sx={{ color: 'secondary.main', opacity: 0.35, fontSize: '0.7rem' }}>
                            •
                          </Box>
                        )}
                      </React.Fragment>
                    );
                  })}
                </Box>

                {/* ---------------- HOVER MEGA-MENU DROPDOWN CARD ---------------- */}
                {activeMenu && megaMenuData[activeMenu] && (
                  <Paper
                    elevation={12}
                    onMouseEnter={() => handleMouseEnter(activeMenu)}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      zIndex: theme.zIndex.modal,
                      bgcolor: isDark ? 'rgba(18, 16, 14, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(32px) saturate(200%)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(156, 122, 74, 0.25)',
                      borderTop: 'none',
                      boxShadow: isDark
                        ? '0 24px 48px rgba(0,0,0,0.7), 0 0 20px rgba(212, 175, 55, 0.1)'
                        : '0 20px 44px rgba(0,0,0,0.1), 0 0 20px rgba(156, 122, 74, 0.08)',
                      py: 4,
                      px: { md: 6, lg: 8 },
                      animation: 'fadeInSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      '@keyframes fadeInSlide': {
                        from: { opacity: 0, transform: 'translateY(-8px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                    }}
                  >
                    <Container maxWidth="lg" disableGutters>
                      {/* Mega Menu Top Intro */}
                      <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <Box>
                          <Typography
                            variant="overline"
                            sx={{ color: 'secondary.main', letterSpacing: '0.2em', fontWeight: 600, fontSize: '0.72rem' }}
                          >
                            HERITAGE PALATE CURATION
                          </Typography>
                          <Typography variant="h5" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, mt: 0.5 }}>
                            {megaMenuData[activeMenu].title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                            {megaMenuData[activeMenu].subtitle}
                          </Typography>
                        </Box>
                        <Button
                          component={Link}
                          to={navItems.find((n) => n.key === activeMenu)?.path || '/shop'}
                          onClick={() => setActiveMenu(null)}
                          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                          sx={{
                            color: 'secondary.main',
                            fontSize: '0.8rem',
                            letterSpacing: '0.08em',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                          }}
                        >
                          View Entire Section
                        </Button>
                      </Box>

                      {/* Mega Menu Grid Columns */}
                      <Grid container spacing={4}>
                        {megaMenuData[activeMenu].columns.map((col, idx) => (
                          <Grid size={{ xs: 12, md: 4 }} key={idx}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                color: 'text.primary',
                                textTransform: 'uppercase',
                                fontSize: '0.76rem',
                                mb: 2,
                                pb: 0.5,
                                borderBottom: '1.5px solid',
                                borderColor: 'secondary.main',
                                display: 'inline-block',
                              }}
                            >
                              {col.heading}
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                              {col.links.map((link, lIdx) => (
                                <Box component="li" key={lIdx} sx={{ mb: 1.5 }}>
                                  {link.to.startsWith('http') ? (
                                    <Box
                                      component="a"
                                      href={link.to}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      sx={{
                                        color: 'text.secondary',
                                        textDecoration: 'none',
                                        fontSize: '0.86rem',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        transition: 'all 0.2s',
                                        '&:hover': { color: 'secondary.main', transform: 'translateX(4px)' },
                                      }}
                                    >
                                      <span>{link.label}</span>
                                      {link.badge && (
                                        <Box
                                          component="span"
                                          sx={{
                                            fontSize: '0.6rem',
                                            bgcolor: 'secondary.main',
                                            color: '#FFF',
                                            px: 0.8,
                                            py: 0.2,
                                            borderRadius: '4px',
                                            fontWeight: 600,
                                            letterSpacing: '0.04em',
                                          }}
                                        >
                                          {link.badge}
                                        </Box>
                                      )}
                                    </Box>
                                  ) : (
                                    <Box
                                      component={Link}
                                      to={link.to}
                                      onClick={() => setActiveMenu(null)}
                                      sx={{
                                        color: 'text.secondary',
                                        textDecoration: 'none',
                                        fontSize: '0.86rem',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        transition: 'all 0.2s',
                                        '&:hover': { color: 'secondary.main', transform: 'translateX(4px)' },
                                      }}
                                    >
                                      <span>{link.label}</span>
                                      {link.badge && (
                                        <Box
                                          component="span"
                                          sx={{
                                            fontSize: '0.6rem',
                                            bgcolor: 'secondary.main',
                                            color: '#FFF',
                                            px: 0.8,
                                            py: 0.2,
                                            borderRadius: '4px',
                                            fontWeight: 600,
                                            letterSpacing: '0.04em',
                                          }}
                                        >
                                          {link.badge}
                                        </Box>
                                      )}
                                    </Box>
                                  )}
                                </Box>
                              ))}
                            </Box>
                          </Grid>
                        ))}

                        {/* Featured Atelier Card */}
                        {megaMenuData[activeMenu].featured && (
                          <Grid size={{ xs: 12, md: 4 }}>
                            <Box
                              sx={{
                                p: 2.5,
                                bgcolor: isDark ? 'rgba(212, 175, 55, 0.06)' : 'rgba(156, 122, 74, 0.05)',
                                border: '1px solid',
                                borderColor: isDark ? 'rgba(212, 175, 55, 0.25)' : 'rgba(156, 122, 74, 0.2)',
                                borderRadius: '8px',
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'secondary.main', mb: 1 }}>
                                <SparkleIcon sx={{ fontSize: 18 }} />
                                <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.1em' }}>
                                  ATELIER SPOTLIGHT
                                </Typography>
                              </Box>
                              <Typography variant="subtitle1" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, mb: 1 }}>
                                {megaMenuData[activeMenu].featured.title}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.6, mb: 2 }}>
                                {megaMenuData[activeMenu].featured.desc}
                              </Typography>
                              {megaMenuData[activeMenu].featured.link.startsWith('http') ? (
                                <Button
                                  component="a"
                                  href={megaMenuData[activeMenu].featured.link}
                                  target="_blank"
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  fullWidth
                                  sx={{ fontSize: '0.76rem', letterSpacing: '0.06em' }}
                                >
                                  {megaMenuData[activeMenu].featured.btnText}
                                </Button>
                              ) : (
                                <Button
                                  component={Link}
                                  to={megaMenuData[activeMenu].featured.link}
                                  onClick={() => setActiveMenu(null)}
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  fullWidth
                                  sx={{ fontSize: '0.76rem', letterSpacing: '0.06em' }}
                                >
                                  {megaMenuData[activeMenu].featured.btnText}
                                </Button>
                              )}
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </Container>
                  </Paper>
                )}
              </Box>
            )}
          </Box>
        </Container>

        {/* ---------------- 3. MOBILE CURATED SLIDE DRAWER ---------------- */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          slotProps={{
            paper: {
              sx: {
                boxSizing: 'border-box',
                width: { xs: '85%', sm: 340 },
                maxWidth: 360,
                bgcolor: 'background.paper',
                p: 2.5,
              },
            },
          }}
        >
          {/* Mobile Drawer Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                component="img"
                src="/assets/hpm_emblem_hd.png"
                alt="Heritage Palate by Meghna"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid #D4AF37',
                  boxShadow: '0 2px 10px rgba(212, 175, 55, 0.25)',
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, letterSpacing: '0.08em', lineHeight: 1.1 }}>
                  HERITAGE PALATE
                </Typography>
                <Typography variant="caption" sx={{ letterSpacing: '0.2em', color: 'secondary.main', fontSize: '0.62rem' }}>
                  BY MEGHNA
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleDrawerToggle} size="small" aria-label="close menu">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Theme Atmosphere Switcher Tile for Mobile */}
          <Box
            onClick={colorMode.toggleColorMode}
            sx={{
              my: 2,
              p: 1.5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'action.hover',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: 'divider',
              cursor: 'pointer',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              {isDark ? (
                <DarkModeIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
              ) : (
                <LightModeIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
              )}
              <Typography variant="body2" sx={{ fontSize: '0.82rem', fontWeight: 500 }}>
                Atmosphere: <strong>{isDark ? 'Midnight Mood' : 'Daylight Mood'}</strong>
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 600 }}>
              Switch ↺
            </Typography>
          </Box>

          <List sx={{ pt: 0.5 }}>
            {navItems.map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={handleDrawerToggle}
                  sx={{
                    py: 1.4,
                    '&.active': {
                      color: 'secondary.main',
                      fontWeight: 600,
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography sx={{ letterSpacing: '0.08em', fontSize: '0.92rem', fontWeight: 500 }}>
                        {item.title}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ my: 1.5 }} />

            {/* My Orders & Tracking Link */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/orders"
                onClick={handleDrawerToggle}
                sx={{ py: 1.4 }}
              >
                <Badge badgeContent={orders.length} color="secondary" sx={{ mr: 2 }}>
                  <OrdersIcon sx={{ fontSize: 20 }} />
                </Badge>
                <Typography sx={{ letterSpacing: '0.05em', fontSize: '0.9rem' }}>
                  My Orders & Tracking
                </Typography>
              </ListItemButton>
            </ListItem>

            {/* Saved Wishlist Link */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleDrawerToggle();
                  setIsWishlistOpen(true);
                }}
                sx={{ py: 1.4 }}
              >
                <Badge badgeContent={wishlist.length} color="secondary" sx={{ mr: 2 }}>
                  <WishlistIcon sx={{ fontSize: 20 }} />
                </Badge>
                <Typography sx={{ letterSpacing: '0.05em', fontSize: '0.9rem' }}>
                  Saved Wishlist ({wishlist.length})
                </Typography>
              </ListItemButton>
            </ListItem>

            {/* Shopping Bag Link */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleDrawerToggle();
                  setIsCartOpen(true);
                }}
                sx={{ py: 1.4 }}
              >
                <Badge badgeContent={cartCount} color="secondary" sx={{ mr: 2 }}>
                  <CartIcon sx={{ fontSize: 20 }} />
                </Badge>
                <Typography sx={{ letterSpacing: '0.05em', fontSize: '0.9rem' }}>
                  Shopping Bag ({cartCount})
                </Typography>
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 2 }} />

            {/* WhatsApp Concierge Hotline */}
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="https://wa.me/917303466990?text=Hi%20Meghna!%20I%20am%20chatting%20from%20the%20website%20mobile%20menu."
                target="_blank"
                rel="noopener noreferrer"
                sx={{ py: 1.4, color: '#128C7E' }}
              >
                <WhatsAppIcon sx={{ mr: 2, fontSize: 22 }} />
                <Typography sx={{ letterSpacing: '0.05em', fontWeight: 600, fontSize: '0.88rem' }}>
                  WhatsApp (+91 73034 66990)
                </Typography>
              </ListItemButton>
            </ListItem>

            {/* Instagram Link */}
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="https://www.instagram.com/heritagepalatebymeghna/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ py: 1.4, color: 'secondary.main' }}
              >
                <InstagramIcon sx={{ mr: 2, fontSize: 22 }} />
                <Typography sx={{ letterSpacing: '0.05em', fontWeight: 600, fontSize: '0.88rem' }}>
                  Instagram Profile ↗
                </Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </>
  );
};

export default Navbar;
