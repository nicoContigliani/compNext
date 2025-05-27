// // import * as cheerio from 'cheerio';

// // export async function GET() {
// //   const headers = {
// //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
// //     'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8',
// //     'Referer': 'https://www.google.com/',
// //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
// //     'Accept-Encoding': 'gzip, deflate, br',
// //   };

// //   try {
// //     // Pequeña demora para evitar bloqueos
// //     await new Promise(resolve => setTimeout(resolve, 1000));

// //     const response = await fetch('https://www.mdzol.com//', {
// //       headers,
// //       cache: 'no-store',
// //     });

// //     if (!response.ok) {
// //       throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
// //     }

// //     const html = await response.text();
// //     const $ = cheerio.load(html);

// //     const noticias: { titulo: string; link: string }[] = [];

// //     // Selectores más flexibles
// //     $('article, .noticia, .news-item, .card').each((_, element) => {
// //       const titulo = $(element).find('h2, h3, .title, .titulo').text().trim();
// //       const relativeLink = $(element).find('a').attr('href');
// //       let link = '';

// //       if (relativeLink) {
// //         link = relativeLink.startsWith('http') 
// //           ? relativeLink 
// //           : `https://www.mdzol.com/${relativeLink}`;
// //       }

// //       if (titulo && link) {
// //         noticias.push({ titulo, link });
// //       }
// //     });

// //     // Si no encontramos con selectores genéricos, probamos una estrategia más específica
// //     if (noticias.length === 0) {
// //       $('a[href*="/nota/"]').each((_, element) => {
// //         const titulo = $(element).text().trim();
// //         const link = $(element).attr('href');

// //         if (titulo && link && titulo.length > 10) { // Filtramos textos muy cortos
// //           noticias.push({
// //             titulo,
// //             link: link.startsWith('http') ? link : `https://www.mdzol.com/${link}`
// //           });
// //         }
// //       });
// //     }

// //     if (noticias.length === 0) {
// //       return new Response(
// //         JSON.stringify({
// //           error: 'No se encontraron noticias',
// //           htmlSample: html.substring(0, 500) + '...', // Muestra un fragmento para debug
// //           suggestion: 'Verifica los selectores CSS en la página actual'
// //         }),
// //         {
// //           status: 404,
// //           headers: { 'Content-Type': 'application/json' },
// //         }
// //       );
// //     }

// //     // Limitar a 10 noticias y eliminar duplicados
// //     const uniqueNews = Array.from(new Set(noticias.map(n => n.link)))
// //       .map(link => noticias.find(n => n.link === link))
// //       .filter(Boolean)
// //       .slice(0, 20);

// //     return new Response(JSON.stringify(uniqueNews), {
// //       status: 200,
// //       headers: { 
// //         'Content-Type': 'application/json',
// //         'Cache-Control': 'no-cache, no-store, must-revalidate'
// //       },
// //     });
// //   } catch (error: any) {
// //     return new Response(
// //       JSON.stringify({
// //         error: error.message || 'Error al obtener noticias',
// //         stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
// //       }),
// //       {
// //         status: 500,
// //         headers: { 'Content-Type': 'application/json' },
// //       }
// //     );
// //   }
// // }

// import * as cheerio from "cheerio"

// const fuentesInfo = {
//     "mdzol.com": "MDZ Online",
//     "losandes.com.ar": "Los Andes",
//     "infobae.com": "Infobae",
// }

// export async function POST(request: Request) {
//     const headers = {
//         "User-Agent":
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
//         Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
//         "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
//         "Accept-Encoding": "gzip, deflate, br",
//         DNT: "1",
//         Connection: "keep-alive",
//         "Upgrade-Insecure-Requests": "1",
//         "Sec-Fetch-Dest": "document",
//         "Sec-Fetch-Mode": "navigate",
//         "Sec-Fetch-Site": "none",
//         "Cache-Control": "max-age=0",
//     }

//     try {
//         const body = await request.json()
//         const urls: string[] = body.urls

