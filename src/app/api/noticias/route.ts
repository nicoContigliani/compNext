// import * as cheerio from "cheerio";

// const fuentesInfo: Record<string, string> = {
// //   "mdzol.com": "MDZ Online",
// //   "losandes.com.ar": "Los Andes",
// //   "elsol.com.ar": "El Sol",
// //   "diariouno.com.ar": "Diario Uno",
// //   "infobae.com": "Infobae",
// //   "eldestapeweb.com": "El Destape",
// //   "lanacion.com.ar": "La Nacion",
// //   "ambito.com": "Ámbito",
// //   "clarin.com": "Clarin",
// //   "pagina12.com.ar": "Pagina 12",
// //   "memo.com.ar": "Memo",
// //   "plusnoticias.com": "Plus Noticias",
// //   "tycsports.com": "TyC Sports",
// //   "ole.com.ar": "Olé",
// };

// const SELECTORES_NOTICIAS = [
//     // Selectores generales
//     'a[href*="/nota/"]',
//     'a[href*="/noticia/"]',
//     'a[href*="/news/"]',
//     'a[href*="/articulo/"]',
//     'a[href*="/article/"]',
//     'a[href*="/novedad/"]',
//     'a[href*="/informacion/"]',
//     'a[href*="/reportaje/"]',
//     'a[href*="/publicacion/"]',
//     'a[href*="/materia/"]',
    
//     // Selectores por estructura HTML
//     "article a",
//     "main a",
//     "section a",
//     "div[role='article'] a",
//     "h1 a, h2 a, h3 a, h4 a",
//     "header a",
//     "figure a",
//     "figcaption a",
    
//     // Selectores por clases comunes
//     ".titulo a, .title a, .headline a",
//     ".noticia a, .news a, .post a, .story a",
//     ".card a, .entry-title a, .item a",
//     ".news-title a, .media a, .caja a",
//     ".nota a, .articulo a, .materia a",
//     ".contenido a, .content a, .body a",
//     ".destacado a, .featured a, .principal a",
//     ".encabezado a, .heading a, .cabecera a",
//     ".sumario a, .summary a, .resumen a",
//     ".nota-titulo a, .article-title a",
//     ".noticia-titulo a, .news-heading a",
//     ".notaPrincipal a, .main-article a",
    
//     // Selectores específicos para algunos sitios
//     ".firma a", // Para notas de opinión/columnistas
//     ".volanta a", // Típico en periódicos argentinos
//     ".epigrafe a", // Para pies de foto
//     ".breaking-news a", // Para noticias de última hora
//     ".ultimo-momento a", // Para noticias urgentes
//     ".mas-leido a, .mas-leidas a", // Para secciones populares
//     ".recomendado a, .related a", // Para contenido relacionado
    
//     // Selectores para sitios específicos de tu lista
//     '[data-trk="noticia"] a', // Para Infobae
//     '.headline-link', // Para Clarín
//     '.title-news', // Para Página 12
//     '.news-item__title a', // Para El País
//     '.news-item a', // Para varios sitios
//     '.news-list-item a', // Para varios sitios
//     '.news-block a', // Para varios sitios
//     '.article-header a', // Para La Nación
//     '.article-title a', // Para Ámbito
//     '.note-title a', // Para MDZ
//     '.breakingnews a', // Para noticias de última hora
//     '.breaking-news-item a' // Para noticias urgentes
//   ];


  

// function limpiarTexto(text: string): string {
//   return text.replace(/\s+/g, " ").replace(/[\n\r\t]+/g, "").trim();
// }

// function normalizarUrl(href: string, base: string): string {
//   try {
//     return new URL(href, base).toString();
//   } catch {
//     return "";
//   }
// }

// export async function POST(request: Request) {
//   const body = await request.json();
//   const urls: string[] = body.urls;

//   if (!Array.isArray(urls) || urls.length === 0) {
//     return new Response(JSON.stringify({ error: "No se proporcionaron URLs válidas" }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const headers = {
//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
//     Accept:
//       "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//     "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
//     Connection: "keep-alive",
//   };

//   const resultados = await Promise.allSettled(
//     urls.map(async (url) => {
//       try {
//         const dominio = new URL(url).hostname.replace(/^www\./, "");
//         const fuente = fuentesInfo[dominio] || dominio;

//         const response = await fetch(url, {
//           headers,
//           cache: "no-store",
//           signal: AbortSignal.timeout(15000),
//         });

//         const html = await response.text();
//         const $ = cheerio.load(html);

//         const noticias: { titulo: string; link: string; fuente: string; dominio: string }[] = [];

//         for (const selector of SELECTORES_NOTICIAS) {
//           $(selector).each((_, el) => {
//             const $el = $(el);
//             let titulo = limpiarTexto($el.text());

