import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Instagram as InstagramIcon,
  WhatsApp as WhatsAppIcon,
  EmailOutlined as EmailIcon,
  LocationOnOutlined as LocationIcon,
  AccessTimeOutlined as ClockIcon,
  SendOutlined as SendIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useStore } from '../context/StoreContext';

const Contact: React.FC = () => {
  const { submitInquiry, inquiries } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasionDate: '',
    category: 'Chikankari Suit Set',
    message: '',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const newInquiry = submitInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      occasionDate: formData.occasionDate,
      category: formData.category,
      message: formData.message,
    });

    setSubmittedId(newInquiry.id);
  };

  const handleSendToWhatsApp = () => {
    const brandWhatsApp = '917303466990';
    let text = `*New Styling / Custom Order Inquiry — Heritage Palate by Meghna*\n`;
    text += `Instagram: @heritagepalatebymeghna\n`;
    text += `Bio: A space for true handloom lovers ✨\n\n`;
    text += `• Name: ${formData.name}\n`;
    text += `• Phone: ${formData.phone}\n`;
    text += `• Email: ${formData.email || 'Not provided'}\n`;
    text += `• Interested In: ${formData.category}\n`;
    if (formData.occasionDate) text += `• Occasion Date: ${formData.occasionDate}\n`;
    text += `\n*Message:* ${formData.message || 'I would like styling and custom sizing guidance.'}\n`;

    const url = `https://wa.me/${brandWhatsApp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        {/* Editorial Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.22em' }}>
            Atelier Concierge & Customer Care
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.6rem' }, mt: 1, mb: 2 }}>
            Connect with Meghna
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
            &ldquo;A space for true handloom lovers ✨ Honoring the art, culture and stories behind every weave 💕&rdquo;
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* Left Column: Official Contact Channels */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ bgcolor: 'background.paper', p: { xs: 3, md: 5 }, border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <Typography variant="h4" sx={{ mb: 1, fontFamily: 'Playfair Display, serif' }}>
                Atelier Directory
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Reach us directly across our official channels or connect on WhatsApp for personal styling.
              </Typography>

              <Stack spacing={3.5}>
                {/* Official Instagram Page */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ p: 1, bgcolor: 'rgba(212, 175, 55, 0.1)', border: '1px solid #D4AF37' }}>
                    <InstagramIcon sx={{ color: '#D4AF37', fontSize: 24 }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Official Instagram Page
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Follow our daily handloom stories, client fits, and newest drops.
                    </Typography>
                    <Button
                      component="a"
                      href="https://www.instagram.com/heritagepalatebymeghna/"
                      target="_blank"
                      variant="text"
                      size="small"
                      sx={{ textTransform: 'none', color: 'secondary.main', p: 0, fontWeight: 600 }}
                    >
                      @heritagepalatebymeghna ↗
                    </Button>
                  </Box>
                </Box>

                {/* WhatsApp Concierge */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ p: 1, bgcolor: 'rgba(37, 211, 102, 0.1)', border: '1px solid #25D366' }}>
                    <WhatsAppIcon sx={{ color: '#25D366', fontSize: 24 }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Official WhatsApp Concierge
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Direct styling, fabric videos, and made-to-measure sizing.
                    </Typography>
                    <Button
                      component="a"
                      href="https://wa.me/917303466990?text=Hi%20Meghna!%20I%20am%20reaching%20out%20from%20the%20website%20for%20handloom%20styling%20assistance."
                      target="_blank"
                      variant="text"
                      size="small"
                      sx={{ textTransform: 'none', color: '#128C7E', p: 0, fontWeight: 600, fontSize: '0.95rem' }}
                    >
                      +91 73034 66990 (wa.me) ↗
                    </Button>
                  </Box>
                </Box>

                {/* Email */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ p: 1, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }}>
                    <EmailIcon sx={{ color: 'text.primary', fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Email Correspondence
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      orders@heritagepalate.com
                    </Typography>
                  </Box>
                </Box>

                {/* Location */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ p: 1, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }}>
                    <LocationIcon sx={{ color: 'text.primary', fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Heritage Studio & Atelier
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hazratganj Boutique Quarter, Lucknow, Uttar Pradesh 226001, India
                    </Typography>
                  </Box>
                </Box>

                {/* Hours */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ p: 1, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }}>
                    <ClockIcon sx={{ color: 'text.primary', fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Concierge Hours
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Monday to Saturday: 10:00 AM – 7:30 PM IST<br />
                      Sunday: Private styling sessions by appointment
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Right Column: Interactive Bespoke Inquiry Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ bgcolor: 'background.paper', p: { xs: 3, md: 5 }, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h4" sx={{ mb: 1, fontFamily: 'Playfair Display, serif' }}>
                Bespoke Order & Styling Request
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Fill out your requirements below. Your inquiry is safely logged in our boutique system and can also be dispatched directly to Meghna on WhatsApp.
              </Typography>

              {submittedId ? (
                <Box sx={{ p: 4, bgcolor: 'background.default', border: '1px solid', borderColor: 'secondary.main', textAlign: 'center' }}>
                  <CheckIcon sx={{ fontSize: 54, color: 'secondary.main', mb: 1.5 }} />
                  <Typography variant="h5" sx={{ mb: 1, fontFamily: 'Playfair Display, serif' }}>
                    Inquiry Logged #{submittedId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 480, mx: 'auto' }}>
                    Thank you, {formData.name}! Your request has been saved in your session. For fastest response, connect with Meghna on WhatsApp (+91 73034 66990).
                  </Typography>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      startIcon={<WhatsAppIcon />}
                      onClick={handleSendToWhatsApp}
                      sx={{ bgcolor: '#128C7E', color: '#fff', '&:hover': { bgcolor: '#075E54' } }}
                    >
                      Chat with Meghna on WhatsApp
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setSubmittedId(null);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          occasionDate: '',
                          category: 'Chikankari Suit Set',
                          message: '',
                        });
                      }}
                    >
                      Submit Another Inquiry
                    </Button>
                  </Stack>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Radhika Sharma"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        label="Phone / WhatsApp Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 73034 66990"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Email Address (Optional)"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="radhika@example.com"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Occasion / Delivery Date (Optional)"
                        value={formData.occasionDate}
                        onChange={(e) => setFormData({ ...formData, occasionDate: e.target.value })}
                        placeholder="e.g. Dec 15, Wedding Festivity"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        select
                        fullWidth
                        label="Collection / Craft of Interest"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                      >
                        {[
                          'Chikankari Suit Set',
                          'Ivory Anarkali Set',
                          'Handloom Banarasi Saree',
                          'Chanderi Tissue Saree',
                          'Bespoke Bridal / Trousseau Order',
                          'Custom Color & Measurement Request',
                        ].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Your Requirements / Sizing Questions"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please tell us about your required sizes, customization preferences, or any specific pieces you saw on Instagram (@heritagepalatebymeghna)..."
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        startIcon={<SendIcon />}
                        sx={{ py: 1.8, fontWeight: 600, letterSpacing: '0.1em' }}
                      >
                        Submit Inquiry to Atelier
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Saved Inquiries in LocalStorage */}
              {inquiries.length > 0 && (
                <Box sx={{ mt: 5, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="subtitle2" sx={{ letterSpacing: '0.08em', mb: 2, textTransform: 'uppercase' }}>
                    Your Logged Inquiries ({inquiries.length})
                  </Typography>
                  <Stack spacing={2}>
                    {inquiries.slice(0, 3).map((inq) => (
                      <Box key={inq.id} sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                            {inq.id} • {inq.category}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {inq.date}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                          {inq.message || 'Direct styling request'}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
