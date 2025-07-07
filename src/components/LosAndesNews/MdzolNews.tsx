// "use client"
// import { ThemeProvider, createTheme } from "@mui/material/styles"
// import React from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   Card,
//   CardContent,
//   Button,
//   Chip,
//   TextField,
//   Alert,
//   AlertTitle,
//   Box,
//   Typography,
//   Divider,
//   CircularProgress,
//   IconButton,
//   Paper,
//   Container,
//   useMediaQuery,
//   Badge,
// } from "@mui/material"
// import {
//   Refresh as RefreshIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
//   Search as SearchIcon,
//   Public as GlobeIcon,
//   Menu as MenuIcon,
//   Close as CloseIcon,
//   Image as ImageIcon,
//   TrendingUp as TrendingUpIcon,
//   Newspaper as NewspaperIcon,
// } from "@mui/icons-material"
// import OpenInNewIcon from "@mui/icons-material/OpenInNew"
// import { useNewsAggregator } from "@/hooks/useNewsAggregator"
// import WeatherComponent from "../Weatherplaceholders/WeatherComponent"

// // Paleta de colores mejorada
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
// }

// // Variantes de animación mejoradas
// const sidebarVariants = {
//   open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
//   closed: { x: "-100%", opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
// }

// const cardVariants = {
//   initial: { y: 20, opacity: 0 },
//   animate: { y: 0, opacity: 1 },
//   hover: {
//     y: -5,
//     boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//     transition: { duration: 0.3 },
//   },
// }

// const staggerContainer = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// }

// export default function NewsAggregator() {
//   const theme = createTheme({
//     typography: {
//       fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//       h4: {
//         fontFamily: '"Playfair Display", serif',
//       },
//       h5: {
//         fontFamily: '"Playfair Display", serif',
//       },
//       h6: {
//         fontFamily: '"Playfair Display", serif',
//       },
//     },
//   })

//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))
//   const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile)
//   const [isRefreshing, setIsRefreshing] = React.useState(false)

//   const {
//     loading,
//     error,
//     paginaSidebar,
//     busquedaTema,
//     ultimaActualizacion,
//     modoDemo,
//     gruposSidebar,
//     totalPaginasSidebar,
//     grupoActual,
//     fuentes,
//     grupoSeleccionado,
//     setGrupoSeleccionado,
//     setPaginaSidebar,
//     setBusquedaTema,
//     fetchNews: fetchNewsData,
//     getFuenteColor,
//   } = useNewsAggregator()

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

//   const handleRefresh = async () => {
//     setIsRefreshing(true)
//     await fetchNewsData()
//     setIsRefreshing(false)
//   }

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "60vh",
//           background: COLORS.gradient,
//           borderRadius: 3,
//           p: 4,
//           gap: 4,
//           color: "white",
//         }}
//       >
//         {/* Weather Card */}
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <Box
//             sx={{
//               width: "100%",
//               maxWidth: 600,
//               boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//               borderRadius: 3,
//               backgroundColor: "rgba(255,255,255,0.95)",
//               p: 3,
//               backdropFilter: "blur(10px)",
//             }}
//           >
//             <WeatherComponent />
//           </Box>
//         </motion.div>

