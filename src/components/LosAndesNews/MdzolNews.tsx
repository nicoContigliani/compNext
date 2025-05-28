"use client"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  Alert,
  AlertTitle,
  Box,
  Typography,
  Divider,
  CircularProgress,
  IconButton,
  Paper,
  Container,
  useMediaQuery,
  Theme,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  List as ListIcon,
  Schedule as ClockIcon,
  Public as GlobeIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNewsAggregator } from '@/hooks/useNewsAggregator';
import WeatherComponent from '../Weatherplaceholders/WeatherComponent';

// Color palette
const COLORS = {
  primary: '#3f51b5',
  secondary: '#f50057',
  background: '#f8f9fa',
  cardBackground: '#ffffff',
  textPrimary: '#212529',
  textSecondary: '#6c757d',
  border: '#e9ecef',
  error: '#dc3545',
  warning: '#ffc107',
  success: '#28a745',
};

// Animation variants
const sidebarVariants = {
  open: { x: 0, opacity: 1 },
  closed: { x: '-100%', opacity: 0 },
};

const cardVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  hover: { y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
};

export default function NewsAggregator() {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  const {
    loading,
    error,
    paginaSidebar,
    busquedaTema,
    ultimaActualizacion,
    modoDemo,
    gruposSidebar,
    totalPaginasSidebar,
    grupoActual,
    fuentes,
    grupoSeleccionado,
    setGrupoSeleccionado,
    setPaginaSidebar,
    setBusquedaTema,
    fetchNews,
    getFuenteColor,
  } = useNewsAggregator();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: COLORS.background,
          p: 3,
          gap: 4,
        }}
      >
        {/* Weather Card */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            boxShadow: 3,
            borderRadius: 3,
            backgroundColor: 'white',
            p: 3,
          }}
        >
          <WeatherComponent />
        </Box>

        {/* Loading Spinner */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        >
          <CircularProgress size={60} sx={{ color: COLORS.primary }} />
        </motion.div>

        {/* Texts */}
        <Box textAlign="center">
          <Typography variant="h5" sx={{ color: COLORS.textPrimary, mb: 1 }}>
            Cargando y agrupando noticias...
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
            Analizando similitudes entre títulos
          </Typography>
        </Box>

        {/* Animated List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            'Conectando con fuentes de noticias',
            'Extrayendo contenido',
            'Agrupando por similitud',
          ].map((text, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
            >
              <Typography
                variant="body2"
                sx={{ color: COLORS.textSecondary, mb: 0.5 }}
              >
                • {text}
              </Typography>
            </motion.div>
          ))}
        </motion.div>
      </Box>
    );
  }


  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Error al cargar las noticias</AlertTitle>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold' }}>
              Posibles causas:
            </Typography>
            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
              <li>Los sitios web pueden estar bloqueando el acceso automatizado</li>
              <li>Problemas de conectividad de red</li>
              <li>Cambios en la estructura de los sitios web</li>
              <li>Rate limiting de las fuentes</li>
            </Box>
            <Button
              variant="outlined"
              onClick={fetchNews}
              startIcon={<RefreshIcon />}
              sx={{ borderColor: COLORS.error, color: COLORS.error }}
            >
              Reintentar
            </Button>
          </Alert>
        </motion.div>
      </Container>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: COLORS.background,
      flexDirection: isMobile ? 'column' : 'row',
    }}>
      {/* Mobile Header */}
      {isMobile && (
        <Paper sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 0,
          boxShadow: 1,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={toggleSidebar} sx={{ mr: 1 }}>
              {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6">Agregador de Noticias</Typography>
          </Box>
          <IconButton onClick={fetchNews}>
            <RefreshIcon />
          </IconButton>
        </Paper>
      )}

      {/* Sidebar - Temario */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <motion.div
            initial={isMobile ? 'closed' : 'open'}
            animate={sidebarOpen ? 'open' : 'closed'}
            variants={sidebarVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: isMobile ? 'fixed' : 'relative',
              top: 0,
              left: 0,
              bottom: 0,
              zIndex: 1000,
              width: isMobile ? '85%' : '320px',
              height: '100vh',
              backgroundColor: 'white',
              overflowY: 'auto',
            }}
          >
            <Paper
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 0,
                borderRight: `1px solid ${COLORS.border}`,
              }}
            >
              {/* Encabezado */}
              <Box sx={{ p: 2, borderBottom: `1px solid ${COLORS.border}` }}>
                {!isMobile && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListIcon sx={{ mr: 1 }} />
                      Temario
                    </Typography>
                    <IconButton onClick={fetchNews} size="small">
                      <RefreshIcon />
                    </IconButton>
                  </Box>
                )}

                {modoDemo && (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      Mostrando datos de ejemplo. Los sitios web pueden estar bloqueando el acceso.
                    </Typography>
                  </Alert>
                )}

                {/* Buscador */}
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Buscar temas..."
                  value={busquedaTema}
                  onChange={(e) => {
                    setBusquedaTema(e.target.value);
                    setPaginaSidebar(1);
                  }}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: COLORS.textSecondary }} />,
                  }}
                  sx={{ mb: 2 }}
                />

                {/* Chips de resumen */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label={`${gruposSidebar.length} temas`} size="small" variant="outlined" sx={{ mb: 1 }} />
                  <Chip
                    label={`${gruposSidebar.reduce((acc, grupo) => acc + grupo.noticias.length, 0)} noticias`}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                </Box>
              </Box>

              {/* Lista de grupos */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                {gruposSidebar.map((grupo) => (
                  <motion.div
                    key={grupo.id}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        mb: 2,
                        cursor: 'pointer',
                        border: grupoSeleccionado === grupo.id
                          ? `2px solid ${COLORS.primary}`
                          : `1px solid ${COLORS.border}`,
                        backgroundColor: grupoSeleccionado === grupo.id
                          ? '#f0f4ff'
                          : COLORS.cardBackground,
                      }}
                      onClick={() => {
                        setGrupoSeleccionado(grupo.id);
                        if (isMobile) setSidebarOpen(false);
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 'medium',
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            color: COLORS.textPrimary,
                          }}
                        >
                          {grupo.tema}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                          {grupo.palabrasClave.slice(0, 2).map((palabra, idx) => (
                            <Chip
                              key={idx}
                              label={palabra}
                              size="small"
                              variant="outlined"
                              sx={{
                                backgroundColor: COLORS.background,
                                borderColor: COLORS.border,
                              }}
                            />
                          ))}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>
                            {grupo.noticias.length} noticia{grupo.noticias.length !== 1 ? 's' : ''}
                          </Typography>
                          <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>
                            {new Set(grupo.noticias.map((n) => n.fuente)).size} fuente
                            {new Set(grupo.noticias.map((n) => n.fuente)).size !== 1 ? 's' : ''}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>

              {/* Paginación */}
              {totalPaginasSidebar > 1 && (
                <Box sx={{ p: 2, borderTop: `1px solid ${COLORS.border}` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton
                      onClick={() => setPaginaSidebar((prev) => Math.max(1, prev - 1))}
                      disabled={paginaSidebar === 1}
                      size="small"
                    >
                      <ChevronLeftIcon />
                    </IconButton>

                    <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
                      {paginaSidebar} / {totalPaginasSidebar}
                    </Typography>

                    <IconButton
                      onClick={() => setPaginaSidebar((prev) => Math.min(totalPaginasSidebar, prev + 1))}
                      disabled={paginaSidebar === totalPaginasSidebar}
                      size="small"
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenido Principal */}
      <Box sx={{
        flex: 1,
        overflow: 'auto',
        p: isMobile ? 2 : 4,
        backgroundColor: COLORS.background,
      }}>
        {grupoActual ? (
          <Box>
            {/* Título y metadatos */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{
                mb: 2,
                fontWeight: 700,
                color: COLORS.textPrimary,
              }}>
                📌 {grupoActual.tema}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
                {grupoActual.palabrasClave.map((palabra, idx) => (
                  <Chip
                    key={idx}
                    label={`#${palabra}`}
                    variant="outlined"
                    sx={{
                      backgroundColor: COLORS.cardBackground,
                      borderColor: COLORS.border,
                      color: COLORS.textSecondary,
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
                  📰 {grupoActual.noticias.length} noticias encontradas
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
                  🌐 {new Set(grupoActual.noticias.map((n) => n.fuente)).size} fuentes diferentes
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3, borderColor: COLORS.border }} />

            {/* Lista de noticias */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <AnimatePresence>
                {grupoActual.noticias.map((noticia, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    transition={{ duration: 0.3 }}
                  >
                    <Card elevation={3} sx={{
                      backgroundColor: COLORS.cardBackground,
                      borderRadius: 3,
                      border: `1px solid ${COLORS.border}`,
                      transition: 'transform 0.3s',
                    }}>
                      <CardContent sx={{ p: 0 }}>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: isMobile ? 'column' : 'row',
                          alignItems: 'stretch',
                        }}>
                          {/* Sección de imagen */}
                          <Box sx={{
                            width: isMobile ? '100%' : '200px',
                            minHeight: isMobile ? '150px' : 'auto',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            borderRight: isMobile ? 'none' : `1px solid ${COLORS.border}`,
                            borderBottom: isMobile ? `1px solid ${COLORS.border}` : 'none',
                          }}>
                            {noticia.imagen ? (
                              <img
                                src={noticia.imagen}
                                alt={noticia.titulo}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />
                            ) : (
                              <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                color: COLORS.textSecondary,
                              }}>
                                <ImageIcon sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="caption" align="center">
                                  Imagen no disponible
                                </Typography>
                              </Box>
                            )}
                          </Box>

                          {/* Sección de contenido */}
                          <Box sx={{
                            flex: 1,
                            p: isMobile ? 2 : 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}>
                            <Box>
                              <Typography variant="h6" sx={{
                                mb: 1,
                                lineHeight: 1.4,
                                color: COLORS.textPrimary,
                                fontWeight: 600,
                              }}>
                                {noticia.titulo}
                              </Typography>

                              <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                flexWrap: 'wrap',
                                mb: 2,
                              }}>
                                <Chip
                                  label={noticia.fuente}
                                  size="small"
                                  sx={{
                                    ...getFuenteColor(noticia.dominio),
                                    fontWeight: 500,
                                    border: '1px solid',
                                    borderColor: getFuenteColor(noticia.dominio).color,
                                  }}
                                />
                                <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>
                                  {noticia.dominio}
                                </Typography>
                                {modoDemo && (
                                  <Chip
                                    label="Ejemplo"
                                    size="small"
                                    variant="outlined"
                                    color="warning"
                                    sx={{
                                      borderColor: COLORS.warning,
                                      color: COLORS.warning,
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>

                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<OpenInNewIcon />}
                                href={noticia.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  flexShrink: 0,
                                  borderColor: COLORS.primary,
                                  color: COLORS.primary,
                                  borderRadius: 2,
                                  '&:hover': {
                                    backgroundColor: COLORS.primary,
                                    color: '#fff',
                                  }
                                }}
                              >
                                Leer más
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>
          </Box>
        ) : (
          // Mensaje sin selección
          <Box sx={{
            textAlign: 'center',
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <ListIcon sx={{
                fontSize: 64,
                color: COLORS.textSecondary,
                mb: 2,
              }} />
            </motion.div>

            <Typography variant="h6" sx={{
              mb: 1,
              color: COLORS.textSecondary,
              fontWeight: 500,
            }}>
              👋 ¡Hola! Aún no has seleccionado un tema
            </Typography>

            <Typography variant="body2" sx={{
              color: COLORS.textSecondary,
              maxWidth: '320px',
            }}>
              Elige un tema desde el panel lateral para ver las noticias relacionadas y descubrir más contenido interesante.
            </Typography>

            {isMobile && (
              <Button
                variant="contained"
                onClick={toggleSidebar}
                sx={{
                  mt: 4,
                  backgroundColor: COLORS.primary,
                  borderRadius: 2,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#303f9f',
                  }
                }}
              >
                Ver temas disponibles
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}