//         if (!Array.isArray(urls) || urls.length === 0) {
//             return new Response(JSON.stringify({ error: "No se proporcionaron URLs válidas" }), {
//                 status: 400,
//                 headers: { "Content-Type": "application/json" },
//             })
//         }

//         const allNews: { titulo: string; link: string; fuente: string; dominio: string }[] = []

//         for (const url of urls) {
//             try {
//                 console.log(`🔍 Procesando: ${url}`)

//                 // Delay entre requests
//                 await new Promise((resolve) => setTimeout(resolve, 1500))

//                 const response = await fetch(url, {
//                     headers,
//                     cache: "no-store",
//                     signal: AbortSignal.timeout(20000),
//                 })

//                 if (!response.ok) {
//                     console.warn(`❌ Error HTTP ${response.status} para ${url}`)
//                     continue
//                 }

//                 const html = await response.text()
//                 console.log(`📄 HTML recibido de ${url}: ${html.length} caracteres`)

//                 const $ = cheerio.load(html)

//                 const dominio = new URL(url).hostname.replace("www.", "")
//                 const nombreFuente = fuentesInfo[dominio as keyof typeof fuentesInfo] || dominio

//                 const noticias: { titulo: string; link: string; fuente: string; dominio: string }[] = []

//                 // Estrategia 1: Selectores específicos por sitio
//                 const estrategiaEspecifica = () => {
//                     const configuraciones = {
//                         "mdzol.com": [
//                             "article a[href*='/nota/']",
//                             ".nota-titulo a",
//                             "h2 a[href*='/nota/']",
//                             "h3 a[href*='/nota/']",
//                             ".card-title a",
//                         ],
//                         "losandes.com.ar": [
//                             "article a[href*='/nota/']",
//                             ".noticia a",
//                             "h2 a[href*='/nota/']",
//                             "h3 a[href*='/nota/']",
//                             ".titulo a",
//                         ],
//                         "infobae.com": ["article a[href*='/']", ".story-title a", "h2 a", "h3 a", ".headline a"],
//                     }

//                     const selectores = configuraciones[dominio as keyof typeof configuraciones] || []

//                     selectores.forEach((selector) => {
//                         $(selector).each((_, element) => {
//                             const $element = $(element)
//                             const titulo = $element.text().trim() || $element.attr("title") || $element.find("img").attr("alt") || ""
//                             const href = $element.attr("href")

//                             if (titulo && href && titulo.length > 15 && titulo.length < 250) {
//                                 const link = href.startsWith("http")
//                                     ? href
//                                     : `${url.replace(/\/$/, "")}${href.startsWith("/") ? "" : "/"}${href}`

//                                 noticias.push({
//                                     titulo: titulo.replace(/\s+/g, " ").trim(),
//                                     link,
//                                     fuente: nombreFuente,
//                                     dominio,
//                                 })
//                             }
//                         })
//                     })
//                 }

//                 // Estrategia 2: Selectores generales
//                 const estrategiaGeneral = () => {
//                     const selectoresGenerales = [
//                         'a[href*="/nota/"]',
//                         'a[href*="/noticia/"]',
//                         'a[href*="/news/"]',
//                         'a[href*="/articulo/"]',
//                         "article a",
//                         "h1 a, h2 a, h3 a",
//                         ".titulo a, .title a",
//                         ".noticia a, .news a",
//                         ".card a",
//                         ".story a",
//                     ]

//                     selectoresGenerales.forEach((selector) => {
//                         $(selector).each((_, element) => {
//                             const $element = $(element)
//                             let titulo = $element.text().trim()

//                             // Si no hay texto, buscar en atributos
//                             if (!titulo) {
//                                 titulo = $element.attr("title") || $element.attr("aria-label") || $element.find("img").attr("alt") || ""
//                             }

//                             const href = $element.attr("href")

//                             if (titulo && href && titulo.length > 15 && titulo.length < 250) {
//                                 // Filtrar contenido no deseado
//                                 if (
//                                     titulo.toLowerCase().includes("publicidad") ||
//                                     titulo.toLowerCase().includes("suscrib") ||
//                                     titulo.toLowerCase().includes("newsletter")
//                                 ) {
//                                     return
//                                 }

