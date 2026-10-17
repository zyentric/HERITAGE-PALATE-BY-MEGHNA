import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Chip,
  Button,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from '@mui/material';
import {
  ShoppingBagOutlined as BagIcon,
  WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const trackingSteps = [
  'Atelier Processing',
  'Hand Embroidery & Crafting',
  'Quality Inspection',
  'Dispatched via Express Courier',
  'Delivered',
];

const Orders: React.FC = () => {
  const { orders } = useStore();

  const getActiveStep = (status: string) => {
    const idx = trackingSteps.indexOf(status);
    return idx >= 0 ? idx : 1;
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.22em' }}>
            Atelier Dispatch & Status
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.4rem' }, mt: 1, mb: 2 }}>
            Your Handcrafted Orders
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto', fontSize: '1.05rem', lineHeight: 1.8 }}>
            Track the hand embroidery, tailoring progress, and insured courier delivery for your bespoke creations.
          </Typography>
        </Box>

        {orders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', p: 4 }}>
            <BagIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 1, fontFamily: 'Playfair Display, serif' }}>
              No orders found in this session
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 360, mx: 'auto' }}>
              Once you place an order or inquiry with our atelier, you will be able to track its progress here.
            </Typography>
            <Button component={Link} to="/shop" variant="outlined" color="primary">
              Discover Our Creations
            </Button>
          </Box>
        ) : (
          <Stack spacing={4}>
            {orders.map((order) => {
              const activeStep = getActiveStep(order.status);

              return (
                <Card
                  key={order.orderId}
                  elevation={0}
                  sx={{
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    p: { xs: 2.5, md: 4 },
                  }}
                >
                  {/* Order Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      pb: 3,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                          Order #{order.orderId}
                        </Typography>
                        <Chip
                          label={order.status}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(212, 175, 55, 0.15)',
                            color: 'secondary.main',
                            fontWeight: 600,
                            borderRadius: 0,
                          }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Placed on {order.date} • Recipient: {order.customerName}
                      </Typography>
                    </Box>

                    <Button
                      size="small"
                      startIcon={<WhatsAppIcon />}
                      href={`https://wa.me/917303466990?text=Hi%20Meghna!%20I%20am%20checking%20status%20for%20order%20%23${order.orderId}`}
                      target="_blank"
                      sx={{ color: '#128C7E', textTransform: 'none', fontWeight: 600 }}
                    >
                      Ask Stylist on WhatsApp
                    </Button>
                  </Box>

                  {/* Tracking Progress Stepper */}
                  <Box sx={{ py: 4, px: { xs: 0, md: 2 } }}>
                    <Stepper
                      activeStep={activeStep}
                      alternativeLabel
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          letterSpacing: '0.04em',
                          mt: 1,
                        },
                        '& .Mui-active': { color: 'secondary.main' },
                        '& .Mui-completed': { color: 'secondary.main' },
                      }}
                    >
                      {trackingSteps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {/* Order Items List */}
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 7 }}>
                      <Typography variant="subtitle2" sx={{ letterSpacing: '0.08em', mb: 2, textTransform: 'uppercase' }}>
                        Garments in this order
                      </Typography>
                      <Stack spacing={2}>
                        {order.items.map((item, idx) => (
                          <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Box
                              component="img"
                              src={item.product.image}
                              alt={item.product.name}
                              sx={{ width: 64, height: 80, objectFit: 'cover' }}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                                {item.product.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                Size: {item.size} • Qty: {item.quantity}
                              </Typography>
                              {item.customMeasurements && (
                                <Typography variant="caption" color="secondary.main" sx={{ display: 'block' }}>
                                  Bespoke Fitting: Bust {item.customMeasurements.bust || '-'}, Waist {item.customMeasurements.waist || '-'}
                                </Typography>
                              )}
                              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Grid>

                    {/* Delivery & Billing Summary */}
                    <Grid size={{ xs: 12, md: 5 }}>
                      <Box sx={{ p: 2.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ letterSpacing: '0.08em', mb: 1.5, textTransform: 'uppercase' }}>
                          Delivery Address & Total
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, lineHeight: 1.6 }}>
                          {order.address || 'Address registered with atelier concierge'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                          Contact: {order.phone}
                        </Typography>

                        <Divider sx={{ my: 1.5 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2">Total Value</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            ₹{order.total.toLocaleString('en-IN')}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                          Complimentary insured shipping included
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              );
            })}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default Orders;
