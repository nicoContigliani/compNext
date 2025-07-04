'use client';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';

const AdPlanCard = ({ title, price, features }: { 
  title: string; 
  price: string; 
  features: string[] 
}) => (
  <Paper sx={{
    p: 3,
    mb: 3,
    borderTop: '4px solid #d50000',
    flex: 1,
    minWidth: 250,
    mx: 1,
    '&:hover': {
      boxShadow: 3
    }
  }}>
    <Typography variant="h5" sx={{ 
      color: '#d50000',
      fontFamily: '"Playfair Display", serif',
      mb: 1
    }}>
      {title}
    </Typography>
    <Typography variant="h6" sx={{ mb: 2 }}>
      {price}
    </Typography>
    <Divider sx={{ my: 2 }} />
    <Box component="ul" sx={{ pl: 2 }}>
      {features.map((feature, i) => (
        <Typography 
          key={i} 
          component="li" 
          variant="body2" 
          sx={{ mb: 1 }}
        >
          {feature}
        </Typography>
      ))}
    </Box>
  </Paper>
);

export default function PublicidadPage() {
  const adPlans = [
    {
      title: "Banner Pequeño",
      price: "$5.000/mes",
      features: ["200x100px", "Sección elegida", "15 días"]
    },
    {
      title: "Banner Grande",
      price: "$9.000/mes",
      features: ["300x250px", "Destacado en sección", "Incluye logo", "30 días"]
    },
    {
      title: "Nota Patrocinada",
      price: "$15.000",
      features: ["Artículo destacado", "Redacción profesional", "45 días visible"]
    }
  ];

  return (
    <Box sx={{ 
      maxWidth: 1000,
      mx: 'auto',
      px: { xs: 2, md: 4 },
      py: 4,
      fontFamily: '"Libre Baskerville", serif'
    }}>
      <Typography variant="h2" sx={{ 
        color: '#d50000',
        fontFamily: '"Playfair Display", serif',
        mb: 3,
        textAlign: 'center',
        fontSize: { xs: '2rem', md: '2.5rem' }
      }}>
        Espacios Publicitarios
      </Typography>
      
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        alignItems: { xs: 'center', md: 'flex-start' },
        flexWrap: 'wrap',
        gap: 2,
        mb: 4
      }}>
        {adPlans.map((plan, i) => (
          <AdPlanCard key={i} {...plan} />
        ))}
      </Box>
      
      <Paper sx={{ 
        p: 4,
        mt: 4,
        borderLeft: '4px solid #d50000',
        bgcolor: 'rgba(213, 0, 0, 0.05)'
      }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Contacto Comercial
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: '#d50000',
            '&:hover': { bgcolor: '#b71c1c' },
            px: 4,
            fontFamily: '"Roboto Condensed", sans-serif'
          }}
        >
          publicidad@losandesdigital.com
        </Button>
      </Paper>
    </Box>
  );
}