//                                 let link = href
//                                 if (!href.startsWith("http")) {
//                                     link = `${url.replace(/\/$/, "")}${href.startsWith("/") ? "" : "/"}${href}`
//                                 }

//                                 // Verificar que sea una URL válida
//                                 try {
//                                     new URL(link)
//                                     noticias.push({
//                                         titulo: titulo.replace(/\s+/g, " ").trim(),
//                                         link,
//                                         fuente: nombreFuente,
//                                         dominio,
//                                     })
//                                 } catch {
//                                     // URL inválida, ignorar
//                                 }
//                             }
//                         })
//                     })
//                 }

//                 // Estrategia 3: Buscar cualquier enlace con texto significativo
//                 const estrategiaFallback = () => {
//                     $("a[href]").each((_, element) => {
//                         const $element = $(element)
//                         const href = $element.attr("href")
//                         let titulo = $element.text().trim()

//                         if (!titulo) {
//                             titulo = $element.attr("title") || $element.attr("aria-label") || ""
//                         }

//                         if (
//                             titulo &&
//                             href &&
//                             titulo.length > 20 &&
//                             titulo.length < 200 &&
//                             href.includes("/") &&
//                             !href.includes("javascript:") &&
//                             !href.includes("mailto:") &&
//                             !href.includes("tel:")
//                         ) {
//                             let link = href
//                             if (!href.startsWith("http")) {
//                                 link = `${url.replace(/\/$/, "")}${href.startsWith("/") ? "" : "/"}${href}`
//                             }

//                             try {
//                                 new URL(link)
//                                 noticias.push({
//                                     titulo: titulo.replace(/\s+/g, " ").trim(),
//                                     link,
//                                     fuente: nombreFuente,
//                                     dominio,
//                                 })
//                             } catch {
//                                 // URL inválida, ignorar
//                             }
//                         }
//                     })
//                 }

//                 // Ejecutar estrategias en orden
//                 estrategiaEspecifica()
//                 console.log(`📊 Estrategia específica: ${noticias.length} noticias`)

//                 if (noticias.length < 5) {
//                     estrategiaGeneral()
//                     console.log(`📊 Estrategia general: ${noticias.length} noticias`)
//                 }

//                 if (noticias.length < 3) {
//                     estrategiaFallback()
//                     console.log(`📊 Estrategia fallback: ${noticias.length} noticias`)
//                 }

//                 // Eliminar duplicados locales
//                 const noticiasUnicas = Array.from(new Map(noticias.map((n) => [n.link, n])).values())

//                 console.log(`✅ ${nombreFuente}: ${noticiasUnicas.length} noticias únicas encontradas`)
//                 allNews.push(...noticiasUnicas)
//             } catch (error) {
//                 console.error(`❌ Error procesando ${url}:`, error)
//                 continue
//             }
//         }

//         console.log(`🎯 Total de noticias recolectadas: ${allNews.length}`)

//         if (allNews.length === 0) {
//             // Crear noticias de ejemplo para testing
//             const noticiasEjemplo = [
//                 {
//                     titulo: "Ejemplo: Últimas noticias de Argentina - Política y economía en foco",
//                     link: "https://ejemplo.com/noticia1",
//                     fuente: "Fuente de Ejemplo",
//                     dominio: "ejemplo.com",
//                 },
//                 {
//                     titulo: "Ejemplo: Desarrollo tecnológico en Mendoza - Nuevas inversiones",
//                     link: "https://ejemplo.com/noticia2",
//                     fuente: "Fuente de Ejemplo",
//                     dominio: "ejemplo.com",
//                 },
//                 {
//                     titulo: "Ejemplo: Clima y agricultura - Pronóstico para la región",
//                     link: "https://ejemplo.com/noticia3",
//                     fuente: "Fuente de Ejemplo",
//                     dominio: "ejemplo.com",
//                 },
//                 {
//                     titulo: "Ejemplo: Deportes locales - Resultados del fin de semana",
//                     link: "https://ejemplo.com/noticia4",
//                     fuente: "Fuente de Ejemplo",
//                     dominio: "ejemplo.com",
//                 },
//                 {
//                     titulo: "Ejemplo: Educación y cultura - Nuevos programas universitarios",
//                     link: "https://ejemplo.com/noticia5",
//                     fuente: "Fuente de Ejemplo",
//                     dominio: "ejemplo.com",
//                 },
//             ]

