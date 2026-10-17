import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  TextField,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Breadcrumbs,
  Chip,
  Stack,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as WishlistIcon,
  ExpandMore as ExpandMoreIcon,
  WhatsApp as WhatsAppIcon,
  ShoppingBagOutlined as BagIcon,
  Straighten as SizeGuideIcon,
  LocalShippingOutlined as ShippingIcon,
  VerifiedUserOutlined as GuaranteeIcon,
  AutorenewOutlined as AlterationIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { CustomerCareDialog } from '../components/CustomerCareDialog';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    cart,
    addToCart,
    removeFromCart,
    showToast,
    toggleWishlist,
    isInWishlist,
    savedMeasurements,
    saveMeasurements,
  } = useStore();

  const product = products.find((p) => p.id === Number(id)) || products[0];
  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [size, setSize] = useState<string>(product.sizes[0] || 'M');
  const [customSizeOpen, setCustomSizeOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [measurements, setMeasurements] = useState({
    bust: savedMeasurements.bust || '',
    waist: savedMeasurements.waist || '',
    hip: savedMeasurements.hip || '',
    shoulder: savedMeasurements.shoulder || '',
    sleeveLength: savedMeasurements.sleeveLength || '',
    garmentLength: savedMeasurements.garmentLength || '',
    notes: '',
  });

  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleSizeChange = (_: React.MouseEvent<HTMLElement>, newSize: string | null) => {
    if (newSize) {
      setSize(newSize);
      setCustomSizeOpen(false);
    }
  };

  const handleAddBag = () => {
    const customData = customSizeOpen ? measurements : undefined;
    const finalSize = customSizeOpen ? 'Bespoke Custom' : size;
    addToCart(product, finalSize, customData, quantity);
  };

  const handleWhatsAppInquiry = () => {
    const brandNumber = '917303466990';
    let text = `Hello Meghna! I would like to order *${product.name}* (₹${(product.price * quantity).toLocaleString('en-IN')}).\n`;
    text += `• Selected Size: ${customSizeOpen ? 'Custom Bespoke Measurement' : size}\n`;
    text += `• Quantity: ${quantity}\n`;
    if (customSizeOpen) {
      text += `• Measurements: Bust: ${measurements.bust || '-'}, Waist: ${measurements.waist || '-'}, Hip: ${measurements.hip || '-'}\n`;
    }
    text += `Please confirm my order reservation and delivery details. Thank you!`;

    // Save order into localStorage and clear this item from bag if already added
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      orderId: `HP-${randomNum}`,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: [
        {
          product,
          size: customSizeOpen ? 'Bespoke Custom' : size,
          quantity,
          price: product.price,
          customMeasurements: customSizeOpen ? measurements : undefined,
        },
      ],
      total: product.price * quantity,
      status: 'Atelier Processing',
      customerName: 'WhatsApp Patron',
      phone: '+91 73034 66990',
      email: 'patron@heritagepalate.com',
      address: 'Order placed via WhatsApp Concierge (+91 73034 66990)',
      notes: `Direct item order for ${product.name}`,
    };

    try {
      const savedOrders = localStorage.getItem('heritage_orders');
      const existingOrders = savedOrders ? JSON.parse(savedOrders) : [];
      localStorage.setItem('heritage_orders', JSON.stringify([newOrder, ...existingOrders]));

      const savedCart = localStorage.getItem('heritage_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        const filtered = parsedCart.filter((item: any) => item.product.id !== product.id);
        localStorage.setItem('heritage_cart', JSON.stringify(filtered));
      }
    } catch (err) {
      console.error('LocalStorage write error:', err);
    }

    // Remove from active cart state
    cart.forEach((c) => {
      if (c.product.id === product.id) {
        removeFromCart(c.cartId);
      }
    });

    showToast(`Order #${newOrder.orderId} placed via WhatsApp! Saved in My Orders.`);

    const url = `https://wa.me/${brandNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const currentImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <>
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 } }}>
        {/* Breadcrumb Trail */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4, fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>
            Shop
          </Link>
          <Link to={`/shop?category=${product.category}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {product.category}
          </Link>
          <Typography color="secondary.main" sx={{ fontSize: '0.85rem' }}>
            {product.name}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* Left: Interactive Image Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: '100px' } }}>
              {/* Main Featured Image */}
              <Box
                sx={{
                  position: 'relative',
                  pt: '130%',
                  bgcolor: 'background.paper',
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  mb: 2,
                }}
              >
                <Box
                  component="img"
                  src={currentImages[activeImageIndex] || product.image}
                  alt={product.name}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.5s ease',
                  }}
                />

                {/* Wishlist Button on image */}
                <IconButton
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="toggle wishlist"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(4px)',
                    color: inWishlist ? '#D32F2F' : '#141312',
                    '&:hover': { bgcolor: '#FFFFFF', color: '#D32F2F' },
                  }}
                >
                  {inWishlist ? <FavoriteIcon /> : <WishlistIcon />}
                </IconButton>
              </Box>

              {/* Thumbnails */}
              {currentImages.length > 1 && (
                <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
                  {currentImages.map((img, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      sx={{
                        width: 80,
                        height: 100,
                        flexShrink: 0,
                        cursor: 'pointer',
                        border: '2px solid',
                        borderColor: activeImageIndex === idx ? 'secondary.main' : 'transparent',
                        opacity: activeImageIndex === idx ? 1 : 0.6,
                        transition: 'all 0.2s',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        component="img"
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>
          </Grid>

          {/* Right: Product Information & Actions */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              {/* Category & Badge */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.15em' }}>
                  {product.category}
                </Typography>
                {product.bestseller && (
                  <Chip
                    label="Bestseller"
                    size="small"
                    sx={{ bgcolor: '#141312', color: '#D4AF37', borderRadius: 0, height: 20, fontSize: '0.65rem' }}
                  />
                )}
              </Box>

              <Typography variant="h3" sx={{ mb: 1.5, fontFamily: 'Playfair Display, serif', lineHeight: 1.2 }}>
                {product.name}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                {product.tagline}
              </Typography>

              {/* Price Block */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </Typography>
                {product.originalPrice && (
                  <>
                    <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                      (Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')})
                    </Typography>
                  </>
                )}
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
                Inclusive of all taxes. Complimentary insured Pan-India courier.
              </Typography>

              <Divider sx={{ mb: 4 }} />

              {/* Size Selector */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ letterSpacing: '0.08em' }}>
                    Select Size: <strong>{customSizeOpen ? 'Bespoke Custom' : size}</strong>
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<SizeGuideIcon fontSize="small" />}
                    onClick={() => setSizeGuideOpen(true)}
                    sx={{ textTransform: 'none', color: 'secondary.main', p: 0, fontSize: '0.8rem' }}
                  >
                    Size Guide
                  </Button>
                </Box>

                <ToggleButtonGroup
                  value={customSizeOpen ? null : size}
                  exclusive
                  onChange={handleSizeChange}
                  aria-label="product sizes"
                  sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}
                >
                  {product.sizes.map((s) => (
                    <ToggleButton
                      key={s}
                      value={s}
                      sx={{
                        borderRadius: 0,
                        border: '1px solid',
                        borderColor: 'divider',
                        minWidth: 54,
                        height: 44,
                        fontWeight: 600,
                        '&.Mui-selected': {
                          bgcolor: 'secondary.main',
                          color: '#FAF8F5',
                          borderColor: 'secondary.main',
                          '&:hover': { bgcolor: 'secondary.main' },
                        },
                      }}
                    >
                      {s}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              {/* Bespoke Custom Measurements Trigger */}
              <Box sx={{ mb: 4 }}>
                <Button
                  variant={customSizeOpen ? 'contained' : 'outlined'}
                  color="secondary"
                  size="small"
                  onClick={() => setCustomSizeOpen(!customSizeOpen)}
                  sx={{ textTransform: 'none', letterSpacing: '0.05em', py: 0.8, px: 2 }}
                >
                  {customSizeOpen ? '✓ Custom Measurements Selected' : 'Request Made-to-Measure Custom Fit (+ ₹0)'}
                </Button>

                {customSizeOpen && (
                  <Box sx={{ mt: 2.5, p: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'secondary.main' }}>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Bespoke Atelier Measurements (in inches)
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                      Our master karigars will stitch this piece specifically to your body proportions.
                    </Typography>

                    <Grid container spacing={2}>
                      {[
                        { key: 'bust', label: 'Bust' },
                        { key: 'waist', label: 'Waist' },
                        { key: 'hip', label: 'Hip' },
                        { key: 'shoulder', label: 'Shoulder' },
                        { key: 'sleeveLength', label: 'Sleeve Length' },
                        { key: 'garmentLength', label: 'Kurta / Length' },
                      ].map((field) => (
                        <Grid size={{ xs: 6, sm: 4 }} key={field.key}>
                          <TextField
                            size="small"
                            fullWidth
                            label={field.label}
                            variant="outlined"
                            placeholder="e.g. 36"
                            value={(measurements as any)[field.key]}
                            onChange={(e) => setMeasurements({ ...measurements, [field.key]: e.target.value })}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                          />
                        </Grid>
                      ))}
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          size="small"
                          fullWidth
                          label="Special Neckline / Fit Notes"
                          variant="outlined"
                          placeholder="e.g., preference for deep V-neck or longer sleeves..."
                          value={measurements.notes}
                          onChange={(e) => setMeasurements({ ...measurements, notes: e.target.value })}
                          multiline
                          rows={2}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Button
                          size="small"
                          variant="text"
                          onClick={() =>
                            saveMeasurements({
                              bust: measurements.bust,
                              waist: measurements.waist,
                              hip: measurements.hip,
                              shoulder: measurements.shoulder,
                              sleeveLength: measurements.sleeveLength,
                              garmentLength: measurements.garmentLength,
                            })
                          }
                          sx={{ textTransform: 'none', color: 'secondary.main', p: 0, fontSize: '0.8rem' }}
                        >
                          💾 Save these measurements to my profile for future pieces
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>

              {/* Quantity & Add to Bag Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                {/* Quantity Control */}
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', height: 50 }}>
                  <IconButton
                    size="small"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    sx={{ borderRadius: 0, px: 1.5 }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body1" sx={{ px: 2, fontWeight: 600, minWidth: 24, textAlign: 'center' }}>
                    {quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setQuantity(quantity + 1)}
                    sx={{ borderRadius: 0, px: 1.5 }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* Primary Add to Bag Button */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={<BagIcon />}
                  onClick={handleAddBag}
                  sx={{ py: 1.8, fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.12em' }}
                >
                  Add to Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}
                </Button>
              </Box>

              {/* WhatsApp Boutique Inquiry */}
              <Button
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<WhatsAppIcon />}
                onClick={handleWhatsAppInquiry}
                sx={{
                  py: 1.6,
                  mb: 4,
                  borderColor: '#128C7E',
                  color: '#128C7E',
                  fontWeight: 600,
                  '&:hover': { borderColor: '#075E54', bgcolor: 'rgba(18, 140, 126, 0.08)' },
                }}
              >
                Inquire or Order via WhatsApp
              </Button>

              {/* Trust Badges */}
              <Box sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 4 }}>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <ShippingIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                    <Typography variant="caption" sx={{ letterSpacing: '0.03em' }}>
                      Ready pieces dispatch in <strong>48 hours</strong>; bespoke pieces dispatch in <strong>10-12 days</strong>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AlterationIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                    <Typography variant="caption" sx={{ letterSpacing: '0.03em' }}>
                      <strong>Complimentary alterations</strong> provided on all standard size orders
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <GuaranteeIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                    <Typography variant="caption" sx={{ letterSpacing: '0.03em' }}>
                      Authentic handloom craftsmanship guaranteed by <strong>Heritage Palate</strong>
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Deep Dive Accordions */}
              <Box>
                <Accordion disableGutters defaultExpanded elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', '&:before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" sx={{ letterSpacing: '0.08em' }}>
                      Description & Silhouette
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ color: 'text.secondary', pt: 0, pb: 2.5 }}>
                    <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 2 }}>
                      {product.description}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {product.details?.map((detail, idx) => (
                        <Typography component="li" variant="body2" key={idx} sx={{ mb: 0.5, lineHeight: 1.6 }}>
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Accordion disableGutters elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', '&:before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" sx={{ letterSpacing: '0.08em' }}>
                      Craft & Fabric Heritage
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ color: 'text.secondary', pt: 0, pb: 2.5 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Craft Technique:</strong> {product.craft}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Base Fabric:</strong> {product.fabric}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Wash & Preservation:</strong> {product.care}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion disableGutters elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', '&:before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" sx={{ letterSpacing: '0.08em' }}>
                      Delivery & Returns Policy
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ color: 'text.secondary', pt: 0, pb: 2.5 }}>
                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                      • Free Express courier across all pincodes in India.<br />
                      • Worldwide DHL delivery in 5-8 business days.<br />
                      • 7-day exchange or store credit for unworn garments in original condition.<br />
                      • Custom bespoke orders are non-refundable but eligible for complimentary fitting alterations.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* You May Also Adore / Related Products */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: { xs: 8, md: 14 } }}>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Typography variant="overline" color="secondary.main">
                Curated Suggestions
              </Typography>
              <Typography variant="h2" sx={{ mt: 0.5 }}>
                You May Also Adore
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {relatedProducts.map((rel) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={rel.id}>
                  <Box
                    component={Link}
                    to={`/product/${rel.id}`}
                    sx={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    <Box sx={{ position: 'relative', pt: '135%', overflow: 'hidden', bgcolor: 'background.paper', mb: 1.5 }}>
                      <Box
                        component="img"
                        src={rel.image}
                        alt={rel.name}
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s',
                          '&:hover': { transform: 'scale(1.05)' },
                        }}
                      />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {rel.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{rel.price.toLocaleString('en-IN')}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      {/* Size Guide Dialog */}
      <CustomerCareDialog type={sizeGuideOpen ? 'size-guide' : null} onClose={() => setSizeGuideOpen(false)} />
    </>
  );
};

export default ProductDetails;
