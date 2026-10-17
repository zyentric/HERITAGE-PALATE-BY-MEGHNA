import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  WhatsApp as WhatsAppIcon,
  ShoppingBagOutlined as BagIcon,
  LocalShippingOutlined as ShippingIcon,
  WorkspacePremiumOutlined as TrustIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const theme = useTheme();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    checkoutOnWhatsApp,
  } = useStore();

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 440 },
            bgcolor: 'background.paper',
            p: 0,
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* Drawer Header */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <BagIcon sx={{ color: 'secondary.main', fontSize: 24 }} />
          <Typography variant="h6" sx={{ letterSpacing: '0.08em', fontWeight: 600 }}>
            SHOPPING BAG ({cartCount})
          </Typography>
        </Box>
        <IconButton onClick={() => setIsCartOpen(false)} edge="end" aria-label="close bag">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Free Shipping Progress Indicator */}
      <Box sx={{ px: 3, py: 1.5, bgcolor: theme.palette.mode === 'light' ? 'rgba(156, 122, 74, 0.08)' : 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', gap: 1 }}>
        <ShippingIcon fontSize="small" sx={{ color: 'secondary.main' }} />
        <Typography variant="caption" sx={{ letterSpacing: '0.04em', fontWeight: 500 }}>
          {cartTotal >= 5000
            ? '✓ You have unlocked complimentary Pan-India courier'
            : `Add ₹${(5000 - cartTotal).toLocaleString('en-IN')} more for free insured shipping`}
        </Typography>
      </Box>

      {/* Items Container */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
        {cart.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <BagIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Playfair Display, serif' }}>
              Your bag is currently empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 280, mx: 'auto' }}>
              Explore our handcrafted Chikankari, festive Anarkalis, and heritage sarees.
            </Typography>
            <Button
              component={Link}
              to="/shop"
              variant="outlined"
              color="primary"
              onClick={() => setIsCartOpen(false)}
            >
              Discover Collections
            </Button>
          </Box>
        ) : (
          <Stack spacing={3}>
            {cart.map((item) => (
              <Box key={item.cartId} sx={{ display: 'flex', gap: 2, pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box
                  component={Link}
                  to={`/product/${item.product.id}`}
                  onClick={() => setIsCartOpen(false)}
                  sx={{
                    width: 90,
                    height: 120,
                    flexShrink: 0,
                    overflow: 'hidden',
                    bgcolor: 'background.default',
                  }}
                >
                  <Box
                    component="img"
                    src={item.product.image}
                    alt={item.product.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography
                        component={Link}
                        to={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        variant="subtitle2"
                        sx={{
                          textDecoration: 'none',
                          color: 'text.primary',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          '&:hover': { color: 'secondary.main' },
                        }}
                      >
                        {item.product.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.cartId)}
                        sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' }, p: 0.5 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                      Size: <strong>{item.size}</strong>
                      {item.customMeasurements && ' (Bespoke Measurement)'}
                    </Typography>

                    {item.customMeasurements && (
                      <Typography variant="caption" sx={{ color: 'secondary.main', display: 'block', fontSize: '0.7rem' }}>
                        Custom Fit: Bust {item.customMeasurements.bust || '-'}, Waist {item.customMeasurements.waist || '-'}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    {/* Quantity Selector */}
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider' }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.cartId, -1)}
                        disabled={item.quantity <= 1}
                        sx={{ p: 0.5, borderRadius: 0 }}
                      >
                        <RemoveIcon fontSize="small" sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Typography variant="body2" sx={{ px: 1.5, minWidth: 20, textAlign: 'center', fontWeight: 600 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.cartId, 1)}
                        sx={{ p: 0.5, borderRadius: 0 }}
                      >
                        <AddIcon fontSize="small" sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>

                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      {/* Drawer Footer */}
      {cart.length > 0 && (
        <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Subtotal
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              ₹{cartTotal.toLocaleString('en-IN')}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            Taxes included. Complimentary shipping applied.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            startIcon={<WhatsAppIcon />}
            onClick={checkoutOnWhatsApp}
            sx={{
              py: 1.8,
              bgcolor: '#128C7E',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.92rem',
              letterSpacing: '0.08em',
              mb: 1.5,
              '&:hover': { bgcolor: '#075E54' },
            }}
          >
            Order via WhatsApp Concierge
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: 'text.secondary' }}>
            <TrustIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
            <Typography variant="caption" sx={{ fontSize: '0.72rem' }}>
              Direct confirmation with designer Meghna • Order auto-saved to My Orders
            </Typography>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};