//             console.log("⚠️ No se encontraron noticias reales, usando ejemplos para testing")

//             return new Response(JSON.stringify(noticiasEjemplo), {
//                 status: 200,
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Cache-Control": "no-cache, no-store, must-revalidate",
//                 },
//             })
//         }

//         // Eliminar duplicados globales
//         const noticiasFinales = Array.from(
//             new Map(
//                 allNews.map((noticia) => {
//                     const clave = noticia.titulo
//                         .toLowerCase()
//                         .replace(/[^\w\s]/g, "")
//                         .substring(0, 50)
//                     return [clave, noticia]
//                 }),
//             ).values(),
//         ).slice(0, 100)

//         console.log(`🏁 Resultado final: ${noticiasFinales.length} noticias únicas`)

//         return new Response(JSON.stringify(noticiasFinales), {
//             status: 200,
//             headers: {
//                 "Content-Type": "application/json",
//                 "Cache-Control": "no-cache, no-store, must-revalidate",
//                 Pragma: "no-cache",
//                 Expires: "0",
//             },
//         })
//     } catch (error: any) {
//         console.error("💥 Error general en API:", error)
//         return new Response(
//             JSON.stringify({
//                 error: error.message || "Error interno del servidor",
//                 stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
//             }),
//             {
//                 status: 500,
//                 headers: { "Content-Type": "application/json" },
//             },
//         )
//     }
// }



// import * as cheerio from "cheerio";

// const fuentesInfo = {
//     "mdzol.com": "MDZ Online",
//     "losandes.com.ar": "Los Andes",
//     "infobae.com": "Infobae",
//     "eldestapeweb.com": "El Destape",
//     "www.lanacion.com.ar": "La Nacion",
//     "ambito.com": "Ambito",
//     "clarin.com": "Clarin",
//     "www.pagina12.com.ar": "Pagina 12",
//     "www.elmundo.com": "El Mundo",
//     "elpais.com": "El Pais",
//     "www.abc.com.ar": "ABC",
//     "www.tycsports.com": "TycSports",
//     "www.elsol.com.ar": "Diario El Sol (Mendoza)",
//     "www.memo.com.ar": "Memo (Mendoza)",
//     "www.plusnoticias.com": "Plus Noticias (Mendoza)",
//     "argentina.as.com": "AS Argentina (Deportes)",
//     "www.rosario3.com": "Rosario3 Deportes",
//     "www.elmercurio.com": "El Mercurio (Chile)",
//     "cooperativa.cl": "Cooperativa (Chile)",
//     "elpais.com/chile": "El País Chile",
//     "www.eltiempo.com": "El Tiempo (Colombia)",
//     "www.elcolombiano.com": "El Colombiano (Colombia)",
//     "elcomercio.pe": "El Comercio (Perú)",
//     "larepublica.pe": "La República (Perú)",
//     "elpais.com/mexico": "El País México",
//     "www.reforma.com": "Reforma (México)",
//     "www.elmundo.es": "El Mundo (España)",
//     "www.abc.es": "ABC (España)",
//     "www.larazon.es": "La Razón (España)",
//     "www.marca.com": "Marca (España - Deportes)",
//     "as.com": "AS (España - Deportes)",
// };

// export async function POST(request: Request) {
//     const headers = {
//         "User-Agent":
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
//         Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
//         "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
//         "Accept-Encoding": "gzip, deflate, br",
//         DNT: "1",
//         Connection: "keep-alive",
//         "Upgrade-Insecure-Requests": "1",
//         "Sec-Fetch-Dest": "document",
//         "Sec-Fetch-Mode": "navigate",
//         "Sec-Fetch-Site": "none",
//         "Cache-Control": "max-age=0",
//     };

