'use client'

import { Container, Box, Typography, Paper } from "@mui/material";
import MainLayout from "@/components/Layout/MainLayout";
import NewsAggregator from "@/components/LosAndesNews/MdzolNews";

export default function NewsPage() {
  return (
    <MainLayout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Paper elevation={3} sx={{ p: 1 }}>
            <Typography variant="h5" gutterBottom>
              Pronóstico del Clima
            </Typography>
            {/* <WeatherComponent forecast={forecast} /> */}
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper elevation={4} sx={{ p: 1 }}>
            <Typography variant="h5" gutterBottom>
              Noticias Destacadas
            </Typography>
            <NewsAggregator />
          </Paper>
        </Box>
      </Container>
    </MainLayout>
  );
}