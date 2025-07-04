'use client'

import { Container, Box, Typography, Paper, Button, Stack, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { redden } from "@/services/storage.services";
import { useEffect } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import ImageSlider from "@/components/Slider/ImageSlider";
import WeatherComponent from "@/components/wheater/Wheater";

// Animaciones
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  // Datos para el slider
  const sliderItems = [
    {
      image: '/images/weather.png',
      title: 'Bienvenido a LlakaScript Media',
      description: 'Tu plataforma integral para información y entretenimiento'
    },
    {
      image: '/images/news.jpg',
      title: 'Últimas noticias',
      description: 'Mantente informado con nuestras fuentes confiables'
    },
    {
      image: '/images/plays.jpg',
      title: 'Juegos emocionantes',
      description: 'Diviértete con nuestra exclusiva colección de juegos'
    }
  ];

  // Datos para las tarjetas destacadas
  const featureCards = [
    {
      title: 'Noticias',
      description: 'Mantente informado con lo último en actualidad',
      buttonText: 'Ver Noticias',
      path: '/news',
      icon: '📰'
    },
    {
      title: 'Juegos',
      description: 'Descubre nuestra colección de juegos divertidos',
      buttonText: 'Explorar Juegos',
      path: '/games',
      icon: '🎮'
    },
    {
      title: 'Clima',
      description: 'Consulta el pronóstico actualizado',
      buttonText: 'Ver Clima',
      path: '#weather',
      icon: '⛅'
    }
  ];

  useEffect(() => {
    redden({ email: 'nico.contigliani' });
  }, []);

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        {/* Hero Title */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography
            variant="h2"
            component={motion.h1}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            LlakaScript Media
          </Typography>
          <Typography
            variant="subtitle1"
            component={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            sx={{
              color: 'text.secondary',
              mt: 1
            }}
          >
            Información, entretenimiento y tecnología en un solo lugar
          </Typography>
        </Box>

        {/* Hero Section with Slider */}
        <Box sx={{ mb: 8 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <ImageSlider
              items={sliderItems}
              autoPlay={true}
              interval={6000}
              showControls={true}
              showIndicators={true}
            />
          </motion.div>
        </Box>

        {/* Features Section */}
        <Stack spacing={6} sx={{ mb: 8 }} component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Typography variant="h3" component={motion.h2} variants={fadeInUp} sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'primary.main'
          }}>
            Nuestros Servicios
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center">
            {featureCards.map((card, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: '100%', md: '30%' },
                  minWidth: 280
                }}
                component={motion.div}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 2 }}>
                    {card.icon}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                    {card.description}
                  </Typography>
                  <Button
                    variant="contained"
                    href={card.path}
                    sx={{
                      mt: 'auto',
                      px: 4,
                      py: 1,
                      borderRadius: 2
                    }}
                    component={motion.a}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {card.buttonText}
                  </Button>
                </Paper>
              </Box>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: 6 }} />

        {/* Weather Section */}
        <Box id="weather" sx={{ mb: 8 }} component={motion.section}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Typography variant="h3" component="h2" sx={{
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center',
            color: 'primary.main'
          }}>
            Pronóstico del Tiempo
          </Typography>
          <Paper elevation={3} sx={{
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(to right, #f5f7fa, #e4e8f0)'
          }}>
            <WeatherComponent />
          </Paper>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Welcome Section */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} sx={{ mb: 6 }} alignItems="center">
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            sx={{
              width: { xs: '100%', md: '50%' },
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 3
            }}
          >
            <Box
              component="img"
              src="/images/llakaScript.png"
              alt="Bienvenido a LlakaScript Media"
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            sx={{ width: { xs: '100%', md: '50%' } }}
          >
            <Typography variant="h3" gutterBottom sx={{
              fontWeight: 'bold',
              mb: 3
            }}>
              ¡Bienvenido a LlakaScript Media!
            </Typography>
            <Typography variant="body1" paragraph sx={{
              fontSize: '1.1rem',
              mb: 2,
              lineHeight: 1.6
            }}>
              Somos tu plataforma integral para noticias actualizadas, juegos emocionantes
              y información meteorológica confiable. En LlakaScript Media combinamos
              tecnología y contenido de calidad para ofrecerte la mejor experiencia.
            </Typography>
            <Typography variant="body1" paragraph sx={{
              fontSize: '1.1rem',
              mb: 2,
              lineHeight: 1.6
            }}>
              Navega a través de nuestras secciones y descubre todo lo que tenemos
              para ofrecerte. Nuestro objetivo es brindarte una experiencia única
              donde puedas informarte, entretenerte y planificar tu día con herramientas
              innovadoras.
            </Typography>
            <Button
              variant="outlined"
              size="large"
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                borderRadius: 2
              }}
              component={motion.a}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Conoce más sobre nosotros
            </Button>
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}