//     try {
//         const body = await request.json();
//         const urls: string[] = body.urls;

//         if (!Array.isArray(urls) || urls.length === 0) {
//             return new Response(JSON.stringify({ error: "No se proporcionaron URLs válidas" }), {
//                 status: 400,
//                 headers: { "Content-Type": "application/json" },
//             });
//         }

//         const allNews: { titulo: string; link: string; fuente: string; dominio: string }[] = [];

//         for (const url of urls) {
//             try {
//                 console.log(`🔍 Procesando: ${url}`);
//                 await new Promise((resolve) => setTimeout(resolve, 1500));

//                 const response = await fetch(url, {
//                     headers,
//                     cache: "no-store",
//                     signal: AbortSignal.timeout(20000),
//                 });

//                 if (!response.ok) {
//                     console.warn(`❌ Error HTTP ${response.status} para ${url}`);
//                     continue;
//                 }

//                 const html = await response.text();
//                 console.log(`📄 HTML recibido de ${url}: ${html.length} caracteres`);

//                 const $ = cheerio.load(html);
//                 const dominio = new URL(url).hostname.replace("www.", "");
//                 const nombreFuente = fuentesInfo[dominio as keyof typeof fuentesInfo] || dominio;
//                 const noticias: { titulo: string; link: string; fuente: string; dominio: string }[] = [];

//                 const extractNews = () => {
//                     const selectoresGenerales = [
//                         'a[href*="/nota/"]',
//                         'a[href*="/noticia/"]',
//                         'a[href*="/news/"]',
//                         'a[href*="/articulo/"]',
//                         "article a",
//                         "h1 a, h2 a, h3 a",
//                         ".titulo a, .title a",
//                         ".noticia a, .news a",
//                         ".card a",
//                         ".story a",
//                     ];

//                     selectoresGenerales.forEach((selector) => {
//                         $(selector).each((_, element) => {
//                             const $element = $(element);
//                             let titulo = $element.text().trim();
//                             if (!titulo) {
//                                 titulo = $element.attr("title") || $element.attr("aria-label") || $element.find("img").attr("alt") || "";
//                             }
//                             const href = $element.attr("href");

//                             if (titulo && href && titulo.length > 15 && titulo.length < 250) {
//                                 if (
//                                     titulo.toLowerCase().includes("publicidad") ||
//                                     titulo.toLowerCase().includes("suscrib") ||
//                                     titulo.toLowerCase().includes("newsletter")
//                                 ) {
//                                     return;
//                                 }

//                                 let link = href;
//                                 if (!href.startsWith("http")) {
//                                     link = `${url.replace(/\/$/, "")}${href.startsWith("/") ? "" : "/"}${href}`;
//                                 }

//                                 try {
//                                     new URL(link);
//                                     noticias.push({
//                                         titulo: titulo.replace(/\s+/g, " ").trim(),
//                                         link,
//                                         fuente: nombreFuente,
//                                         dominio,
//                                     });
//                                 } catch {
//                                     // URL inválida, ignorar
//                                 }
//                             }
//                         });
//                     });

//                     // Fallback para encontrar enlaces con texto significativo
//                     if (noticias.length < 3) {
//                         $("a[href]").each((_, element) => {
//                             const $element = $(element);
//                             const href = $element.attr("href");
//                             let titulo = $element.text().trim();
//                             if (!titulo) {
//                                 titulo = $element.attr("title") || $element.attr("aria-label") || "";
//                             }

