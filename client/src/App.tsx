import React from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Collections from './pages/Collections';
import Craft from './pages/Craft';
import About from './pages/About';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import { StoreContextProvider, useStore } from './context/StoreContext';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import ScrollToTop from './components/ScrollToTop';

const AppContent: React.FC = () => {
  const { toastMessage, clearToast } = useStore();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <ScrollToTop />
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/craft" element={<Craft />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Box>

      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />

      {/* Global Feedback Snackbar */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={3500}
        onClose={clearToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={clearToast}
          severity="success"
          sx={{
            bgcolor: 'background.paper',
            color: 'text.primary',
            border: '1px solid',
            borderColor: 'secondary.main',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            letterSpacing: '0.04em',
            fontSize: '0.85rem',
            alignItems: 'center',
            '& .MuiAlert-icon': {
              color: 'secondary.main',
            },
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <StoreContextProvider>
        <AppContent />
      </StoreContextProvider>
    </Router>
  );
};

export default App;
