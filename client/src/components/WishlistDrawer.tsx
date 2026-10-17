import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import {
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  ShoppingBagOutlined as BagIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, isWishlistOpen, setIsWishlistOpen } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <Drawer
      anchor="right"
      open={isWishlistOpen}
      onClose={() => setIsWishlistOpen(false)}
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
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FavoriteIcon sx={{ color: 'secondary.main', fontSize: 24 }} />
          <Typography variant="h6" sx={{ letterSpacing: '0.08em', fontWeight: 600 }}>
            SAVED CREATIONS ({wishlistProducts.length})
          </Typography>
        </Box>
        <IconButton onClick={() => setIsWishlistOpen(false)} edge="end" aria-label="close wishlist">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
        {wishlistProducts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <FavoriteIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Playfair Display, serif' }}>
              Your wishlist is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 280, mx: 'auto' }}>
              Tap the heart icon on any piece you adore to curate your personal lookbook.
            </Typography>
            <Button
              component={Link}
              to="/shop"
              variant="outlined"
              color="primary"
              onClick={() => setIsWishlistOpen(false)}
            >
              Explore Catalog
            </Button>
          </Box>
        ) : (
          <Stack spacing={3}>
            {wishlistProducts.map((product) => (
              <Box key={product.id} sx={{ display: 'flex', gap: 2, pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box
                  component={Link}
                  to={`/product/${product.id}`}
                  onClick={() => setIsWishlistOpen(false)}
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
                    src={product.image}
                    alt={product.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography
                        component={Link}
                        to={`/product/${product.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                        variant="subtitle2"
                        sx={{
                          textDecoration: 'none',
                          color: 'text.primary',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          '&:hover': { color: 'secondary.main' },
                        }}
                      >
                        {product.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => toggleWishlist(product.id)}
                        sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' }, p: 0.5 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                      {product.category} • {product.fabric}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </Typography>
                  </Box>

                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<BagIcon fontSize="small" />}
                    onClick={() => {
                      addToCart(product, product.sizes[0] || 'M');
                      toggleWishlist(product.id);
                    }}
                    sx={{ alignSelf: 'flex-start', mt: 1, py: 0.6, px: 2, fontSize: '0.75rem' }}
                  >
                    Move to Bag
                  </Button>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Drawer>
  );
};