//                             if (
//                                 titulo &&
//                                 href &&
//                                 titulo.length > 20 &&
//                                 titulo.length < 200 &&
//                                 href.includes("/") &&
//                                 !href.includes("javascript:") &&
//                                 !href.includes("mailto:") &&
//                                 !href.includes("tel:")
//                             ) {
//                                 let link = href;
//                                 if (!href.startsWith("http")) {
//                                     link = `${url.replace(/\/$/, "")}${href.startsWith("/") ? "" : "/"}${href}`;
//                                 }
//                                 try {
//                                     new URL(link);
//                                     noticias.push({
//                                         titulo: titulo.replace(/\s+/g, " ").trim(),
//                                         link,
//                                         fuente: nombreFuente,
//                                         dominio,
//                                     });
//                                 } catch {
//                                     // URL inválida, ignorar
//                                 }
//                             }
//                         });
//                     }
//                 };

//                 extractNews();
//                 const noticiasUnicas = Array.from(new Map(noticias.map((n) => [n.link, n])).values());
//                 console.log(`✅ ${nombreFuente}: ${noticiasUnicas.length} noticias únicas encontradas`);
//                 allNews.push(...noticiasUnicas);

//             } catch (error) {
//                 console.error(`❌ Error procesando ${url}:`, error);
//                 continue;
//             }
//         }

//         console.log(`🎯 Total de noticias recolectadas: ${allNews.length}`);

//         const noticiasFinales = Array.from(
//             new Map(
//                 allNews.map((noticia) => [
//                     noticia.titulo.toLowerCase().replace(/[^\w\s]/g, "").substring(0, 50),
//                     noticia,
//                 ])
//             ).values()
//         ).slice(0, 100);

//         console.log(`🏁 Resultado final: ${noticiasFinales.length} noticias únicas`);

//         return new Response(JSON.stringify(noticiasFinales), {
//             status: 200,
//             headers: {
//                 "Content-Type": "application/json",
//                 "Cache-Control": "no-cache, no-store, must-revalidate",
//                 Pragma: "no-cache",
//                 Expires: "0",
//             },
//         });

//     } catch (error: any) {
//         console.error("💥 Error general en API:", error);
//         return new Response(
//             JSON.stringify({
//                 error: error.message || "Error interno del servidor",
//                 stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
//             }),
//             {
//                 status: 500,
//                 headers: { "Content-Type": "application/json" },
//             }
//         );
//     }
// }



import * as cheerio from "cheerio";

const fuentesInfo: Record<string, string> = {
//   "mdzol.com": "MDZ Online",
//   "losandes.com.ar": "Los Andes",
//   "elsol.com.ar": "El Sol",
//   "diariouno.com.ar": "Diario Uno",
//   "infobae.com": "Infobae",
//   "eldestapeweb.com": "El Destape",
//   "lanacion.com.ar": "La Nacion",
//   "ambito.com": "Ámbito",
//   "clarin.com": "Clarin",
//   "pagina12.com.ar": "Pagina 12",
//   "memo.com.ar": "Memo",
//   "plusnoticias.com": "Plus Noticias",
//   "tycsports.com": "TyC Sports",
//   "ole.com.ar": "Olé",
};

const SELECTORES_NOTICIAS = [
    // Selectores generales
    'a[href*="/nota/"]',
    'a[href*="/noticia/"]',
    'a[href*="/news/"]',
    'a[href*="/articulo/"]',
    'a[href*="/article/"]',
    'a[href*="/novedad/"]',
    'a[href*="/informacion/"]',
    'a[href*="/reportaje/"]',
    'a[href*="/publicacion/"]',
    'a[href*="/materia/"]',
    
    // Selectores por estructura HTML
    "article a",
    "main a",
    "section a",
    "div[role='article'] a",
    "h1 a, h2 a, h3 a, h4 a",
    "header a",
    "figure a",
    "figcaption a",
    
    // Selectores por clases comunes
    ".titulo a, .title a, .headline a",
    ".noticia a, .news a, .post a, .story a",
    ".card a, .entry-title a, .item a",
    ".news-title a, .media a, .caja a",
    ".nota a, .articulo a, .materia a",
    ".contenido a, .content a, .body a",
    ".destacado a, .featured a, .principal a",
    ".encabezado a, .heading a, .cabecera a",
    ".sumario a, .summary a, .resumen a",
    ".nota-titulo a, .article-title a",
    ".noticia-titulo a, .news-heading a",
    ".notaPrincipal a, .main-article a",
    
    // Selectores específicos para algunos sitios
    ".firma a", // Para notas de opinión/columnistas
    ".volanta a", // Típico en periódicos argentinos
    ".epigrafe a", // Para pies de foto
    ".breaking-news a", // Para noticias de última hora
    ".ultimo-momento a", // Para noticias urgentes
    ".mas-leido a, .mas-leidas a", // Para secciones populares
    ".recomendado a, .related a", // Para contenido relacionado
    
    // Selectores para sitios específicos de tu lista
    '[data-trk="noticia"] a', // Para Infobae
    '.headline-link', // Para Clarín
    '.title-news', // Para Página 12
    '.news-item__title a', // Para El País
    '.news-item a', // Para varios sitios
    '.news-list-item a', // Para varios sitios
    '.news-block a', // Para varios sitios
    '.article-header a', // Para La Nación
    '.article-title a', // Para Ámbito
    '.note-title a', // Para MDZ
    '.breakingnews a', // Para noticias de última hora
    '.breaking-news-item a' // Para noticias urgentes
  ];


  

