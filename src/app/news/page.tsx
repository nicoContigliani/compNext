// // 'use client'

// // import { Container, Box, Typography, Paper } from "@mui/material";
// // import MainLayout from "@/components/Layout/MainLayout";
// // import NewsAggregator from "@/components/LosAndesNews/MdzolNews";

// // export default function NewsPage() {
// //   return (
// //     <MainLayout>
// //       <Container maxWidth="lg">
// //         <Box sx={{ mb: 4 }}>
// //           <Paper elevation={3} sx={{ p: 1 }}>
// //             <Typography variant="h5" gutterBottom>
// //               Pronóstico del Clima
// //             </Typography>
// //             {/* <WeatherComponent forecast={forecast} /> */}
// //           </Paper>
// //         </Box>

// //         <Box sx={{ flex: 1 }}>
// //           <Paper elevation={4} sx={{ p: 1 }}>
// //             <Typography variant="h5" gutterBottom>
// //               Noticias Destacadas
// //             </Typography>
// //             <NewsAggregator />
// //           </Paper>
// //         </Box>
// //       </Container>
// //     </MainLayout>
// //   );
// // }


// 'use client'

// import { Container, Box, Typography, Paper } from "@mui/material";
// import MainLayout from "@/components/Layout/MainLayout";
// import NewsAggregator from "@/components/LosAndesNews/MdzolNews";

// export default function NewsPage() {
//   return (
//     <MainLayout>
//       <Container maxWidth="lg" sx={{ py: 3 }}>
//         {/* Sección de clima */}
//         <Box sx={{ mb: 4 }}>
//           <Paper 
//             elevation={3} 
//             sx={{ 
//               p: 2,
//               borderRadius: 3,
//               background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//               border: '1px solid rgba(255, 255, 255, 0.3)'
//             }}
//           >
//             <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#2d3748' }}>
//               Pronóstico del Clima
//             </Typography>
//             {/* <WeatherComponent forecast={forecast} /> */}
//           </Paper>
//         </Box>

//         {/* Sección de noticias */}
//         <Paper 
//           elevation={4} 
//           sx={{ 
//             p: { xs: 1, md: 2 },
//             borderRadius: 3,
//             background: 'linear-gradient(to bottom right, #ffffff 0%, #f8f9fa 100%)',
//             border: '1px solid rgba(0, 0, 0, 0.05)'
//           }}
//         >
//           <Typography 
//             variant="h5" 
//             gutterBottom 
//             sx={{ 
//               fontWeight: 600, 
//               color: '#2d3748',
//               display: 'flex',
//               alignItems: 'center',
//               gap: 1
//             }}
//           >
//             <span style={{ background: '#3f51b5', color: 'white', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📰</span>
//             Noticias Destacadas
//           </Typography>
//           <NewsAggregator />
//         </Paper>
//       </Container>
//     </MainLayout>
//   );
// }



"use client"
import { Container, Box, Typography, Paper } from "@mui/material"
import MainLayout from "@/components/Layout/MainLayout"
import NewsAggregator from "@/components/LosAndesNews/MdzolNews"

export default function NewsPage() {
  return (
    <MainLayout>
      <Container maxWidth="xl" sx={{ py: 0 }}>
        {/* Header del Diario */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            color: "white",
            borderRadius: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
              opacity: 0.1,
            }}
          />

          <Box sx={{ position: "relative", p: 4, textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Diarios Digitales en LlakaScriptMedia
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Crimson Text", serif',
                fontStyle: "italic",
                opacity: 0.9,
                mb: 2,
              }}
            >
              Noticias de hoy, perspectivas del mañana
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              <Box sx={{ width: 1, height: 20, bgcolor: "rgba(255,255,255,0.3)" }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Edición Digital
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Sección de clima mejorada */}
        <Box sx={{ mb: 4 }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
                position: "relative",
                zIndex: 1,
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🌤️</span>
              Pronóstico del Clima
            </Typography>
            {/* <WeatherComponent forecast={forecast} /> */}
          </Paper>
        </Box>

        {/* Sección de noticias principal */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 3,
              borderBottom: "3px solid #3f51b5",
              background: "linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: "#2d3748",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)",
                  color: "white",
                  borderRadius: "12px",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(63, 81, 181, 0.3)",
                }}
              >
                📰
              </Box>
              Noticias Destacadas
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 1, md: 2 } }}>
            <NewsAggregator />
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  )
}
