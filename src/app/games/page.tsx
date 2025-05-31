'use client'

import { Container, Box, Typography, Paper, Button, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";
import MainLayout from "@/components/Layout/MainLayout";
import { useState } from "react";

// Animaciones
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
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

const gamesData = [
  {
    id: 1,
    title: "Adivina el Número",
    description: "Prueba tu intuición adivinando el número secreto entre 1 y 100",
    category: "Adivinanza",
    difficulty: "Fácil",
    path: "/games/number-guess",
    image: "/images/game1.jpg"
  },
  {
    id: 2,
    title: "Memorama",
    description: "Encuentra las parejas de cartas en el menor tiempo posible",
    category: "Memoria",
    difficulty: "Medio",
    path: "/games/memory",
    image: "/images/game2.jpg"
  },
  {
    id: 3,
    title: "Tres en Raya",
    description: "El clásico juego de estrategia para dos jugadores",
    category: "Estrategia",
    difficulty: "Fácil",
    path: "/games/tic-tac-toe",
    image: "/images/game3.jpg"
  },
  {
    id: 4,
    title: "Sudoku",
    description: "Completa la cuadrícula respetando las reglas del sudoku",
    category: "Lógica",
    difficulty: "Difícil",
    path: "/games/sudoku",
    image: "/images/game4.jpg"
  },
  {
    id: 5,
    title: "Ahorcado",
    description: "Adivina la palabra antes de que se complete el dibujo",
    category: "Palabras",
    difficulty: "Medio",
    path: "/games/hangman",
    image: "/images/game5.jpg"
  },
  {
    id: 6,
    title: "Rompecabezas",
    description: "Arma la imagen mezclada en el menor tiempo posible",
    category: "Habilidad",
    difficulty: "Medio",
    path: "/games/puzzle",
    image: "/images/game6.jpg"
  }
];

const categories = ["Todos", "Adivinanza", "Memoria", "Estrategia", "Lógica", "Palabras", "Habilidad"];

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredGames = selectedCategory === "Todos"
    ? gamesData
    : gamesData.filter(game => game.category === selectedCategory);

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component={motion.h1}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              mb: 2
            }}
          >
            Juegos LlakaScript
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Diviértete con nuestra colección de juegos interactivos
          </Typography>
        </Box>

        {/* Categories Filter */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                clickable
                variant={selectedCategory === category ? "filled" : "outlined"}
                color="primary"
                onClick={() => setSelectedCategory(category)}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </Stack>
        </Box>

        {/* Games with Stack layout instead of Grid */}
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          spacing={4}
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredGames.map((game) => (
            <Box
              key={game.id}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%' },
                minWidth: 280,
                flexGrow: 1
              }}
            >
              <Paper
                component={motion.div}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    backgroundImage: `url(${game.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {game.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {game.description}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip label={game.category} size="small" />
                    <Chip label={game.difficulty} size="small" color="secondary" />
                  </Stack>
                </Box>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    href={game.path}
                    fullWidth
                    component={motion.a}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Jugar ahora
                  </Button>
                </Box>
              </Paper>
            </Box>
          ))}
        </Stack>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              No hay juegos en esta categoría
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setSelectedCategory("Todos")}
            >
              Ver todos los juegos
            </Button>
          </Box>
        )}
      </Container>
    </MainLayout>
  );
};

export default Page;
