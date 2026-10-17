import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  Drawer,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as WishlistIcon,
  ShoppingBagOutlined as BagIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  RestartAlt as ResetIcon,
} from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { SEOHead } from '../components/SEOHead';

const categoriesList = ['Chikankari', 'Anarkali', 'Sarees', 'Suits'];
const fabricsList = ['Chanderi', 'Silk', 'Georgette', 'Mulmul', 'Velvet'];

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category param from URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categoriesList.includes(cat)) {
      setSelectedCategories([cat]);
    }
  }, [searchParams]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleFabricToggle = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setPriceRange('all');
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
          return false;
        }
        // Fabric filter
        if (selectedFabrics.length > 0) {
          const match = selectedFabrics.some((f) => p.fabric.toLowerCase().includes(f.toLowerCase()));
          if (!match) return false;
        }
        // Price filter
        if (priceRange === 'under10k' && p.price >= 10000) return false;
        if (priceRange === '10kto15k' && (p.price < 10000 || p.price > 15000)) return false;
        if (priceRange === 'above15k' && p.price <= 15000) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.fabric.toLowerCase().includes(q) ||
            p.craft.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [selectedCategories, selectedFabrics, priceRange, searchQuery, sortBy]);

  const activeFiltersCount =
    selectedCategories.length + selectedFabrics.length + (priceRange !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0);

  const FilterContent = (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ letterSpacing: '0.08em', fontWeight: 600 }}>
          Filters
        </Typography>
        {activeFiltersCount > 0 && (
          <Button
            size="small"
            startIcon={<ResetIcon fontSize="small" />}
            onClick={clearAllFilters}
            sx={{ textTransform: 'none', color: 'secondary.main', p: 0 }}
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Category Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, letterSpacing: '0.1em', color: 'text.secondary' }}>
          Collection
        </Typography>
        <FormGroup>
          {categoriesList.map((cat) => (
            <FormControlLabel
              key={cat}
              control={
                <Checkbox
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                  size="small"
                  sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'secondary.main' } }}
                />
              }
              label={<Typography variant="body2" sx={{ letterSpacing: '0.02em' }}>{cat}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Fabric Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, letterSpacing: '0.1em', color: 'text.secondary' }}>
          Fabric
        </Typography>
        <FormGroup>
          {fabricsList.map((fab) => (
            <FormControlLabel
              key={fab}
              control={
                <Checkbox
                  checked={selectedFabrics.includes(fab)}
                  onChange={() => handleFabricToggle(fab)}
                  size="small"
                  sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'secondary.main' } }}
                />
              }
              label={<Typography variant="body2" sx={{ letterSpacing: '0.02em' }}>{fab}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Price Range Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, letterSpacing: '0.1em', color: 'text.secondary' }}>
          Price Range
        </Typography>
        <FormGroup>
          {[
            { id: 'all', label: 'All Prices' },
            { id: 'under10k', label: 'Under ₹10,000' },
            { id: '10kto15k', label: '₹10,000 – ₹15,000' },
            { id: 'above15k', label: 'Above ₹15,000' },
          ].map((range) => (
            <FormControlLabel
              key={range.id}
              control={
                <Checkbox
                  checked={priceRange === range.id}
                  onChange={() => setPriceRange(range.id)}
                  size="small"
                  sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'secondary.main' } }}
                />
              }
              label={<Typography variant="body2" sx={{ letterSpacing: '0.02em' }}>{range.label}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );

  const shopSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Heritage Palate by Meghna - Handcrafted Collection',
    description: 'Explore Lucknowi Chikankari suits, Banarasi silk sarees, and royal kalidar Anarkalis.',
    numberOfItems: products.length,
    itemListElement: products.map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: prod.name,
      url: `https://heritage-palate-by-meghna.onrender.com/product/${prod.id}`,
    })),
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      <SEOHead
        title="Shop Handcrafted Chikankari Suits, Banarasi Sarees & Anarkalis"
        description="Explore the complete handcrafted luxury atelier collection by Meghna. Pure silk Banarasi sarees, authentic Lucknowi Chikankari, and bespoke festive outfits."
        keywords="shop Chikankari suits, buy Banarasi saree online, Indian luxury wear, Chikankari sharara, designer Anarkali, slow fashion India"
        canonical="https://heritage-palate-by-meghna.onrender.com/shop"
        schema={shopSchema}
      />
      {/* Header Banner */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="overline" color="secondary.main">
          Handcrafted Indian Luxury
        </Typography>
        <Typography variant="h2" component="h1" sx={{ mt: 1, mb: 1.5 }}>
          The Atelier Collection
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto', mb: 4 }}>
          Each garment is individually embroidered by master karigars in Lucknow & Varanasi, celebrating slow fashion and pure luxury textiles.
        </Typography>

        {/* Live Search inside Shop */}
        <Box sx={{ maxWidth: 500, mx: 'auto' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search by silhouette, embroidery, or fabric..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: 'secondary.main' }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
                sx: { bgcolor: 'background.paper', borderRadius: 0 },
              },
            }}
          />
        </Box>
      </Box>

      {/* Main Grid */}
      <Grid container spacing={5}>
        {/* Desktop Sidebar Filters */}
        <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ position: 'sticky', top: '100px', p: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            {FilterContent}
          </Box>
        </Grid>

        {/* Product Grid & Controls */}
        <Grid size={{ xs: 12, md: 9 }}>
          {/* Top Bar (Count, Mobile Filter Trigger, Sort Selector) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              pb: 3,
              mb: 3,
              borderBottom: '1px solid',
              borderColor: 'divider',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<FilterIcon />}
                onClick={() => setMobileFilterOpen(true)}
                sx={{ display: { xs: 'inline-flex', md: 'none' }, py: 1 }}
              >
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
              <Typography variant="body2" color="text.secondary">
                Showing <strong>{filteredProducts.length}</strong> creations
              </Typography>
            </Box>

            <FormControl size="small" sx={{ minWidth: 200, alignSelf: { xs: 'stretch', sm: 'auto' } }}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                sx={{ borderRadius: 0, bgcolor: 'background.paper' }}
              >
                <MenuItem value="featured">Featured Curations</MenuItem>
                <MenuItem value="newest">New Season First</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {selectedCategories.map((cat) => (
                <Chip
                  key={cat}
                  label={`Collection: ${cat}`}
                  onDelete={() => handleCategoryToggle(cat)}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 0, borderColor: 'secondary.main' }}
                />
              ))}
              {selectedFabrics.map((fab) => (
                <Chip
                  key={fab}
                  label={`Fabric: ${fab}`}
                  onDelete={() => handleFabricToggle(fab)}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 0, borderColor: 'secondary.main' }}
                />
              ))}
              {priceRange !== 'all' && (
                <Chip
                  label={`Price: ${priceRange}`}
                  onDelete={() => setPriceRange('all')}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 0, borderColor: 'secondary.main' }}
                />
              )}
              {searchQuery && (
                <Chip
                  label={`Query: "${searchQuery}"`}
                  onDelete={() => setSearchQuery('')}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 0, borderColor: 'secondary.main' }}
                />
              )}
            </Box>
          )}

          {/* Products List */}
          {filteredProducts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 12, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', p: 4 }}>
              <Typography variant="h5" sx={{ mb: 1.5, fontFamily: 'Playfair Display, serif' }}>
                No creations match your filter criteria
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your selected collections or search query.
              </Typography>
              <Button variant="outlined" color="primary" onClick={clearAllFilters}>
                Reset All Filters
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3.5}>
              {filteredProducts.map((product) => {
                const inWish = isInWishlist(product.id);

                return (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                    <Card
                      elevation={0}
                      sx={{
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transition: 'border-color 0.3s ease, transform 0.3s ease',
                        '&:hover': {
                          borderColor: 'secondary.main',
                          transform: 'translateY(-4px)',
                        },
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
                              '&:hover': { transform: 'scale(1.05)' },
                            }}
                          />
                        </Box>

                        {/* Badges */}
                        <Box sx={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 0.5, zIndex: 2 }}>
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
                              label="New"
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
                          aria-label="toggle wishlist"
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
                      <CardContent sx={{ p: 2, textAlign: 'left', flexGrow: 1 }}>
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
          )}
        </Grid>
      </Grid>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              p: 3,
              bgcolor: 'background.paper',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: 'Playfair Display, serif' }}>
            Filter Catalog
          </Typography>
          <IconButton size="small" onClick={() => setMobileFilterOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        {FilterContent}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => setMobileFilterOpen(false)}
          sx={{ mt: 3, py: 1.5 }}
        >
          View Results ({filteredProducts.length})
        </Button>
      </Drawer>
    </Container>
  );
};

export default Shop;
