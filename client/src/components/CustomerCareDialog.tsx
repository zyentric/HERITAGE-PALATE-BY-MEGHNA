import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';

export type CustomerCareType = 'size-guide' | 'shipping' | 'returns' | 'faqs' | 'privacy' | 'terms' | null;

interface CustomerCareDialogProps {
  type: CustomerCareType;
  onClose: () => void;
}

export const CustomerCareDialog: React.FC<CustomerCareDialogProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <Dialog
      open={Boolean(type)}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            p: { xs: 2, md: 3 },
            bgcolor: 'background.paper',
            maxHeight: '90vh',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h5" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
          {type === 'size-guide' && 'Bespoke Size & Measurement Guide'}
          {type === 'shipping' && 'Insured Pan-India & Global Delivery'}
          {type === 'returns' && 'Returns, Exchanges & Alteration Policy'}
          {type === 'faqs' && 'Frequently Asked Questions'}
          {type === 'privacy' && 'Privacy Policy'}
          {type === 'terms' && 'Terms of Service'}
        </Typography>
        <IconButton onClick={onClose} size="small" edge="end">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ py: 3, px: 1 }}>
        {type === 'size-guide' && (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              All measurements are in inches. Our garments are cut with classic luxury ease. For custom tailoring, you can also submit your precise measurements directly on the product page.
            </Typography>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: 'action.hover' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Size</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Bust (in)</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Waist (in)</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Hip (in)</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Shoulder (in)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { size: 'XS', bust: '32 - 34', waist: '26 - 28', hip: '36 - 38', shoulder: '13.5' },
                    { size: 'S', bust: '34 - 36', waist: '28 - 30', hip: '38 - 40', shoulder: '14.0' },
                    { size: 'M', bust: '36 - 38', waist: '30 - 32', hip: '40 - 42', shoulder: '14.5' },
                    { size: 'L', bust: '38 - 40', waist: '32 - 34', hip: '42 - 44', shoulder: '15.0' },
                    { size: 'XL', bust: '40 - 42', waist: '34 - 36', hip: '44 - 46', shoulder: '15.5' },
                    { size: 'XXL', bust: '42 - 44', waist: '36 - 38', hip: '46 - 48', shoulder: '16.0' },
                  ].map((row) => (
                    <TableRow key={row.size}>
                      <TableCell sx={{ fontWeight: 600 }}>{row.size}</TableCell>
                      <TableCell>{row.bust}</TableCell>
                      <TableCell>{row.waist}</TableCell>
                      <TableCell>{row.hip}</TableCell>
                      <TableCell>{row.shoulder}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ p: 2, bgcolor: 'background.default', borderLeft: '3px solid', borderColor: 'secondary.main' }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>How to measure yourself:</Typography>
              <Typography variant="body2" color="text.secondary">
                • <strong>Bust:</strong> Measure around the fullest part of your chest.<br />
                • <strong>Waist:</strong> Measure around the natural narrowest point above your navel.<br />
                • <strong>Hips:</strong> Measure around the fullest part of your hips with feet together.<br />
                • <strong>Need guidance?</strong> Chat with our stylist on WhatsApp for personalized measurement assistance.
              </Typography>
            </Box>
          </Box>
        )}

        {type === 'shipping' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Domestic Shipping (India)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We offer complimentary tracked express courier on all domestic orders above ₹5,000. Orders below ₹5,000 incur a flat shipping fee of ₹250.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • <strong>Ready-to-wear pieces:</strong> Dispatched within 24 to 48 hours; delivery within 3-5 business days.<br />
              • <strong>Bespoke / Made-to-measure orders:</strong> Each piece is meticulously hand-embroidered and tailored to your measurements; dispatch takes 10 to 14 business days.
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 600, mt: 2 }}>
              Worldwide International Shipping
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We proudly ship to patrons worldwide including the USA, UK, UAE, Canada, Australia, and Singapore via DHL Express (5-8 business days). International customs duty if applicable is payable by the recipient upon arrival.
            </Typography>
          </Box>
        )}

        {type === 'returns' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              7-Day Boutique Exchange & Alteration Guarantee
            </Typography>
            <Typography variant="body2" color="text.secondary">
              At Heritage Palate by Meghna, customer satisfaction and sartorial perfection are our highest priorities.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • <strong>Standard Sized Garments:</strong> Eligible for exchange or boutique credit within 7 calendar days of receipt, provided items are unworn, unwashed, with all original tags attached.<br />
              • <strong>Complimentary Alterations:</strong> If your standard garment requires a minor fit adjustment, our atelier offers complimentary alteration service within India.<br />
              • <strong>Custom Bespoke Orders:</strong> Because pieces made to custom measurements are tailored exclusively for you, they are non-refundable, but we will gladly adjust the fit at our atelier.
            </Typography>
          </Box>
        )}

        {type === 'faqs' && (
          <Box>
            {[
              {
                q: 'Are the Chikankari embroidery motifs genuine handmade work?',
                a: 'Yes, 100%. Every single motif on our Chikankari garments is handcrafted by traditional women artisans in Lucknow using heritage wooden block stamps and needlecraft passed down through generations.',
              },
              {
                q: 'Can I request a custom color or fabric modification?',
                a: 'Absolutely! As a bespoke luxury boutique, we frequently customize colors and fabrics for our patrons. Connect with us on WhatsApp or Instagram DM with your requested color palette.',
              },
              {
                q: 'How do I care for my handcrafted garments?',
                a: 'We strongly recommend professional dry cleaning for all our pure silk, chanderi, and heavily embellished Chikankari garments. Always store them wrapped in breathable pure cotton or muslin fabric.',
              },
              {
                q: 'How does WhatsApp ordering work?',
                a: 'You can browse products on the website, click "Ask on WhatsApp" or "Order via WhatsApp", and you will be connected directly with Meghna and our styling team with your pre-selected items to complete the booking smoothly.',
              },
            ].map((faq, idx) => (
              <Accordion key={idx} disableGutters elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{faq.q}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ color: 'text.secondary', fontSize: '0.9rem', pt: 0 }}>
                  {faq.a}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {(type === 'privacy' || type === 'terms') && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              At Heritage Palate by Meghna, we value your privacy and security. We collect only essential contact and measurement details strictly to fulfill your bespoke orders and provide concierge customer support. We never sell or share your personal data with third parties.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All transactions are encrypted and secured. By placing an order, patrons agree to our standard artisanal delivery timelines and boutique care recommendations.
            </Typography>
          </Box>
        )}

        {/* WhatsApp Consultation Prompt */}
        <Box sx={{ mt: 4, p: 2.5, bgcolor: 'action.hover', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Have more questions?</Typography>
            <Typography variant="caption" color="text.secondary">Our personal styling concierge is available Mon-Sat, 10 AM - 7 PM IST.</Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<WhatsAppIcon />}
            href="https://wa.me/917303466990?text=Hi%20Meghna!%20I%20have%20a%20question%20regarding%20Heritage%20Palate%20orders."
            target="_blank"
            sx={{ bgcolor: '#128C7E', color: '#fff', '&:hover': { bgcolor: '#075E54' } }}
          >
            Chat With Meghna
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
