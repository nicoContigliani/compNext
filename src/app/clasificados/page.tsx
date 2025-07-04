// // app/clasificados/page.tsx
// 'use client';
// import { Box, Typography, Paper, Button, Avatar, Divider, Chip, Container } from '@mui/material';
// import { LocalOffer, Phone, Place, Schedule, Business, Star } from '@mui/icons-material';
// import { motion } from 'framer-motion';

// // Usando tu paleta de colores existente
// const COLORS = {
//   primary: "#3f51b5",
//   secondary: "#f50057",
//   background: "#f8f9fa",
//   cardBackground: "#ffffff",
//   textPrimary: "#1a202c",
//   textSecondary: "#718096",
//   border: "#e2e8f0",
//   error: "#e53e3e",
//   warning: "#dd6b20",
//   success: "#38a169",
//   accent: "#667eea",
//   gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// };

// const cardVariants = {
//   initial: { y: 20, opacity: 0 },
//   animate: { y: 0, opacity: 1 },
//   hover: {
//     y: -5,
//     boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//     transition: { duration: 0.3 },
//   },
// };

// const AnunciantesPage = () => {
//   const anunciantes = [
//     {
//       id: 1,
//       nombre: "Farmacia San José",
//       rubro: "Salud",
//       descripcion: "Servicio 24 horas con delivery gratuito en el barrio",
//       telefono: "261-555-1234",
//       direccion: "Av. San Martín 1234",
//       horario: "Lunes a Domingo 00-24hs",
//       destacado: true,
//       antiguedad: "Desde 1995"
//     },
//     {
//       id: 2,
//       nombre: "Panadería La Esquina",
//       rubro: "Alimentos",
//       descripcion: "Panadería artesanal con horno a leña. Pruebe nuestras facturas!",
//       telefono: "261-555-5678",
//       direccion: "Belgrano 567",
//       horario: "Lunes a Sábado 7-13hs y 17-20hs",
//       antiguedad: "Desde 2010"
//     },
//     {
//       id: 3,
//       nombre: "Electricidad López",
//       rubro: "Servicios",
//       descripcion: "Soluciones eléctricas certificadas con garantía escrita",
//       telefono: "261-555-9012",
//       direccion: "Mitre 789",
//       horario: "Lunes a Viernes 9-18hs",
//       antiguedad: "Desde 2005"
//     },
//     {
//       id: 4,
//       nombre: "Verdulería Fresco",
//       rubro: "Alimentos",
//       descripcion: "Frutas y verduras frescas diariamente de productores locales",
//       telefono: "261-555-3456",
//       direccion: "Sarmiento 456",
//       horario: "Lunes a Sábado 8-14hs y 16-20hs",
//       antiguedad: "Desde 2018"
//     }
//   ];

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Cabecera con animación */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Paper elevation={0} sx={{
//           p: 4,
//           mb: 4,
//           textAlign: 'center',
//           background: COLORS.gradient,
//           color: 'white',
//           borderRadius: 3,
//           overflow: 'hidden',
//           position: 'relative',
//           '&:after': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: 'rgba(0,0,0,0.05)'
//           }
//         }}>
//           <Typography variant="h3" sx={{
//             fontWeight: 700,
//             position: 'relative',
//             zIndex: 1,
//             mb: 1,
//             fontSize: { xs: '2rem', md: '2.5rem' }
//           }}>
//             <Business sx={{ fontSize: 'inherit', verticalAlign: 'middle', mr: 1 }} />
//             Clasificados del Barrio
//           </Typography>
//           <Typography variant="h6" sx={{ opacity: 0.9, position: 'relative', zIndex: 1 }}>
//             Conectamos vecinos con los mejores negocios locales
//           </Typography>
//         </Paper>
//       </motion.div>

//       {/* Filtros */}
//       <Box sx={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: 2,
//         mb: 4,
//         justifyContent: 'center',
//         '& .MuiChip-root': {
//           transition: 'all 0.3s',
//           '&:hover': {
//             transform: 'translateY(-2px)'
//           }
//         }
//       }}>
//         <Chip label="Todos" variant="outlined" clickable sx={{
//           borderColor: COLORS.primary,
//           color: COLORS.primary,
//           fontWeight: 600
//         }} />
//         <Chip label="Alimentos" clickable sx={{
//           bgcolor: '#38a169',
//           color: 'white',
//           fontWeight: 600
//         }} />
//         <Chip label="Servicios" clickable sx={{
//           bgcolor: '#dd6b20',
//           color: 'white',
//           fontWeight: 600
//         }} />
//         <Chip label="Salud" clickable sx={{
//           bgcolor: '#667eea',
//           color: 'white',
//           fontWeight: 600
//         }} />
//         <Chip label="Destacados" clickable icon={<Star />} sx={{
//           bgcolor: COLORS.secondary,
//           color: 'white',
//           fontWeight: 600
//         }} />
//       </Box>

//       {/* Listado de anunciantes */}
//       <Box sx={{
//         display: 'grid',
//         gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
//         gap: 3,
//         mb: 6
//       }}>
//         {anunciantes.map((anunciante, index) => (
//           <motion.div
//             key={anunciante.id}
//             variants={cardVariants}
//             initial="initial"
//             animate="animate"
//             whileHover="hover"
//             transition={{ delay: index * 0.1 }}
//           >
//             <Paper elevation={3} sx={{
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               borderRadius: 3,
//               overflow: 'hidden',
//               border: anunciante.destacado ? `2px solid ${COLORS.secondary}` : `1px solid ${COLORS.border}`,
//               transition: 'all 0.3s'
//             }}>
//               {/* Encabezado con efecto */}
//               <Box sx={{
//                 p: 3,
//                 pb: 0,
//                 position: 'relative',
//                 background: anunciante.destacado ? 'linear-gradient(to right, #fff5f5, #ffffff)' : 'white'
//               }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <Avatar sx={{
//                     width: 60,
//                     height: 60,
//                     mr: 2,
//                     bgcolor: anunciante.destacado ? COLORS.secondary : COLORS.primary,
//                     color: 'white',
//                     fontSize: '1.5rem',
//                     fontWeight: 'bold'
//                   }}>
//                     {anunciante.nombre.charAt(0)}
//                   </Avatar>
//                   <Box>
//                     <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                       {anunciante.nombre}
//                     </Typography>
//                     <Chip label={anunciante.rubro} size="small" sx={{
//                       bgcolor: anunciante.destacado ? COLORS.secondary : COLORS.primary,
//                       color: 'white',
//                       fontWeight: 600,
//                       mt: 0.5
//                     }} />
//                   </Box>
//                 </Box>

//                 {anunciante.destacado && (
//                   <Box sx={{
//                     position: 'absolute',
//                     top: 10,
//                     right: 10,
//                     display: 'flex',
//                     alignItems: 'center'
//                   }}>
//                     <Star sx={{ color: COLORS.secondary, fontSize: 20 }} />
//                     <Typography variant="caption" sx={{
//                       ml: 0.5,
//                       fontWeight: 700,
//                       color: COLORS.secondary
//                     }}>
//                       Destacado
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>

//               {/* Cuerpo */}
//               <Box sx={{ p: 3, pt: 0, flex: 1 }}>
//                 <Typography paragraph sx={{
//                   fontStyle: 'italic',
//                   color: COLORS.textPrimary,
//                   mb: 2
//                 }}>
//                   "{anunciante.descripcion}"
//                 </Typography>

//                 <Divider sx={{ my: 2 }} />

//                 <Box sx={{ '& > div': { display: 'flex', mb: 1.5 } }}>
//                   <Box>
//                     <Place fontSize="small" sx={{ mr: 1.5, color: COLORS.textSecondary }} />
//                     <Typography variant="body2">{anunciante.direccion}</Typography>
//                   </Box>
//                   <Box>
//                     <Phone fontSize="small" sx={{ mr: 1.5, color: COLORS.textSecondary }} />
//                     <Typography variant="body2">{anunciante.telefono}</Typography>
//                   </Box>
//                   <Box>
//                     <Schedule fontSize="small" sx={{ mr: 1.5, color: COLORS.textSecondary }} />
//                     <Typography variant="body2">{anunciante.horario}</Typography>
//                   </Box>
//                   <Box>
//                     <Business fontSize="small" sx={{ mr: 1.5, color: COLORS.textSecondary }} />
//                     <Typography variant="body2">{anunciante.antiguedad}</Typography>
//                   </Box>
//                 </Box>
//               </Box>

//               {/* Pie */}
//               <Box sx={{ p: 2, bgcolor: '#f8f9fa', textAlign: 'center' }}>
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   href={`tel:${anunciante.telefono}`}
//                   sx={{
//                     bgcolor: anunciante.destacado ? COLORS.secondary : COLORS.primary,
//                     fontWeight: 600,
//                     '&:hover': {
//                       bgcolor: anunciante.destacado ? '#c51162' : '#303f9f'
//                     }
//                   }}
//                 >
//                   Llamar ahora
//                 </Button>
//               </Box>
//             </Paper>
//           </motion.div>
//         ))}
//       </Box>

//       {/* CTA para nuevos anunciantes */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <Paper elevation={0} sx={{
//           p: 4,
//           background: 'linear-gradient(to right, #f8f9fa, #ffffff)',
//           border: `2px dashed ${COLORS.primary}`,
//           borderRadius: 3,
//           textAlign: 'center'
//         }}>
//           <Typography variant="h4" sx={{ 
//             fontWeight: 700,
//             mb: 2,
//             color: COLORS.textPrimary
//           }}>
//             ¿Quieres aparecer aquí?
//           </Typography>
//           <Typography variant="body1" sx={{ 
//             mb: 3,
//             color: COLORS.textSecondary,
//             maxWidth: 600,
//             mx: 'auto'
//           }}>
//             Promociona tu negocio ante miles de vecinos por menos de $10 por día. 
//             Espacios limitados para mantener la calidad.
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             sx={{
//               bgcolor: COLORS.primary,
//               px: 6,
//               py: 1.5,
//               fontWeight: 700,
//               fontSize: '1.1rem',
//               '&:hover': {
//                 bgcolor: '#303f9f',
//                 transform: 'translateY(-2px)'
//               },
//               transition: 'all 0.3s'
//             }}
//           >
//             Publicitar mi negocio
//           </Button>
//         </Paper>
//       </motion.div>
//     </Container>
//   );
// };

// export default AnunciantesPage;


// app/clasificados/page.tsx
'use client';
import { Box, Typography, Paper, Button, Avatar, Divider, Chip, Container, IconButton } from '@mui/material';
import { Phone, Place, Schedule, Star, Share, Bookmark, LocalOffer } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const COLORS = {
  primary: "#3f51b5",
  secondary: "#f50057",
  background: "#f8f9fa",
  cardBackground: "#ffffff",
  textPrimary: "#1a202c",
  textSecondary: "#718096",
  border: "#e2e8f0",
  accent: "#667eea",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const AnunciantesPremium = () => {
  const anunciantes = [
    {
      id: 1,
      nombre: "Boutique de Vinos Mendoza",
      rubro: "Vinoteca Premium",
      descripcion: "Los mejores vinos orgánicos de la región, selección exclusiva de bodegas boutique",
      telefono: "261-555-1234",
      direccion: "Belgrano 789",
      horario: "Lunes a Sábado 11-21hs",
      imagen: "/vinos-banner.jpg",
      destacado: true,
      antiguedad: "Desde 2012",
      banner: true
    },
    {
      id: 2,
      nombre: "Gourmet & Co",
      rubro: "Delicatessen",
      descripcion: "Productos gourmet importados y locales. Jamones, quesos y especialidades",
      telefono: "261-555-5678",
      direccion: "San Martín 1234",
      horario: "Martes a Domingo 9-20hs",
      imagen: "/gourmet-logo.jpg",
      destacado: true
    },
    {
      id: 3,
      nombre: "Spa Serenidad",
      rubro: "Belleza y Bienestar",
      descripcion: "Experiencias de relax con productos orgánicos. Masajes, faciales y tratamientos corporales",
      telefono: "261-555-9012",
      direccion: "Las Heras 456",
      horario: "Lunes a Sábado 10-20hs",
      imagen: "/spa-banner.jpg",
      banner: true
    },
    {
      id: 4,
      nombre: "Taller Mecánico Precisión",
      rubro: "Mecánica Automotriz",
      descripcion: "Especialistas en motores europeos. Servicio con garantía escrita",
      telefono: "261-555-3456",
      direccion: "Godoy Cruz 789",
      horario: "Lunes a Viernes 8-18hs",
      antiguedad: "Desde 2008"
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        height: { xs: 300, md: 400 },
        mb: 6,
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
      }}>
        <Image 
          src="/clasificados-hero.jpg" 
          alt="Anunciantes Destacados" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, rgba(63, 81, 181, 0.9), rgba(102, 126, 234, 0.7))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          p: 4
        }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 2,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Descubre lo Mejor del Barrio
          </Typography>
          <Typography variant="h5" sx={{
            maxWidth: 800,
            mb: 4,
            fontWeight: 300,
            textShadow: '0 1px 5px rgba(0,0,0,0.2)'
          }}>
            Negocios locales seleccionados por calidad y servicio excepcional
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{
              bgcolor: 'white',
              color: COLORS.primary,
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            Publicitar mi Negocio
          </Button>
        </Box>
      </Box>

      {/* Filtros Elegantes */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        mb: 6,
        justifyContent: 'center',
        '& .MuiChip-root': {
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }
        }
      }}>
        <Chip label="Todos" variant="outlined" clickable sx={{
          borderColor: COLORS.primary,
          color: COLORS.primary,
          fontWeight: 600
        }} />
        <Chip label="Gastronomía" clickable sx={{
          bgcolor: '#e53935',
          color: 'white',
          fontWeight: 600
        }} />
        <Chip label="Belleza" clickable sx={{
          bgcolor: '#8e24aa',
          color: 'white',
          fontWeight: 600
        }} />
        <Chip label="Servicios" clickable sx={{
          bgcolor: '#3949ab',
          color: 'white',
          fontWeight: 600
        }} />
        <Chip label="Destacados" clickable icon={<Star />} sx={{
          bgcolor: COLORS.secondary,
          color: 'white',
          fontWeight: 600
        }} />
      </Box>

      {/* Grid de Anunciantes */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 4,
        mb: 8
      }}>
        {anunciantes.map((anunciante) => (
          <motion.div
            key={anunciante.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
          >
            <Paper elevation={3} sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              overflow: 'hidden',
              border: anunciante.destacado ? `2px solid ${COLORS.secondary}` : `1px solid ${COLORS.border}`,
              transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
              '&:hover': {
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
              }
            }}>
              {/* Banner/Imagen */}
              {anunciante.banner ? (
                <Box sx={{
                  position: 'relative',
                  height: 160,
                  width: '100%',
                  overflow: 'hidden'
                }}>
                  <Image 
                    src={anunciante.imagen} 
                    alt={anunciante.nombre}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {anunciante.destacado && (
                    <Box sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      bgcolor: COLORS.secondary,
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Star sx={{ fontSize: 18, mr: 0.5 }} />
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        Destacado
                      </Typography>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box sx={{
                  p: 3,
                  pb: 0,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: anunciante.destacado ? 'rgba(245, 0, 87, 0.05)' : 'white'
                }}>
                  <Avatar sx={{
                    width: 80,
                    height: 80,
                    mr: 3,
                    bgcolor: anunciante.destacado ? COLORS.secondary : COLORS.primary,
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}>
                    {anunciante.nombre.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {anunciante.nombre}
                    </Typography>
                    <Chip label={anunciante.rubro} size="small" sx={{
                      bgcolor: anunciante.destacado ? COLORS.secondary : COLORS.primary,
                      color: 'white',
                      fontWeight: 600,
                      mt: 1
                    }} />
                  </Box>
                </Box>
              )}

              {/* Contenido */}
              <Box sx={{ p: 3, flex: 1 }}>
                <Typography paragraph sx={{
                  fontStyle: 'italic',
                  color: COLORS.textPrimary,
                  mb: 3,
                  fontSize: '0.95rem',
                  lineHeight: 1.7
                }}>
                  "{anunciante.descripcion}"
                </Typography>

                <Divider sx={{ 
                  my: 2, 
                  borderColor: anunciante.destacado ? COLORS.secondary : COLORS.border,
                  opacity: 0.5
                }} />

                <Box sx={{ 
                  '& > div': { 
                    display: 'flex', 
                    mb: 2,
                    alignItems: 'center'
                  } 
                }}>
                  <Box>
                    <Place fontSize="small" sx={{ 
                      mr: 2, 
                      color: COLORS.textSecondary,
                      opacity: 0.8
                    }} />
                    <Typography variant="body2">{anunciante.direccion}</Typography>
                  </Box>
                  <Box>
                    <Phone fontSize="small" sx={{ 
                      mr: 2, 
                      color: COLORS.textSecondary,
                      opacity: 0.8
                    }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {anunciante.telefono}
                    </Typography>
                  </Box>
                  <Box>
                    <Schedule fontSize="small" sx={{ 
                      mr: 2, 
                      color: COLORS.textSecondary,
                      opacity: 0.8
                    }} />
                    <Typography variant="body2">{anunciante.horario}</Typography>
                  </Box>
                  {anunciante.antiguedad && (
                    <Box>
                      <LocalOffer fontSize="small" sx={{ 
                        mr: 2, 
                        color: COLORS.textSecondary,
                        opacity: 0.8
                      }} />
                      <Typography variant="body2">{anunciante.antiguedad}</Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Acciones */}
              <Box sx={{ 
                p: 2, 
                bgcolor: 'rgba(248, 249, 250, 0.8)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Box>
                  <IconButton size="small" sx={{ mr: 1 }}>
                    <Share sx={{ fontSize: 20, color: COLORS.textSecondary }} />
                  </IconButton>
                  <IconButton size="small">
                    <Bookmark sx={{ fontSize: 20, color: COLORS.textSecondary }} />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  size="medium"
                  href={`tel:${anunciante.telefono}`}
                  startIcon={<Phone />}
                  sx={{
                    bgcolor: anunciante.destacado ? COLORS.secondary : COLORS.primary,
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 3,
                    '&:hover': {
                      bgcolor: anunciante.destacado ? '#c51162' : '#303f9f',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  Contactar
                </Button>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>

      {/* CTA Elegante */}
      <Paper elevation={0} sx={{
        p: { xs: 4, md: 6 },
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e3e8f7 100%)',
        borderRadius: 3,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        mb: 6
      }}>
        <Box sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: 'rgba(102, 126, 234, 0.1)'
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 250,
          height: 250,
          borderRadius: '50%',
          bgcolor: 'rgba(245, 0, 87, 0.05)'
        }} />
        <Box position="relative" zIndex={1}>
          <Typography variant="h3" sx={{
            fontWeight: 700,
            mb: 2,
            color: COLORS.textPrimary,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}>
            ¿Quieres más clientes?
          </Typography>
          <Typography variant="h6" sx={{
            mb: 4,
            color: COLORS.textSecondary,
            maxWidth: 700,
            mx: 'auto',
            fontWeight: 400,
            lineHeight: 1.7
          }}>
            Nuestros paquetes publicitarios incluyen destaque en la revista digital, redes sociales y newsletter semanal.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: COLORS.primary,
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
              boxShadow: '0 10px 25px rgba(63, 81, 181, 0.3)',
              '&:hover': {
                bgcolor: '#303f9f',
                transform: 'translateY(-2px)',
                boxShadow: '0 15px 30px rgba(63, 81, 181, 0.4)'
              },
              transition: 'all 0.3s'
            }}
          >
            Planes Publicitarios
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AnunciantesPremium;