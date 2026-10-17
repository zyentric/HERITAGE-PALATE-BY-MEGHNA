import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Chip,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = useState('');

  const quickPicks = ['Chikankari', 'Anarkali', 'Silk Saree', 'Chanderi', 'Suits', 'Ivory'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.craft.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  const handleClose = () => {
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <Dialog
      open={isSearchOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            p: { xs: 2, md: 4 },
            position: 'relative',
            top: { xs: 0, md: -60 },
            maxHeight: '85vh',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="overline" sx={{ letterSpacing: '0.2em', color: 'secondary.main' }}>
          Atelier Search
        </Typography>
        <IconButton onClick={handleClose} size="small" edge="end">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <TextField
          autoFocus
          fullWidth
          variant="standard"
          placeholder="Search by craft, silhouette, or fabric (e.g. Chikankari, Banarasi, Anarkali)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'secondary.main', mr: 1, fontSize: 28 }} />
                </InputAdornment>
              ),
              sx: {
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                fontFamily: 'Playfair Display, serif',
                py: 1,
              },
            },
          }}
        />

        {/* Quick Picks */}
        <Box sx={{ mt: 3, mb: 4 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Popular Searches
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {quickPicks.map((pick) => (
              <Chip
                key={pick}
                label={pick}
                onClick={() => setQuery(pick)}
                variant="outlined"
                clickable
                sx={{
                  borderRadius: 0,
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    bgcolor: 'action.hover',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Results */}
        {query.trim() && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Found {results.length} results for &ldquo;{query}&rdquo;
            </Typography>

            {results.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'background.default', p: 4 }}>
                <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Playfair Display, serif' }}>
                  No exact matches found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please try another craft keyword or explore our full collections.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {results.map((product) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={product.id}>
                    <Box
                      component={Link}
                      to={`/product/${product.id}`}
                      onClick={handleClose}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        p: 1.5,
                        textDecoration: 'none',
                        color: 'inherit',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'secondary.main',
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{ width: 70, height: 90, objectFit: 'cover' }}
                      />
                      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="caption" color="secondary.main" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {product.category}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.2, mb: 0.5 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹{product.price.toLocaleString('en-IN')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', pr: 1, color: 'text.secondary' }}>
                        <ArrowForwardIcon fontSize="small" />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