//         {/* Loading Animation */}
//         <motion.div
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           transition={{
//             duration: 0.6,
//             repeat: Number.POSITIVE_INFINITY,
//             repeatType: "reverse",
//             ease: "easeInOut",
//           }}
//         >
//           <Box sx={{ position: "relative" }}>
//             <CircularProgress
//               size={80}
//               thickness={4}
//               sx={{
//                 color: "rgba(255,255,255,0.8)",
//                 filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
//               }}
//             />
//             <NewspaperIcon
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 fontSize: 32,
//                 color: "white",
//               }}
//             />
//           </Box>
//         </motion.div>

//         {/* Texts */}
//         <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
//           <Box textAlign="center">
//             <Typography
//               variant="h4"
//               sx={{
//                 mb: 2,
//                 fontWeight: 700,
//                 textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
//               }}
//             >
//               Cargando Noticias
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 opacity: 0.9,
//                 fontWeight: 300,
//               }}
//             >
//               Analizando y organizando la información más relevante
//             </Typography>
//           </Box>
//         </motion.div>

//         {/* Animated Progress Steps */}
//         <motion.div
//           variants={staggerContainer}
//           initial="initial"
//           animate="animate"
//           style={{ width: "100%", maxWidth: 400 }}
//         >
//           {[
//             "Conectando con fuentes de noticias",
//             "Extrayendo contenido relevante",
//             "Agrupando por similitud temática",
//             "Optimizando presentación",
//           ].map((text, index) => (
//             <motion.div
//               key={index}
//               variants={{
//                 initial: { x: -30, opacity: 0 },
//                 animate: { x: 0, opacity: 1 },
//               }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   mb: 2,
//                   p: 2,
//                   borderRadius: 2,
//                   background: "rgba(255,255,255,0.1)",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 8,
//                     height: 8,
//                     borderRadius: "50%",
//                     bgcolor: "white",
//                     mr: 2,
//                     boxShadow: "0 0 10px rgba(255,255,255,0.5)",
//                   }}
//                 />
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   {text}
//                 </Typography>
//               </Box>
//             </motion.div>
//           ))}
//         </motion.div>
//       </Box>
//     )
//   }

//   if (error) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           <Alert
//             severity="error"
//             sx={{
//               mb: 2,
//               borderRadius: 3,
//               boxShadow: "0 8px 32px rgba(229, 62, 62, 0.12)",
//             }}
//           >
//             <AlertTitle sx={{ fontWeight: 700 }}>Error al cargar las noticias</AlertTitle>
//             <Typography variant="body2" sx={{ mb: 2 }}>
//               {error}
//             </Typography>
//             <Typography variant="body2" sx={{ mb: 2, fontWeight: "bold" }}>
//               Posibles causas:
//             </Typography>
//             <Box component="ul" sx={{ pl: 2, mb: 2 }}>
//               <li>Los sitios web pueden estar bloqueando el acceso automatizado</li>
//               <li>Problemas de conectividad de red</li>
//               <li>Cambios en la estructura de los sitios web</li>
//               <li>Rate limiting de las fuentes</li>
//             </Box>
//             <Button
//               variant="contained"
//               onClick={handleRefresh}
//               startIcon={<RefreshIcon />}
//               sx={{
//                 bgcolor: COLORS.error,
//                 borderRadius: 2,
//                 fontWeight: 600,
//                 "&:hover": { bgcolor: "#c53030" },
//               }}
//             >
//               Reintentar
//             </Button>
//           </Alert>
//         </motion.div>
//       </Container>
//     )
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           display: "flex",
//           minHeight: "80vh",
//           backgroundColor: COLORS.background,
//           flexDirection: isMobile ? "column" : "row",
//           borderRadius: 3,
//           overflow: "hidden",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//         }}
//       >
//         {/* Mobile Header */}
//         {isMobile && (
//           <Paper
//             sx={{
//               p: 3,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               borderRadius: 0,
//               background: COLORS.gradient,
//               color: "white",
//               boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <IconButton onClick={toggleSidebar} sx={{ mr: 2, color: "white" }}>
//                 {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
//               </IconButton>
//               <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                 Diario Digital
//               </Typography>
//             </Box>
//             <IconButton onClick={handleRefresh} disabled={isRefreshing} sx={{ color: "white" }}>
//               <motion.div
//                 animate={isRefreshing ? { rotate: [0, 360] } : { rotate: 0 }}
//                 transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//               >
//                 <RefreshIcon />
//               </motion.div>
//             </IconButton>
//           </Paper>
//         )}

//         {/* Sidebar - Temario */}
//         <AnimatePresence>
//           {(sidebarOpen || !isMobile) && (
//             <motion.div
//               initial={isMobile ? "closed" : "open"}
//               animate={sidebarOpen ? "open" : "closed"}
//               variants={sidebarVariants}
//               style={{
//                 position: isMobile ? "fixed" : "relative",
//                 top: 0,
//                 left: 0,
//                 bottom: 0,
//                 zIndex: 1000,
//                 width: isMobile ? "90%" : "380px",
//                 height: "100%",
//                 backgroundColor: "white",
//                 overflowY: "auto",
//               }}
//             >
//               <Paper
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   borderRadius: 0,
//                   borderRight: `1px solid ${COLORS.border}`,
//                   background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
//                 }}
//               >
//                 {/* Header del Sidebar */}
//                 <Box
//                   sx={{
//                     p: 3,
//                     borderBottom: `2px solid ${COLORS.primary}`,
//                     background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
//                   }}
//                 >
//                   {!isMobile && (
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         mb: 3,
//                       }}
//                     >
//                       <Typography
//                         variant="h5"
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           fontWeight: 700,
//                           color: COLORS.textPrimary,
//                         }}
//                       >
//                         <TrendingUpIcon sx={{ mr: 1, color: COLORS.primary }} />
//                         Temas Trending
//                       </Typography>
//                       <IconButton
//                         onClick={handleRefresh}
//                         size="small"
//                         disabled={isRefreshing}
//                         sx={{
//                           bgcolor: COLORS.primary,
//                           color: "white",
//                           "&:hover": { bgcolor: "#303f9f" },
//                         }}
//                       >
//                         <motion.div
//                           animate={isRefreshing ? { rotate: [0, 360] } : { rotate: 0 }}
//                           transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                         >
//                           <RefreshIcon />
//                         </motion.div>
//                       </IconButton>
//                     </Box>
//                   )}

//                   {modoDemo && (
//                     <Alert
//                       severity="info"
//                       sx={{
//                         mb: 3,
//                         borderRadius: 2,
//                         bgcolor: "rgba(63, 81, 181, 0.1)",
//                         border: "1px solid rgba(63, 81, 181, 0.2)",
//                       }}
//                     >
//                       <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                         Modo demostración activo
//                       </Typography>
//                     </Alert>
//                   )}

//                   {/* Buscador mejorado */}
//                   <TextField
//                     fullWidth
//                     size="medium"
//                     placeholder="Buscar temas de interés..."
//                     value={busquedaTema}
//                     onChange={(e) => {
//                       setBusquedaTema(e.target.value)
//                       setPaginaSidebar(1)
//                     }}
//                     InputProps={{
//                       startAdornment: <SearchIcon sx={{ mr: 1, color: COLORS.textSecondary }} />,
//                     }}
//                     sx={{
//                       mb: 3,
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: 3,
//                         bgcolor: "white",
//                         "&:hover fieldset": {
//                           borderColor: COLORS.primary,
//                         },
//                         "&.Mui-focused fieldset": {
//                           borderColor: COLORS.primary,
//                         },
//                       },
//                     }}
//                   />

//                   {/* Estadísticas mejoradas */}
//                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                     <Chip
//                       label={`${gruposSidebar.length} temas`}
//                       size="medium"
//                       variant="filled"
//                       sx={{
//                         bgcolor: COLORS.primary,
//                         color: "white",
//                         fontWeight: 600,
//                         borderRadius: 2,
//                       }}
//                       clickable onClick={() => console.log('Click')} 
//                     />
//                     <Chip
//                       label={`${gruposSidebar.reduce((acc, grupo) => acc + grupo.noticias.length, 0)} noticias`}
//                       size="medium"
//                       variant="outlined"
//                       sx={{
//                         borderColor: COLORS.primary,
//                         color: COLORS.primary,
//                         fontWeight: 600,
//                         borderRadius: 2,
//                       }}
//                       clickable onClick={() => console.log('Click')} 
//                     />
//                   </Box>
//                 </Box>

//                 {/* Lista de grupos mejorada */}
//                 <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
//                   <motion.div variants={staggerContainer} initial="initial" animate="animate">
//                     <AnimatePresence>
//                       {gruposSidebar.map((grupo, index) => (
//                         <motion.div
//                           key={grupo.id}
//                           variants={{
//                             initial: { opacity: 0, y: 20, scale: 0.95 },
//                             animate: { opacity: 1, y: 0, scale: 1 },
//                           }}
//                           initial="initial"
//                           animate="animate"
//                           transition={{ duration: 0.3, delay: index * 0.05 }}
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           <Card
//                             sx={{
//                               mb: 2,
//                               cursor: "pointer",
//                               border:
//                                 grupoSeleccionado === grupo.id
//                                   ? `3px solid ${COLORS.primary}`
//                                   : `1px solid ${COLORS.border}`,
//                               backgroundColor:
//                                 grupoSeleccionado === grupo.id ? "rgba(63, 81, 181, 0.05)" : COLORS.cardBackground,
//                               borderRadius: 3,
//                               transition: "all 0.3s ease",
//                               boxShadow:
//                                 grupoSeleccionado === grupo.id
//                                   ? "0 8px 32px rgba(63, 81, 181, 0.15)"
//                                   : "0 2px 8px rgba(0,0,0,0.08)",
//                               "&:hover": {
//                                 boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
//                                 transform: "translateY(-2px)",
//                               },
//                             }}
//                             onClick={() => {
//                               setGrupoSeleccionado(grupo.id)
//                               if (isMobile) setSidebarOpen(false)
//                             }}
//                           >
//                             <CardContent sx={{ p: 3 }}>
//                               <Typography
//                                 variant="h6"
//                                 sx={{
//                                   fontWeight: 600,
//                                   mb: 2,
//                                   display: "-webkit-box",
//                                   WebkitLineClamp: 2,
//                                   WebkitBoxOrient: "vertical",
//                                   overflow: "hidden",
//                                   color: COLORS.textPrimary,
//                                   lineHeight: 1.3,
//                                 }}
//                               >
//                                 {grupo.tema}
//                               </Typography>

//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   flexWrap: "wrap",
//                                   gap: 1,
//                                   mb: 2,
//                                 }}
//                               >
//                                 {grupo.palabrasClave.slice(0, 3).map((palabra, idx) => (
//                                   <Chip
//                                     key={idx}
//                                     label={palabra}
//                                     size="small"
//                                     variant="outlined"
//                                     sx={{
//                                       backgroundColor: "rgba(63, 81, 181, 0.08)",
//                                       borderColor: COLORS.primary,
//                                       color: COLORS.primary,
//                                       fontWeight: 500,
//                                       borderRadius: 2,
//                                       transition: "transform 0.2s",
//                                       "&:hover": { transform: "scale(1.05)" },
//                                     }}
//                                     clickable onClick={() => console.log('Click')} 
//                                   />
//                                 ))}
//                               </Box>

//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <Badge
//                                   badgeContent={grupo.noticias.length}
//                                   color="primary"
//                                   sx={{
//                                     "& .MuiBadge-badge": {
//                                       fontWeight: 700,
//                                     },
//                                   }}
//                                 >
//                                   <Typography
//                                     variant="body2"
//                                     sx={{
//                                       color: COLORS.textSecondary,
//                                       fontWeight: 600,
//                                     }}
//                                   >
//                                     Noticias
//                                   </Typography>
//                                 </Badge>

//                                 <Typography
//                                   variant="caption"
//                                   sx={{
//                                     color: COLORS.textSecondary,
//                                     bgcolor: "rgba(0,0,0,0.05)",
//                                     px: 1.5,
//                                     py: 0.5,
//                                     borderRadius: 2,
//                                     fontWeight: 600,
//                                   }}
//                                 >
//                                   {new Set(grupo.noticias.map((n) => n.fuente)).size} fuentes
//                                 </Typography>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </motion.div>
//                 </Box>

//                 {/* Paginación mejorada */}
//                 {totalPaginasSidebar > 1 && (
//                   <Box
//                     sx={{
//                       p: 3,
//                       borderTop: `1px solid ${COLORS.border}`,
//                       bgcolor: "rgba(248, 249, 250, 0.8)",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <IconButton
//                         onClick={() => setPaginaSidebar((prev) => Math.max(1, prev - 1))}
//                         disabled={paginaSidebar === 1}
//                         sx={{
//                           bgcolor: paginaSidebar === 1 ? "transparent" : COLORS.primary,
//                           color: paginaSidebar === 1 ? COLORS.textSecondary : "white",
//                           "&:hover": {
//                             bgcolor: paginaSidebar === 1 ? "transparent" : "#303f9f",
//                           },
//                         }}
//                       >
//                         <ChevronLeftIcon />
//                       </IconButton>

//                       <Typography
//                         variant="body1"
//                         sx={{
//                           color: COLORS.textPrimary,
//                           fontWeight: 600,
//                           bgcolor: "white",
//                           px: 2,
//                           py: 1,
//                           borderRadius: 2,
//                           border: `1px solid ${COLORS.border}`,
//                         }}
//                       >
//                         {paginaSidebar} / {totalPaginasSidebar}
//                       </Typography>

//                       <IconButton
//                         onClick={() => setPaginaSidebar((prev) => Math.min(totalPaginasSidebar, prev + 1))}
//                         disabled={paginaSidebar === totalPaginasSidebar}
//                         sx={{
//                           bgcolor: paginaSidebar === totalPaginasSidebar ? "transparent" : COLORS.primary,
//                           color: paginaSidebar === totalPaginasSidebar ? COLORS.textSecondary : "white",
//                           "&:hover": {
//                             bgcolor: paginaSidebar === totalPaginasSidebar ? "transparent" : "#303f9f",
//                           },
//                         }}
//                       >
//                         <ChevronRightIcon />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                 )}
//               </Paper>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Overlay for mobile sidebar */}
//         {isMobile && sidebarOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundColor: "rgba(0,0,0,0.6)",
//               zIndex: 999,
//               backdropFilter: "blur(4px)",
//             }}
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Contenido Principal */}
//         <Box
//           sx={{
//             flex: 1,
//             overflow: "auto",
//             p: isMobile ? 2 : 4,
//             backgroundColor: COLORS.background,
//           }}
//         >
//           <AnimatePresence mode="wait">
//             {grupoActual ? (
//               <motion.div
//                 key={grupoActual.id}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//               >
//                 {/* Header del tema */}
//                 <Box sx={{ mb: 4 }}>
//                   <Typography
//                     variant="h4"
//                     sx={{
//                       fontWeight: 700,
//                       color: COLORS.textPrimary,
//                       mb: 2,
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 2,
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         width: 4,
//                         height: 40,
//                         bgcolor: COLORS.primary,
//                         borderRadius: 2,
//                       }}
//                     />
//                     {grupoActual.tema}
//                   </Typography>

//                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
//                     {grupoActual.palabrasClave.map((palabra, idx) => (
//                       <Chip
//                         key={idx}
//                         label={palabra}
//                         size="small"
//                         sx={{
//                           bgcolor: "rgba(63, 81, 181, 0.1)",
//                           color: COLORS.primary,
//                           fontWeight: 600,
//                           borderRadius: 2,
//                         }}
//                         clickable onClick={() => console.log('Click')} 
//                       />
//                     ))}
//                   </Box>
//                 </Box>

//                 <Divider sx={{ mb: 4, borderColor: COLORS.border }} />

//                 {/* Grid de noticias */}
//                 <motion.div variants={staggerContainer} initial="initial" animate="animate">
//                   <Box
//                     sx={{
//                       display: "grid",
//                       gap: 4,
//                       gridTemplateColumns: {
//                         xs: "1fr",
//                         md: "repeat(auto-fit, minmax(400px, 1fr))",
//                       },
//                     }}
//                   >
//                     <AnimatePresence>
//                       {grupoActual.noticias.map((noticia, index) => (
//                         <motion.div
//                           key={index}
//                           variants={cardVariants}
//                           initial="initial"
//                           animate="animate"
//                           whileHover="hover"
//                           transition={{ duration: 0.3 }}
//                         >
//                           <Card
//                             elevation={0}
//                             sx={{
//                               backgroundColor: COLORS.cardBackground,
//                               borderRadius: 4,
//                               border: `1px solid ${COLORS.border}`,
//                               overflow: "hidden",
//                               height: "100%",
//                               display: "flex",
//                               flexDirection: "column",
//                               transition: "all 0.3s ease",
//                               "&:hover": {
//                                 borderColor: COLORS.primary,
//                               },
//                             }}
//                           >
//                             {/* Imagen de la noticia */}
//                             <Box
//                               sx={{
//                                 height: 200,
//                                 backgroundColor: "#f5f5f5",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 overflow: "hidden",
//                                 position: "relative",
//                               }}
//                             >
//                               {noticia.imagen ? (
//                                 <img
//                                   src={noticia.imagen || "/placeholder.svg"}
//                                   alt={noticia.titulo}
//                                   style={{
//                                     width: "100%",
//                                     height: "100%",
//                                     objectFit: "cover",
//                                   }}
//                                 />
//                               ) : (
//                                 <Box
//                                   sx={{
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     color: COLORS.textSecondary,
//                                     p: 3,
//                                   }}
//                                 >
//                                   <ImageIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
//                                   <Typography variant="body2" align="center">
//                                     Imagen no disponible
//                                   </Typography>
//                                 </Box>
//                               )}

//                               {/* Badge de fuente */}
//                               <Box
//                                 sx={{
//                                   position: "absolute",
//                                   top: 12,
//                                   left: 12,
//                                   bgcolor: "rgba(0,0,0,0.8)",
//                                   color: "white",
//                                   px: 2,
//                                   py: 0.5,
//                                   borderRadius: 2,
//                                   backdropFilter: "blur(10px)",
//                                 }}
//                               >
//                                 <Typography variant="caption" sx={{ fontWeight: 600 }}>
//                                   {noticia.fuente}
//                                 </Typography>
//                               </Box>
//                             </Box>

//                             <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
//                               <Typography
//                                 variant="h6"
//                                 sx={{
//                                   mb: 2,
//                                   lineHeight: 1.4,
//                                   color: COLORS.textPrimary,
//                                   fontWeight: 600,
//                                   flex: 1,
//                                   display: "-webkit-box",
//                                   WebkitLineClamp: 3,
//                                   WebkitBoxOrient: "vertical",
//                                   overflow: "hidden",
//                                 }}
//                               >
//                                 {noticia.titulo}
//                               </Typography>

//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                   alignItems: "center",
//                                   mt: "auto",
//                                 }}
//                               >
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                   <GlobeIcon sx={{ fontSize: 16, color: COLORS.textSecondary }} />
//                                   <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontWeight: 500 }}>
//                                     {noticia.dominio}
//                                   </Typography>
//                                   {modoDemo && (
//                                     <Chip label="Demo" size="small" variant="outlined" color="warning" sx={{ ml: 1 }} clickable onClick={() => console.log('Click')} />
//                                   )}
//                                 </Box>

//                                 <Button
//                                   variant="contained"
//                                   size="small"
//                                   startIcon={<OpenInNewIcon />}
//                                   href={noticia.link}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   sx={{
//                                     bgcolor: COLORS.primary,
//                                     borderRadius: 3,
//                                     fontWeight: 600,
//                                     textTransform: "none",
//                                     boxShadow: "0 4px 12px rgba(63, 81, 181, 0.3)",
//                                     "&:hover": {
//                                       bgcolor: "#303f9f",
//                                       boxShadow: "0 6px 16px rgba(63, 81, 181, 0.4)",
//                                       transform: "translateY(-1px)",
//                                     },
//                                   }}
//                                 >
//                                   Leer más
//                                 </Button>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </Box>
//                 </motion.div>
//               </motion.div>
//             ) : (
//               // Mensaje sin selección mejorado
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ type: "spring", stiffness: 100, damping: 20 }}
//                 style={{
//                   textAlign: "center",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: "100%",
//                   minHeight: "60vh",
//                 }}
//               >
//                 <motion.div
//                   animate={{
//                     rotate: [0, 5, -5, 0],
//                     scale: [1, 1.05, 1],
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Number.POSITIVE_INFINITY,
//                     repeatType: "reverse",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 120,
//                       height: 120,
//                       borderRadius: "50%",
//                       background: COLORS.gradient,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       mb: 3,
//                       boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
//                     }}
//                   >
//                     <NewspaperIcon
//                       sx={{
//                         fontSize: 48,
//                         color: "white",
//                       }}
//                     />
//                   </Box>
//                 </motion.div>