function limpiarTexto(text: string): string {
  return text.replace(/\s+/g, " ").replace(/[\n\r\t]+/g, "").trim();
}

function normalizarUrl(href: string, base: string): string {
  try {
    return new URL(href, base).toString();
  } catch {
    return "";
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const urls: string[] = body.urls;

  if (!Array.isArray(urls) || urls.length === 0) {
    return new Response(JSON.stringify({ error: "No se proporcionaron URLs válidas" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
    Connection: "keep-alive",
  };

  const resultados = await Promise.allSettled(
    urls.map(async (url) => {
      try {
        const dominio = new URL(url).hostname.replace(/^www\./, "");
        const fuente = fuentesInfo[dominio] || dominio;

        const response = await fetch(url, {
          headers,
          cache: "no-store",
          signal: AbortSignal.timeout(15000),
        });

        const html = await response.text();
        const $ = cheerio.load(html);

        const noticias: { titulo: string; link: string; fuente: string; dominio: string }[] = [];

        for (const selector of SELECTORES_NOTICIAS) {
          $(selector).each((_, el) => {
            const $el = $(el);
            let titulo = limpiarTexto($el.text());

            if (!titulo || titulo.length < 15 || titulo.length > 200) return;
            if (titulo.toLowerCase().includes("publicidad") || titulo.toLowerCase().includes("suscrib")) return;

            let href = $el.attr("href");
            if (!href) return;

            const link = normalizarUrl(href, url);
            if (!link.startsWith("http")) return;

            noticias.push({ titulo, link, fuente, dominio });
          });
        }

        // Fallback: buscar <a> largos
        if (noticias.length < 3) {
          $("a[href]").each((_, el) => {
            const $el = $(el);
            let titulo = limpiarTexto($el.text());
            const href = $el.attr("href");

            if (
              titulo.length > 20 &&
              href &&
              !href.includes("mailto:") &&
              !href.includes("javascript:") &&
              !titulo.toLowerCase().includes("publicidad")
            ) {
              const link = normalizarUrl(href, url);
              if (!link.startsWith("http")) return;

              noticias.push({ titulo, link, fuente, dominio });
            }
          });
        }

        // Quitar duplicados locales
        const unicos = Array.from(new Map(noticias.map((n) => [n.link, n])).values());

        return unicos;
      } catch (err) {
        console.warn(`❌ Error procesando: ${url}`, err);
        return [];
      }
    })
  );

  // Unir todas las noticias
  const noticiasTotales = resultados
    .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
    .flatMap((r) => r.value);

  // Eliminar duplicados globales por título (normalizado)
  const noticiasFinales = Array.from(
    new Map(
      noticiasTotales.map((n) => [n.titulo.toLowerCase().replace(/[^\w\s]/g, "").slice(0, 100), n])
    ).values()
  ).slice(0, 100050);

  return new Response(JSON.stringify(noticiasFinales), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