//             if (!titulo || titulo.length < 15 || titulo.length > 200) return;
//             if (titulo.toLowerCase().includes("publicidad") || titulo.toLowerCase().includes("suscrib")) return;

//             let href = $el.attr("href");
//             if (!href) return;

//             const link = normalizarUrl(href, url);
//             if (!link.startsWith("http")) return;

//             noticias.push({ titulo, link, fuente, dominio });
//           });
//         }

//         // Fallback: buscar <a> largos
//         if (noticias.length < 3) {
//           $("a[href]").each((_, el) => {
//             const $el = $(el);
//             let titulo = limpiarTexto($el.text());
//             const href = $el.attr("href");

//             if (
//               titulo.length > 20 &&
//               href &&
//               !href.includes("mailto:") &&
//               !href.includes("javascript:") &&
//               !titulo.toLowerCase().includes("publicidad")
//             ) {
//               const link = normalizarUrl(href, url);
//               if (!link.startsWith("http")) return;

//               noticias.push({ titulo, link, fuente, dominio });
//             }
//           });
//         }

//         // Quitar duplicados locales
//         const unicos = Array.from(new Map(noticias.map((n) => [n.link, n])).values());

//         return unicos;
//       } catch (err) {
//         console.warn(`❌ Error procesando: ${url}`, err);
//         return [];
//       }
//     })
//   );

//   // Unir todas las noticias
//   const noticiasTotales = resultados
//     .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
//     .flatMap((r) => r.value);

//   // Eliminar duplicados globales por título (normalizado)
//   const noticiasFinales = Array.from(
//     new Map(
//       noticiasTotales.map((n) => [n.titulo.toLowerCase().replace(/[^\w\s]/g, "").slice(0, 100), n])
//     ).values()
//   ).slice(0, 100050);

//   return new Response(JSON.stringify(noticiasFinales), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }



import * as cheerio from "cheerio";

const fuentesInfo: Record<string, string> = {
  "mdzol.com": "MDZ Online",
  "losandes.com.ar": "Los Andes",
  "elsol.com.ar": "El Sol",
  "diariouno.com.ar": "Diario Uno",
  "infobae.com": "Infobae",
  "eldestapeweb.com": "El Destape",
  "lanacion.com.ar": "La Nacion",
  "ambito.com": "Ámbito",
  "clarin.com": "Clarin",
  "pagina12.com.ar": "Pagina 12",
  "memo.com.ar": "Memo",
  "plusnoticias.com": "Plus Noticias",
  "tycsports.com": "TyC Sports",
  "ole.com.ar": "Olé",
};

const SELECTORES_NOTICIAS = [
  'a[href*="/nota/"]',
  'a[href*="/noticia/"]',
  'a[href*="/news/"]',
  'a[href*="/articulo/"]',
  'article a',
  '.title a',
  '.headline a',
  '.news-title a',
  '.card a',
  '.nota a',
  '.news-item__title a',
  '.article-header a',
  '.note-title a',
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

function extraerImagenCercana($el: any): string | null {
  const imagen = $el.closest("article, div, section").find("img").first();
  const src = imagen.attr("src") || imagen.attr("data-src");
  if (src && src.startsWith("http")) return src;
  return null;
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
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
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
        const noticias: {
          titulo: string;
          link: string;
          fuente: string;
          dominio: string;
          imagen?: string;
        }[] = [];

        for (const selector of SELECTORES_NOTICIAS) {
          $(selector).each((_, el) => {
            const $el = $(el);
            const titulo = limpiarTexto($el.text());

            if (!titulo || titulo.length < 15 || titulo.length > 200) return;
            if (titulo.toLowerCase().includes("publicidad") || titulo.toLowerCase().includes("suscrib")) return;

            const href = $el.attr("href");
            if (!href) return;

            const link = normalizarUrl(href, url);
            if (!link.startsWith("http")) return;

            const imagen:any = extraerImagenCercana($el);

            noticias.push({ titulo, link, fuente, dominio, imagen });
          });
        }

        if (noticias.length < 3) {
          $("a[href]").each((_, el) => {
            const $el = $(el);
            const titulo = limpiarTexto($el.text());
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

              const imagen:any = extraerImagenCercana($el);

              noticias.push({ titulo, link, fuente, dominio, imagen });
            }
          });
        }

        // Quitar duplicados por link
        const unicos = Array.from(new Map(noticias.map((n) => [n.link, n])).values());

        return unicos;
      } catch (err) {
        console.warn(`❌ Error procesando: ${url}`, err);
        return [];
      }
    })
  );

  const noticiasTotales = resultados
    .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
    .flatMap((r) => r.value);

  const noticiasFinales = Array.from(new Map(noticiasTotales.map((n) => [n.link, n])).values());

  return new Response(JSON.stringify(noticiasFinales), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