//                 <Typography
//                   variant="h4"
//                   sx={{
//                     mb: 2,
//                     color: COLORS.textPrimary,
//                     fontWeight: 700,
//                   }}
//                 >
//                   ¡Bienvenido al Diario Digital!
//                 </Typography>

//                 <Typography
//                   variant="h6"
//                   sx={{
//                     color: COLORS.textSecondary,
//                     maxWidth: "480px",
//                     mb: 4,
//                     lineHeight: 1.6,
//                   }}
//                 >
//                   Selecciona un tema del panel lateral para descubrir las noticias más relevantes y mantente informado
//                   con contenido de calidad.
//                 </Typography>

//                 {isMobile && (
//                   <Button
//                     variant="contained"
//                     size="large"
//                     onClick={toggleSidebar}
//                     startIcon={<TrendingUpIcon />}
//                     sx={{
//                       background: COLORS.gradient,
//                       borderRadius: 3,
//                       fontWeight: 700,
//                       px: 4,
//                       py: 1.5,
//                       textTransform: "none",
//                       fontSize: "1.1rem",
//                       boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
//                       "&:hover": {
//                         boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
//                         transform: "translateY(-2px)",
//                       },
//                     }}
//                   >
//                     Explorar Temas
//                   </Button>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   )
// }

"use client"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  Badge,
} from "@mui/material"
import {
  Refresh as RefreshIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  Public as GlobeIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  TrendingUp as TrendingUpIcon,
  Newspaper as NewspaperIcon,
} from "@mui/icons-material"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { useNewsAggregator } from "@/hooks/useNewsAggregator"
import WeatherComponent from "../Weatherplaceholders/WeatherComponent"

// Paleta de colores
const COLORS = {
  primary: "#3f51b5",
  secondary: "#f50057",
  background: "#f8f9fa",
  cardBackground: "#ffffff",
  textPrimary: "#1a202c",
  textSecondary: "#718096",
  border: "#e2e8f0",
  error: "#e53e3e",
  warning: "#dd6b20",
  success: "#38a169",
  accent: "#667eea",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
}

// Animaciones
const sidebarVariants = {
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { x: "-100%", opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
}

const cardVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  hover: {
    y: -5,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    transition: { duration: 0.3 },
  },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Tema personalizado
const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontFamily: '"Playfair Display", serif',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
    },
  },
})

export default function MdzolNews() {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  // Efecto para manejar el cambio de tamaño de pantalla
  React.useEffect(() => {
    setSidebarOpen(!isMobile)
  }, [isMobile])

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
    fetchNews: fetchNewsData,
    getFuenteColor,
  } = useNewsAggregator()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchNewsData()
    setIsRefreshing(false)
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          background: COLORS.gradient,
          borderRadius: 3,
          p: 4,
          gap: 4,
          color: "white",
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 600,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.95)",
              p: 3,
              backdropFilter: "blur(10px)",
            }}
          >
            <WeatherComponent />
          </Box>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CircularProgress
              size={80}
              thickness={4}
              sx={{
                color: "rgba(255,255,255,0.8)",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
              }}
            />
            <NewspaperIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: 32,
                color: "white",
              }}
            />
          </Box>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <Box textAlign="center">
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 700,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Cargando Noticias
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                fontWeight: 300,
              }}
            >
              Analizando y organizando la información más relevante
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          style={{ width: "100%", maxWidth: 400 }}
        >
          {[
            "Conectando con fuentes de noticias",
            "Extrayendo contenido relevante",
            "Agrupando por similitud temática",
            "Optimizando presentación",
          ].map((text, index) => (
            <motion.div
              key={index}
              variants={{
                initial: { x: -30, opacity: 0 },
                animate: { x: 0, opacity: 1 },
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "white",
                    mr: 2,
                    boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {text}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </motion.div>
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert
            severity="error"
            sx={{
              mb: 2,
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(229, 62, 62, 0.12)",
            }}
          >
            <AlertTitle sx={{ fontWeight: 700 }}>Error al cargar las noticias</AlertTitle>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, fontWeight: "bold" }}>
              Posibles causas:
            </Typography>
            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
              <li>Los sitios web pueden estar bloqueando el acceso automatizado</li>
              <li>Problemas de conectividad de red</li>
              <li>Cambios en la estructura de los sitios web</li>
              <li>Rate limiting de las fuentes</li>
            </Box>
            <Button
              variant="contained"
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
              sx={{
                bgcolor: COLORS.error,
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": { bgcolor: "#c53030" },
              }}
            >
              Reintentar
            </Button>
          </Alert>
        </motion.div>
      </Container>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          minHeight: "90vh",
          backgroundColor: COLORS.background,
          flexDirection: isMobile ? "column" : "row",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 1px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Mobile Header */}
        {isMobile && (
          <Paper
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 0,
              background: COLORS.gradient,
              color: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={toggleSidebar} sx={{ mr: 2, color: "white" }}>
                {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Diario Digital
              </Typography>
            </Box>
            <IconButton onClick={handleRefresh} disabled={isRefreshing} sx={{ color: "white" }}>
              <motion.div
                animate={isRefreshing ? { rotate: [0, 360] } : { rotate: 0 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <RefreshIcon />
              </motion.div>
            </IconButton>
          </Paper>
        )}

        {/* Sidebar - Temario */}
        <AnimatePresence>
          {(sidebarOpen || !isMobile) && (
            <motion.div
              initial={isMobile ? "closed" : "open"}
              animate={sidebarOpen ? "open" : "closed"}
              variants={sidebarVariants}
              style={{
                position: isMobile ? "fixed" : "relative",
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 1000,
                width: isMobile ? "90%" : "320px",
                height: "100%",
                backgroundColor: "white",
                overflowY: "auto",
              }}
            >
              <Paper
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 0,
                  borderRight: `1px solid ${COLORS.border}`,
                  background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
                }}
              >
                {/* Header del Sidebar */}
                <Box
                  sx={{
                    p: 3,
                    borderBottom: `2px solid ${COLORS.primary}`,
                    background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                  }}
                >
                  {!isMobile && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 700,
                          color: COLORS.textPrimary,
                        }}
                      >
                        <TrendingUpIcon sx={{ mr: 1, color: COLORS.primary }} />
                        Temas Trending
                      </Typography>
                      <IconButton
                        onClick={handleRefresh}
                        size="small"
                        disabled={isRefreshing}
                        sx={{
                          bgcolor: COLORS.primary,
                          color: "white",
                          "&:hover": { bgcolor: "#303f9f" },
                        }}
                      >
                        <motion.div
                          animate={isRefreshing ? { rotate: [0, 360] } : { rotate: 0 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <RefreshIcon />
                        </motion.div>
                      </IconButton>
                    </Box>
                  )}

                  {modoDemo && (
                    <Alert
                      severity="info"
                      sx={{
                        mb: 3,
                        borderRadius: 2,
                        bgcolor: "rgba(63, 81, 181, 0.1)",
                        border: "1px solid rgba(63, 81, 181, 0.2)",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Modo demostración activo
                      </Typography>
                    </Alert>
                  )}

                  <TextField
                    fullWidth
                    size="medium"
                    placeholder="Buscar temas de interés..."
                    value={busquedaTema}
                    onChange={(e) => {
                      setBusquedaTema(e.target.value)
                      setPaginaSidebar(1)
                    }}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: COLORS.textSecondary }} />,
                    }}
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        bgcolor: "white",
                        "&:hover fieldset": {
                          borderColor: COLORS.primary,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: COLORS.primary,
                        },
                      },
                    }}
                  />

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      label={`${gruposSidebar.length} temas`}
                      size="medium"
                      variant="filled"
                      sx={{
                        bgcolor: COLORS.primary,
                        color: "white",
                        fontWeight: 600,
                        borderRadius: 2,
                      }}
                    />
                    <Chip
                      label={`${gruposSidebar.reduce((acc, grupo) => acc + grupo.noticias.length, 0)} noticias`}
                      size="medium"
                      variant="outlined"
                      sx={{
                        borderColor: COLORS.primary,
                        color: COLORS.primary,
                        fontWeight: 600,
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
                  <motion.div variants={staggerContainer} initial="initial" animate="animate">
                    <AnimatePresence>
                      {gruposSidebar.map((grupo, index) => (
                        <motion.div
                          key={grupo.id}
                          variants={{
                            initial: { opacity: 0, y: 20, scale: 0.95 },
                            animate: { opacity: 1, y: 0, scale: 1 },
                          }}
                          initial="initial"
                          animate="animate"
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            sx={{
                              mb: 2,
                              cursor: "pointer",
                              border:
                                grupoSeleccionado === grupo.id
                                  ? `3px solid ${COLORS.primary}`
                                  : `1px solid ${COLORS.border}`,
                              backgroundColor:
                                grupoSeleccionado === grupo.id ? "rgba(63, 81, 181, 0.05)" : COLORS.cardBackground,
                              borderRadius: 3,
                              transition: "all 0.3s ease",
                              boxShadow:
                                grupoSeleccionado === grupo.id
                                  ? "0 8px 32px rgba(63, 81, 181, 0.15)"
                                  : "0 2px 8px rgba(0,0,0,0.08)",
                              "&:hover": {
                                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                                transform: "translateY(-2px)",
                              },
                            }}
                            onClick={() => {
                              setGrupoSeleccionado(grupo.id)
                              if (isMobile) setSidebarOpen(false)
                            }}
                          >
                            <CardContent sx={{ p: 3 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  mb: 2,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  color: COLORS.textPrimary,
                                  lineHeight: 1.3,
                                }}
                              >
                                {grupo.tema}
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                  mb: 2,
                                }}
                              >
                                {grupo.palabrasClave.slice(0, 3).map((palabra, idx) => (
                                  <Chip
                                    key={idx}
                                    label={palabra}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      backgroundColor: "rgba(63, 81, 181, 0.08)",
                                      borderColor: COLORS.primary,
                                      color: COLORS.primary,
                                      fontWeight: 500,
                                      borderRadius: 2,
                                      transition: "transform 0.2s",
                                      "&:hover": { transform: "scale(1.05)" },
                                    }}
                                  />
                                ))}
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Badge
                                  badgeContent={grupo.noticias.length}
                                  color="primary"
                                  sx={{
                                    "& .MuiBadge-badge": {
                                      fontWeight: 700,
                                    },
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: COLORS.textSecondary,
                                      fontWeight: 600,
                                    }}
                                  >
                                    Noticias
                                  </Typography>
                                </Badge>

                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: COLORS.textSecondary,
                                    bgcolor: "rgba(0,0,0,0.05)",
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                  }}
                                >
                                  {new Set(grupo.noticias.map((n) => n.fuente)).size} fuentes
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </Box>

                {totalPaginasSidebar > 1 && (
                  <Box
                    sx={{
                      p: 3,
                      borderTop: `1px solid ${COLORS.border}`,
                      bgcolor: "rgba(248, 249, 250, 0.8)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => setPaginaSidebar((prev) => Math.max(1, prev - 1))}
                        disabled={paginaSidebar === 1}
                        sx={{
                          bgcolor: paginaSidebar === 1 ? "transparent" : COLORS.primary,
                          color: paginaSidebar === 1 ? COLORS.textSecondary : "white",
                          "&:hover": {
                            bgcolor: paginaSidebar === 1 ? "transparent" : "#303f9f",
                          },
                        }}
                      >
                        <ChevronLeftIcon />
                      </IconButton>

                      <Typography
                        variant="body1"
                        sx={{
                          color: COLORS.textPrimary,
                          fontWeight: 600,
                          bgcolor: "white",
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          border: `1px solid ${COLORS.border}`,
                        }}
                      >
                        {paginaSidebar} / {totalPaginasSidebar}
                      </Typography>

                      <IconButton
                        onClick={() => setPaginaSidebar((prev) => Math.min(totalPaginasSidebar, prev + 1))}
                        disabled={paginaSidebar === totalPaginasSidebar}
                        sx={{
                          bgcolor: paginaSidebar === totalPaginasSidebar ? "transparent" : COLORS.primary,
                          color: paginaSidebar === totalPaginasSidebar ? COLORS.textSecondary : "white",
                          "&:hover": {
                            bgcolor: paginaSidebar === totalPaginasSidebar ? "transparent" : "#303f9f",
                          },
                        }}
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

        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 999,
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Contenido Principal */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: isMobile ? 2 : 4,
            backgroundColor: COLORS.background,
          }}
        >
          <AnimatePresence mode="wait">
            {grupoActual ? (
              <motion.div
                key={grupoActual.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Header del tema */}
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: COLORS.textPrimary,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 4,
                        height: 40,
                        bgcolor: COLORS.primary,
                        borderRadius: 2,
                      }}
                    />
                    {grupoActual.tema}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                    {grupoActual.palabrasClave.map((palabra, idx) => (
                      <Chip
                        key={idx}
                        label={palabra}
                        size="small"
                        sx={{
                          bgcolor: "rgba(63, 81, 181, 0.1)",
                          color: COLORS.primary,
                          fontWeight: 600,
                          borderRadius: 2,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ mb: 4, borderColor: COLORS.border }} />

                {/* Grid de noticias sin usar Grid de Material-UI */}
                <motion.div variants={staggerContainer} initial="initial" animate="animate">
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                      },
                      gap: 3,
                    }}
                  >
                    {grupoActual.noticias.map((noticia: any, index: number) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          elevation={0}
                          sx={{
                            backgroundColor: COLORS.cardBackground,
                            borderRadius: 4,
                            border: `1px solid ${COLORS.border}`,
                            overflow: "hidden",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              borderColor: COLORS.primary,
                            },
                          }}
                        >
                          {/* Imagen de la noticia */}
                          <Box
                            sx={{
                              height: 200,
                              backgroundColor: "#f5f5f5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                              position: "relative",
                            }}
                          >
                            {noticia.imagen ? (
                              <img
                                src={noticia.imagen || "/placeholder.svg"}
                                alt={noticia.titulo}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: COLORS.textSecondary,
                                  p: 3,
                                }}
                              >
                                <ImageIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                                <Typography variant="body2" align="center">
                                  Imagen no disponible
                                </Typography>
                              </Box>
                            )}

                            {/* Badge de fuente */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                bgcolor: "rgba(0,0,0,0.8)",
                                color: "white",
                                px: 2,
                                py: 0.5,
                                borderRadius: 2,
                                backdropFilter: "blur(10px)",
                              }}
                            >
                              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                {noticia.fuente}
                              </Typography>
                            </Box>
                          </Box>

                          <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                            <Typography
                              variant="h6"
                              sx={{
                                mb: 2,
                                lineHeight: 1.4,
                                color: COLORS.textPrimary,
                                fontWeight: 600,
                                flex: 1,
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {noticia.titulo}
                            </Typography>

                            <Typography
                              variant="body1"
                              sx={{
                                mb: 2,
                                color: COLORS.textSecondary,
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {noticia?.descripcion || "Descripción no disponible"}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: "auto",
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <GlobeIcon sx={{ fontSize: 16, color: COLORS.textSecondary }} />
                                <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontWeight: 500 }}>
                                  {noticia.dominio}
                                </Typography>
                                {modoDemo && (
                                  <Chip label="Demo" size="small" variant="outlined" color="warning" sx={{ ml: 1 }} />
                                )}
                              </Box>

                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<OpenInNewIcon />}
                                href={noticia.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  bgcolor: COLORS.primary,
                                  borderRadius: 3,
                                  fontWeight: 600,
                                  textTransform: "none",
                                  boxShadow: "0 4px 12px rgba(63, 81, 181, 0.3)",
                                  "&:hover": {
                                    bgcolor: "#303f9f",
                                    boxShadow: "0 6px 16px rgba(63, 81, 181, 0.4)",
                                    transform: "translateY(-1px)",
                                  },
                                }}
                              >
                                Leer más
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </Box>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: "60vh",
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: COLORS.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
                    }}
                  >
                    <NewspaperIcon
                      sx={{
                        fontSize: 48,
                        color: "white",
                      }}
                    />
                  </Box>
                </motion.div>

                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    color: COLORS.textPrimary,
                    fontWeight: 700,
                  }}
                >
                  ¡Bienvenido al Diario Digital!
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: COLORS.textSecondary,
                    maxWidth: "480px",
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  Selecciona un tema del panel lateral para descubrir las noticias más relevantes y mantente informado
                  con contenido de calidad.
                </Typography>

                {isMobile && (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={toggleSidebar}
                    startIcon={<TrendingUpIcon />}
                    sx={{
                      background: COLORS.gradient,
                      borderRadius: 3,
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      textTransform: "none",
                      fontSize: "1.1rem",
                      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                      "&:hover": {
                        boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Explorar Temas
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </ThemeProvider>
  )
}