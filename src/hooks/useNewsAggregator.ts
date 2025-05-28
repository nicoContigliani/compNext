// import { useState, useEffect, useCallback, useMemo } from "react";

// type Noticia = {
//   titulo: string;
//   link: string;
//   fuente: string;
//   dominio: string;
//   imagen?: string;
//   fechaExtraccion?: Date;
// };

// type GrupoNoticias = {
//   id: string;
//   tema: string;
//   noticias: Noticia[];
//   palabrasClave: string[];
//   relevancia: number;
//   imagenPrincipal?: string;
// };

// type ApiResponse = Noticia[] | { error: string; suggestion?: string; htmlSample?: string };

// // Fuera del componente para evitar recreación
// const fuentes = [
//   { url: "https://www.mdzol.com", nombre: "MDZ Online" },
//   { url: "https://www.losandes.com.ar", nombre: "Los Andes" },
//   { url: "https://www.infobae.com", nombre: "Infobae" },
//   { url: "https://www.eldestapeweb.com/", nombre: "El Destape" },
//   { url: "https://www.lanacion.com.ar/", nombre: "La Nacion" },
//   { url: "https://www.ambito.com", nombre: "Ambito" },
//   { url: "https://www.cronista.com/", nombre: "El Cronista" },
//   { url: "https://www.elmundo.com", nombre: "El Mundo" },
//   { url: "https://www.elpais.com", nombre: "El Pais" },
//   { url: "https://www.abc.com.ar", nombre: "ABC" },
//   { url: "https://www.tycsports.com/", nombre: "TycSports" },
//   { url: "https://www.ole.com.ar/", nombre: "Olé" },
//   { url: "https://www.lanacion.com.ar/deportes/", nombre: "La Nacion Deportes" },
//   { url: "https://www.rosario3.com/", nombre: "Rosario3" },
//   { url: "https://www.rosario3.com/seccion/deportes/", nombre: "Rosario3 Deportes" },
//   { url: "https://www.elsol.com.ar/", nombre: "Diario El Sol (Mendoza)" },
//   { url: "https://www.memo.com.ar/", nombre: "Memo (Mendoza)" },
//   { url: "https://www.plusnoticias.com/", nombre: "Plus Noticias (Mendoza)" },
//   { url: "https://argentina.as.com/", nombre: "AS Argentina (Deportes)" },
//   { url: "https://cooperativa.cl/", nombre: "Cooperativa (Chile)" },
//   { url: "https://elpais.com/chile/", nombre: "El País Chile" },
//   { url: "https://www.eltiempo.com/", nombre: "El Tiempo (Colombia)" },
//   { url: "https://www.elcolombiano.com/", nombre: "El Colombiano (Colombia)" },
//   { url: "https://larepublica.pe/", nombre: "La República (Perú)" },
//   { url: "https://elpais.com/mexico/", nombre: "El País México" },
//   { url: "https://www.reforma.com/", nombre: "Reforma (México)" },
//   { url: "https://elpais.com/", nombre: "El País (España)" },
//   { url: "https://www.as.com", nombre: "AS (España - Deportes)" },
// ];

// const TEMAS_POR_PAGINA_SIDEBAR = 10;

// // Función memoizada fuera del componente
// const memoizedNormalize = (() => {
//   const cache = new Map<string, string>();
//   return (texto: string) => {
//     if (cache.has(texto)) return cache.get(texto)!;
//     const normalized = texto
//       .toLowerCase()
//       .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
//       .replace(/[^\w\s]/g, " ")
//       .replace(/\s+/g, " ")
//       .trim();
//     cache.set(texto, normalized);
//     return normalized;
//   };
// })();

// // Palabras comunes precalculadas
// const PALABRAS_COMUNES = new Set([
//   "que", "con", "por", "para", "una", "del", "las", "los", "este", "esta",
//   "desde", "hasta", "sobre", "tras", "ante", "bajo", "entre", "hacia", "según",
//   "ejemplo", "nueva", "nuevo", "últimas", "último", "más", "cómo", "qué"
// ]);

// export const useNewsAggregator = () => {
//   const [grupos, setGrupos] = useState<GrupoNoticias[]>([]);
//   const [grupoSeleccionado, setGrupoSeleccionado] = useState<any | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [paginaSidebar, setPaginaSidebar] = useState<number>(1);
//   const [busquedaTema, setBusquedaTema] = useState<string>("");
//   const [ultimaActualizacion, setUltimaActualizacion] = useState<Date>(new Date());
//   const [modoDemo, setModoDemo] = useState<boolean>(false);

//   const calcularSimilitudOptimizada = useCallback((titulo1: string, titulo2: string): number => {
//     if (titulo1.includes(titulo2) || titulo2.includes(titulo1)) return 0.8;

//     const t1 = memoizedNormalize(titulo1);
//     const t2 = memoizedNormalize(titulo2);

//     const palabras1 = t1.split(" ").filter(p => p.length > 3 && !PALABRAS_COMUNES.has(p));
//     const palabras2 = t2.split(" ").filter(p => p.length > 3 && !PALABRAS_COMUNES.has(p));

//     if (palabras1.length === 0 || palabras2.length === 0) return 0;

//     const set1 = new Set(palabras1);
//     const set2 = new Set(palabras2);

//     const interseccion = palabras1.filter(p => set2.has(p));
//     const unionSize = new Set([...palabras1, ...palabras2]).size;

//     let similitudJaccard = interseccion.length / unionSize;

//     const nombresPropios = palabras1.concat(palabras2).filter(p => p[0] === p[0].toUpperCase());
//     if (nombresPropios.length > 0) {
//       const nombresComunes = palabras1.filter(p => p[0] === p[0].toUpperCase() && set2.has(p));
//       similitudJaccard += nombresComunes.length * 0.2;
//     }

//     let bonusConsecutivo = 0;
//     const limite = Math.min(palabras1.length - 1, 5);
//     for (let i = 0; i < limite; i++) {
//       const bigrama = `${palabras1[i]} ${palabras1[i + 1]}`;
//       if (t2.includes(bigrama)) bonusConsecutivo += 0.15;
//     }

//     return Math.min(1, similitudJaccard + bonusConsecutivo);
//   }, []);

//   const agruparNoticiasOptimizado = useCallback((noticias: Noticia[]): GrupoNoticias[] => {
//     const grupos: GrupoNoticias[] = [];
//     const procesadas = new Set<number>();
//     const indexPalabras = new Map<string, number[]>();

//     noticias.forEach((noticia, index) => {
//       const palabras = memoizedNormalize(noticia.titulo)
//         .split(" ")
//         .filter(p => p.length > 4 && !PALABRAS_COMUNES.has(p));

//       palabras.forEach(palabra => {
//         if (!indexPalabras.has(palabra)) {
//           indexPalabras.set(palabra, []);
//         }
//         indexPalabras.get(palabra)!.push(index);
//       });
//     });

//     Array.from(indexPalabras.entries()).forEach(([palabra, indices]) => {
//       const indicesNoProcesados = indices.filter(i => !procesadas.has(i));

//       if (indicesNoProcesados.length > 1) {
//         const grupoActual: Noticia[] = indicesNoProcesados.map(i => noticias[i]);

//         indicesNoProcesados.forEach(i => {
//           if (!procesadas.has(i)) {
//             const palabrasNoticia = memoizedNormalize(noticias[i].titulo).split(" ");
//             const palabrasRelevantes = palabrasNoticia.filter(p => p.length > 4 && !PALABRAS_COMUNES.has(p));

//             palabrasRelevantes.forEach(palabra => {
//               indexPalabras.get(palabra)?.forEach(j => {
//                 if (i !== j && !procesadas.has(j)) {
//                   const similitud = calcularSimilitudOptimizada(
//                     noticias[i].titulo,
//                     noticias[j].titulo
//                   );
//                   if (similitud > 0.4) {
//                     grupoActual.push(noticias[j]);
//                     procesadas.add(j);
//                   }
//                 }
//               });
//             });
//             procesadas.add(i);
//           }
//         });

//         if (grupoActual.length > 0) {
//           agregarGrupo(grupoActual);
//         }
//       }
//     });

//     noticias.forEach((noticia, index) => {
//       if (procesadas.has(index)) return;

//       const grupoActual: Noticia[] = [noticia];
//       procesadas.add(index);

//       const palabrasNoticia = memoizedNormalize(noticia.titulo).split(" ");
//       const palabrasClave = palabrasNoticia.filter(p => p.length > 4 && !PALABRAS_COMUNES.has(p));

//       palabrasClave.forEach(palabra => {
//         indexPalabras.get(palabra)?.forEach(j => {
//           if (index !== j && !procesadas.has(j)) {
//             const similitud = calcularSimilitudOptimizada(noticia.titulo, noticias[j].titulo);
//             if (similitud > 0.45) {
//               grupoActual.push(noticias[j]);
//               procesadas.add(j);
//             }
//           }
//         });
//       });

//       if (grupoActual.length > 0) {
//         agregarGrupo(grupoActual);
//       }
//     });

//     function agregarGrupo(noticiasGrupo: Noticia[]) {
//       const frecuencias = noticiasGrupo
//         .flatMap(n => memoizedNormalize(n.titulo).split(" "))
//         .filter(p => p.length > 4 && !PALABRAS_COMUNES.has(p))
//         .reduce((acc, palabra) => {
//           acc[palabra] = (acc[palabra] || 0) + 1;
//           return acc;
//         }, {} as Record<string, number>);

//       const palabrasClave = Object.entries(frecuencias)
//         .sort(([a, freqA], [b, freqB]) => {
//           const esNombrePropioA = noticiasGrupo.some(n =>
//             n.titulo.split(" ").some(p => p.toLowerCase() === a && p[0] === p[0].toUpperCase())
//           );
//           const esNombrePropioB = noticiasGrupo.some(n =>
//             n.titulo.split(" ").some(p => p.toLowerCase() === b && p[0] === p[0].toUpperCase())
//           );

//           if (esNombrePropioA !== esNombrePropioB) return esNombrePropioA ? -1 : 1;
//           if (b.length !== a.length) return b.length - a.length;
//           return freqB - freqA;
//         })
//         .slice(0, 5)
//         .map(([palabra]) => palabra);

//       const tituloRepresentativo = noticiasGrupo.reduce((prev, current) => {
//         const prevScore = palabrasClave.filter(p => prev.titulo.toLowerCase().includes(p)).length;
//         const currentScore = palabrasClave.filter(p => current.titulo.toLowerCase().includes(p)).length;
//         return currentScore > prevScore || (currentScore === prevScore && current.titulo.length > prev.titulo.length)
//           ? current
//           : prev;
//       }).titulo;

//       const tema = tituloRepresentativo.length > 80
//         ? tituloRepresentativo.substring(0, 80) + "..."
//         : tituloRepresentativo;

//       const fuentesUnicas = new Set(noticiasGrupo.map(n => n.fuente)).size;
//       const relevancia = noticiasGrupo.length * 10 + fuentesUnicas * 5;

//       // Seleccionar la mejor imagen para el grupo (la primera que encuentre con imagen)
//       const imagenPrincipal = noticiasGrupo.find(n => n.imagen)?.imagen;

//       grupos.push({
//         id: `grupo-${grupos.length}`,
//         tema,
//         noticias: noticiasGrupo.sort((a, b) => b.titulo.length - a.titulo.length),
//         palabrasClave,
//         relevancia,
//         imagenPrincipal
//       });
//     }

//     return grupos
//       .filter(grupo => grupo.noticias.length > 0)
//       .sort((a, b) => b.relevancia - a.relevancia);
//   }, [calcularSimilitudOptimizada]);

//   const fetchNews = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch("/api/noticias", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ urls: fuentes.map(f => f.url) }),
//       });

//       const data: ApiResponse = await response.json();

//       if (!response.ok || "error" in data) {
//         throw new Error("error" in data ? `${data.error} ${data.suggestion || ""}` : "Error desconocido");
//       }

//       const noticiasConFecha = (data as Noticia[]).map(noticia => ({
//         ...noticia,
//         fechaExtraccion: new Date(),
//       }));

//       setModoDemo(noticiasConFecha.some(n => n.titulo.startsWith("Ejemplo:")));

//       const noticiasAgrupadas = agruparNoticiasOptimizado(noticiasConFecha);
//       setGrupos(noticiasAgrupadas);
//       setUltimaActualizacion(new Date());
//       setPaginaSidebar(1);

//       if (noticiasAgrupadas.length > 0) {
//         setGrupoSeleccionado(noticiasAgrupadas[0].id);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error al cargar noticias");
//       console.error("Error fetching news:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [agruparNoticiasOptimizado]);

//   useEffect(() => {
//     fetchNews();
//     const interval = setInterval(fetchNews, 300000);
//     return () => clearInterval(interval);
//   }, [fetchNews]);

//   const gruposFiltrados = useMemo(() =>
//     grupos.filter(grupo =>
//       grupo.tema.toLowerCase().includes(busquedaTema.toLowerCase()) ||
//       grupo.palabrasClave.some(p => p.toLowerCase().includes(busquedaTema.toLowerCase()))
//   ), [grupos, busquedaTema]);

//   const totalPaginasSidebar = useMemo(() =>
//     Math.ceil(gruposFiltrados.length / TEMAS_POR_PAGINA_SIDEBAR)
//     , [gruposFiltrados]);

//   const gruposSidebar = useMemo(() =>
//     gruposFiltrados.slice(
//       (paginaSidebar - 1) * TEMAS_POR_PAGINA_SIDEBAR,
//       paginaSidebar * TEMAS_POR_PAGINA_SIDEBAR
//     )
//     , [gruposFiltrados, paginaSidebar]);

//   const grupoActual = useMemo(() =>
//     grupos.find(g => g.id === grupoSeleccionado)
//     , [grupos, grupoSeleccionado]);

//   const getFuenteColor = useCallback((dominio: string) => {
//     const colores = {
//       "mdzol.com": { backgroundColor: "#e3f2fd", color: "#1565c0" },
//       "losandes.com.ar": { backgroundColor: "#e8f5e9", color: "#2e7d32" },
//       "infobae.com": { backgroundColor: "#fff3e0", color: "#ef6c00" },
//       "eldestapeweb.com": { backgroundColor: "#fce4ec", color: "#ad1457" },
//       "lanacion.com.ar": { backgroundColor: "#e0f7fa", color: "#006064" },
//       "ambito.com": { backgroundColor: "#ede7f6", color: "#4527a0" },
//       "cronista.com": { backgroundColor: "#e0f7fa", color: "#00838f" },
//       "clarin.com": { backgroundColor: "#ffebee", color: "#c62828" },
//       "pagina12.com.ar": { backgroundColor: "#f3e5f5", color: "#6a1b9a" },
//       "elmundo.com": { backgroundColor: "#e8f5e9", color: "#388e3c" },
//       "elpais.com": { backgroundColor: "#f1f8e9", color: "#33691e" },
//       "abc.com.ar": { backgroundColor: "#e3f2fd", color: "#0d47a1" },
//       "tycsports.com": { backgroundColor: "#fbe9e7", color: "#bf360c" },
//       "elsol.com.ar": { backgroundColor: "#fff8e1", color: "#ff8f00" },
//       "memo.com.ar": { backgroundColor: "#f3e5f5", color: "#8e24aa" },
//       "plusnoticias.com": { backgroundColor: "#fce4ec", color: "#c2185b" },
//       "argentina.as.com": { backgroundColor: "#ede7f6", color: "#512da8" },
//       "rosario3.com": { backgroundColor: "#e1f5fe", color: "#0288d1" },
//       "elmercurio.com": { backgroundColor: "#e3f2fd", color: "#1976d2" },
//       "cooperativa.cl": { backgroundColor: "#fffde7", color: "#f9a825" },
//       "elpais.com/chile": { backgroundColor: "#f1f8e9", color: "#558b2f" },
//       "eltiempo.com": { backgroundColor: "#e0f7fa", color: "#00838f" },
//       "elcolombiano.com": { backgroundColor: "#fbe9e7", color: "#d84315" },
//       "elcomercio.pe": { backgroundColor: "#fff3e0", color: "#ef6c00" },
//       "larepublica.pe": { backgroundColor: "#fce4ec", color: "#c2185b" },
//       "elpais.com/mexico": { backgroundColor: "#f1f8e9", color: "#33691e" },
//       "reforma.com": { backgroundColor: "#e8f5e9", color: "#2e7d32" },
//       "elmundo.es": { backgroundColor: "#e3f2fd", color: "#1976d2" },
//       "abc.es": { backgroundColor: "#ede7f6", color: "#5e35b1" },
//       "larazon.es": { backgroundColor: "#e1f5fe", color: "#0277bd" },
//       "marca.com": { backgroundColor: "#fbe9e7", color: "#d84315" },
//       "as.com": { backgroundColor: "#ede7f6", color: "#512da8" },
//       "lanacion.com.ar/deportes": { backgroundColor: "#ede7f6", color: "#512da8" },
//     };
//     return colores[dominio as keyof typeof colores] || { backgroundColor: "#f5f5f5", color: "#424242" };
//   }, []);

//   return {
//     // Estado
//     grupos,
//     grupoSeleccionado,
//     loading,
//     error,
//     paginaSidebar,
//     busquedaTema,
//     ultimaActualizacion,
//     modoDemo,
//     gruposFiltrados,
//     totalPaginasSidebar,
//     gruposSidebar,
//     grupoActual,
//     fuentes,

//     // Acciones
//     setGrupoSeleccionado,
//     setPaginaSidebar,
//     setBusquedaTema,
//     fetchNews,

//     // Utilidades
//     getFuenteColor,
//   };
// };

import { useState, useEffect, useCallback, useMemo } from "react";

type Noticia = {
  titulo: string;
  link: string;
  fuente: string;
  dominio: string;
  imagen?: string;
  fechaExtraccion?: Date;
};

type GrupoNoticias = {
  id: string;
  tema: string;
  noticias: Noticia[];
  palabrasClave: string[];
  relevancia: number;
  imagenPrincipal?: string;
};

type ApiResponse = Noticia[] | { error: string; suggestion?: string; htmlSample?: string };

// Fuentes principales para priorización
const FUENTES_PRINCIPALES = [
  'infobae.com',
  'lanacion.com.ar',
  'clarin.com',
  'eldestapeweb.com',
  'ambito.com',
  'cronista.com',
  'losandes.com.ar',
  'mdzol.com',
  'rosario3.com',
  'tycsports.com',
  'argentina.as.com',
  'elpais.com',
  'abc.com.ar'
];

// Fuera del componente para evitar recreación
const fuentes = [
  { url: "https://www.mdzol.com", nombre: "MDZ Online" },
  { url: "https://www.losandes.com.ar", nombre: "Los Andes" },
  { url: "https://www.infobae.com", nombre: "Infobae" },
  { url: "https://www.eldestapeweb.com/", nombre: "El Destape" },
  { url: "https://www.lanacion.com.ar/", nombre: "La Nacion" },
  { url: "https://www.ambito.com", nombre: "Ambito" },
  { url: "https://www.cronista.com/", nombre: "El Cronista" },
  { url: "https://www.elpais.com", nombre: "El Pais" },
  { url: "https://www.abc.com.ar", nombre: "ABC" },
  { url: "https://www.tycsports.com/", nombre: "TycSports" },
  { url: "https://www.lanacion.com.ar/deportes/", nombre: "La Nacion Deportes" },
  { url: "https://www.rosario3.com/", nombre: "Rosario3" },
  { url: "https://www.rosario3.com/seccion/deportes/", nombre: "Rosario3 Deportes" },
  { url: "https://www.elsol.com.ar/", nombre: "Diario El Sol (Mendoza)" },
  { url: "https://www.memo.com.ar/", nombre: "Memo (Mendoza)" },
  { url: "https://www.plusnoticias.com/", nombre: "Plus Noticias (Mendoza)" },
  { url: "https://argentina.as.com/", nombre: "AS Argentina (Deportes)" },
  { url: "https://cooperativa.cl/", nombre: "Cooperativa (Chile)" },
  { url: "https://elpais.com/chile/", nombre: "El País Chile" },
  { url: "https://www.eltiempo.com/", nombre: "El Tiempo (Colombia)" },
  { url: "https://www.elcolombiano.com/", nombre: "El Colombiano (Colombia)" },
  { url: "https://elpais.com/mexico/", nombre: "El País México" },
  { url: "https://www.reforma.com/", nombre: "Reforma (México)" },
  { url: "https://elpais.com/", nombre: "El País (España)" },
  { url: "https://www.as.com", nombre: "AS (España - Deportes)" },
];

const TEMAS_POR_PAGINA_SIDEBAR = 10;

// Función memoizada fuera del componente
const memoizedNormalize = (() => {
  const cache = new Map<string, string>();
  return (texto: string) => {
    if (cache.has(texto)) return cache.get(texto)!;
    const normalized = texto
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    cache.set(texto, normalized);
    return normalized;
  };
})();

// Palabras comunes precalculadas
const PALABRAS_COMUNES = new Set([
  "que", "con", "por", "para", "una", "del", "las", "los", "este", "esta",
  "desde", "hasta", "sobre", "tras", "ante", "bajo", "entre", "hacia", "según",
  "ejemplo", "nueva", "nuevo", "últimas", "último", "más", "cómo", "qué"
]);

export const useNewsAggregator = () => {
  const [grupos, setGrupos] = useState<GrupoNoticias[]>([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaSidebar, setPaginaSidebar] = useState<number>(1);
  const [busquedaTema, setBusquedaTema] = useState<string>("");
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date>(new Date());
  const [modoDemo, setModoDemo] = useState<boolean>(false);

  // Función para extraer entidades nombradas (nombres propios)
  const extraerEntidades = useCallback((texto: string): string[] => {
    const palabras = texto.split(' ');
    return palabras.filter(p => 
      p.length > 2 && 
      p[0] === p[0].toUpperCase() && 
      !PALABRAS_COMUNES.has(p.toLowerCase())
    );
  }, []);

  const calcularSimilitudOptimizada = useCallback((titulo1: string, titulo2: string): number => {
    // Coincidencia exacta
    if (titulo1 === titulo2) return 1.0;
    
    // Inclusión mutua
    if (titulo1.includes(titulo2) || titulo2.includes(titulo1)) return 0.85;

    const t1 = memoizedNormalize(titulo1);
    const t2 = memoizedNormalize(titulo2);

    // Entidades nombradas
    const entidades1 = extraerEntidades(titulo1);
    const entidades2 = extraerEntidades(titulo2);
    const entidadesComunes = entidades1.filter(e => 
      entidades2.some(e2 => e.toLowerCase() === e2.toLowerCase())
    );
    const bonusEntidades = entidadesComunes.length * 0.25;

    // Palabras clave relevantes
    const palabras1 = t1.split(" ").filter(p => p.length > 3 && !PALABRAS_COMUNES.has(p));
    const palabras2 = t2.split(" ").filter(p => p.length > 3 && !PALABRAS_COMUNES.has(p));

    if (palabras1.length === 0 || palabras2.length === 0) return 0;

    // Similitud Jaccard
    const set1 = new Set(palabras1);
    const set2 = new Set(palabras2);
    const interseccion = palabras1.filter(p => set2.has(p));
    const unionSize = new Set([...palabras1, ...palabras2]).size;
    let similitudJaccard = interseccion.length / unionSize;

    // Bonus por bigramas comunes
    let bonusBigramas = 0;
    const bigramas1: string[] = [];
    const bigramas2: string[] = [];
    
    for (let i = 0; i < palabras1.length - 1; i++) {
      bigramas1.push(`${palabras1[i]} ${palabras1[i+1]}`);
    }
    
    for (let i = 0; i < palabras2.length - 1; i++) {
      bigramas2.push(`${palabras2[i]} ${palabras2[i+1]}`);
    }
    
    const bigramasComunes = bigramas1.filter(b => bigramas2.includes(b));
    bonusBigramas = bigramasComunes.length * 0.15;

    // Penalizar diferencias numéricas
    const numeros1 = titulo1.match(/\d+/g) || [];
    const numeros2 = titulo2.match(/\d+/g) || [];
    if (numeros1.length > 0 && numeros2.length > 0 && numeros1.join() !== numeros2.join()) {
      similitudJaccard *= 0.7;
    }

    return Math.min(1, similitudJaccard + bonusEntidades + bonusBigramas);
  }, [extraerEntidades]);

  const agruparNoticiasOptimizado = useCallback((noticias: Noticia[]): GrupoNoticias[] => {
    // Primera pasada: agrupación por entidades principales
    const clusters: Noticia[][] = [];
    const asignado = new Array(noticias.length).fill(false);

    noticias.forEach((noticia, i) => {
      if (asignado[i]) return;
      
      const entidades = extraerEntidades(noticia.titulo);
      if (entidades.length === 0) return;
      
      const cluster = [noticia];
      asignado[i] = true;
      
      // Buscar noticias con las mismas entidades
      for (let j = i + 1; j < noticias.length; j++) {
        if (asignado[j]) continue;
        
        const otrasEntidades = extraerEntidades(noticias[j].titulo);
        const entidadesComunes = entidades.filter(e => 
          otrasEntidades.some(oe => oe.toLowerCase() === e.toLowerCase())
        );
        
        if (entidadesComunes.length > 0) {
          const similitud = calcularSimilitudOptimizada(noticia.titulo, noticias[j].titulo);
          if (similitud > 0.6) {
            cluster.push(noticias[j]);
            asignado[j] = true;
          }
        }
      }
      
      if (cluster.length > 1) {
        clusters.push(cluster);
      }
    });

    // Segunda pasada: agrupación por temas generales para noticias no asignadas
    noticias.forEach((noticia, i) => {
      if (asignado[i]) return;
      
      const cluster = [noticia];
      asignado[i] = true;
      
      const palabrasClave = memoizedNormalize(noticia.titulo)
        .split(' ')
        .filter(p => p.length > 4 && !PALABRAS_COMUNES.has(p));
      
      for (let j = i + 1; j < noticias.length; j++) {
        if (asignado[j]) continue;
        
        const similitud = calcularSimilitudOptimizada(noticia.titulo, noticias[j].titulo);
        if (similitud > 0.65) {
          cluster.push(noticias[j]);
          asignado[j] = true;
        }
      }
      
      if (cluster.length > 1) {
        clusters.push(cluster);
      } else {
        // Noticias no agrupables se colocan en un grupo individual
        clusters.push(cluster);
      }
    });

    // Tercera pasada: fusionar clusters similares
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        const titulo1 = clusters[i][0].titulo;
        const titulo2 = clusters[j][0].titulo;
        
        if (calcularSimilitudOptimizada(titulo1, titulo2) > 0.7) {
          clusters[i] = clusters[i].concat(clusters[j]);
          clusters.splice(j, 1);
          j--;
        }
      }
    }

    // Crear los grupos finales
    return clusters
      .filter(cluster => cluster.length > 0)
      .map((noticiasGrupo, index) => {
        // Análisis de palabras clave
        const palabras = noticiasGrupo
          .flatMap(n => memoizedNormalize(n.titulo).split(' '))
          .filter(p => p.length > 3 && !PALABRAS_COMUNES.has(p));
        
        const frecuencias = palabras.reduce((acc, palabra) => {
          acc[palabra] = (acc[palabra] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        // Ordenar palabras clave
        const palabrasClave = Object.entries(frecuencias)
          .sort(([a, freqA], [b, freqB]) => {
            const esNombrePropioA = noticiasGrupo.some(n => 
              n.titulo.split(' ').some(p => 
                p.toLowerCase() === a && p[0] === p[0].toUpperCase()
              )
            );
            const esNombrePropioB = noticiasGrupo.some(n => 
              n.titulo.split(' ').some(p => 
                p.toLowerCase() === b && p[0] === p[0].toUpperCase()
              )
            );
            
            if (esNombrePropioA !== esNombrePropioB) return esNombrePropioA ? -1 : 1;
            if (b.length !== a.length) return b.length - a.length;
            return freqB - freqA;
          })
          .slice(0, 5)
          .map(([palabra]) => palabra);
        
        // Seleccionar título representativo
        const tituloRepresentativo = noticiasGrupo.reduce((prev, current) => {
          const prevScore = palabrasClave.filter(p => 
            memoizedNormalize(prev.titulo).includes(p)
          ).length;
          
          const currentScore = palabrasClave.filter(p => 
            memoizedNormalize(current.titulo).includes(p)
          ).length;
          
          return currentScore > prevScore ? current : prev;
        }).titulo;
        
        // Calcular relevancia
        const fuentesUnicas = new Set(noticiasGrupo.map(n => n.fuente)).size;
        const relevancia = Math.min(
          100, 
          noticiasGrupo.length * 10 + fuentesUnicas * 7
        );
        
        // Seleccionar imagen principal
        const imagenPrincipal = noticiasGrupo
          .sort((a, b) => {
            const esPrincipalB = FUENTES_PRINCIPALES.includes(b.dominio);
            const esPrincipalA = FUENTES_PRINCIPALES.includes(a.dominio);
            
            if (esPrincipalB && !esPrincipalA) return 1;
            if (esPrincipalA && !esPrincipalB) return -1;
            
            return (b.imagen ? 1 : 0) - (a.imagen ? 1 : 0);
          })
          .find(n => n.imagen)?.imagen;
        
        return {
          id: `grupo-${index}-${Date.now()}`,
          tema: tituloRepresentativo.length > 80 
            ? tituloRepresentativo.substring(0, 77) + '...' 
            : tituloRepresentativo,
          noticias: noticiasGrupo.sort((a, b) => {
            const esPrincipalB = FUENTES_PRINCIPALES.includes(b.dominio);
            const esPrincipalA = FUENTES_PRINCIPALES.includes(a.dominio);
            
            if (esPrincipalB && !esPrincipalA) return 1;
            if (esPrincipalA && !esPrincipalB) return -1;
            
            // Si ambas son principales o ninguna, ordenar por relevancia de fuente
            const indiceB = FUENTES_PRINCIPALES.indexOf(b.dominio);
            const indiceA = FUENTES_PRINCIPALES.indexOf(a.dominio);
            
            if (indiceB !== -1 && indiceA !== -1) return indiceB - indiceA;
            if (indiceB !== -1) return 1;
            if (indiceA !== -1) return -1;
            
            return 0;
          }),
          palabrasClave,
          relevancia,
          imagenPrincipal
        };
      })
      .sort((a, b) => b.relevancia - a.relevancia);
  }, [calcularSimilitudOptimizada, extraerEntidades]);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/noticias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: fuentes.map(f => f.url) }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || "error" in data) {
        throw new Error("error" in data ? `${data.error} ${data.suggestion || ""}` : "Error desconocido");
      }

      const noticiasConFecha = (data as Noticia[]).map(noticia => ({
        ...noticia,
        fechaExtraccion: new Date(),
      }));

      setModoDemo(noticiasConFecha.some(n => n.titulo.startsWith("Ejemplo:")));

      const noticiasAgrupadas = agruparNoticiasOptimizado(noticiasConFecha);
      setGrupos(noticiasAgrupadas);
      setUltimaActualizacion(new Date());
      setPaginaSidebar(1);

      if (noticiasAgrupadas.length > 0) {
        setGrupoSeleccionado(noticiasAgrupadas[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar noticias");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, [agruparNoticiasOptimizado]);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 30000000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  const gruposFiltrados = useMemo(() =>
    grupos.filter(grupo =>
      grupo.tema.toLowerCase().includes(busquedaTema.toLowerCase()) ||
      grupo.palabrasClave.some(p => p.toLowerCase().includes(busquedaTema.toLowerCase()))
  ), [grupos, busquedaTema]);

  const totalPaginasSidebar = useMemo(() =>
    Math.ceil(gruposFiltrados.length / TEMAS_POR_PAGINA_SIDEBAR)
  , [gruposFiltrados]);

  const gruposSidebar = useMemo(() =>
    gruposFiltrados.slice(
      (paginaSidebar - 1) * TEMAS_POR_PAGINA_SIDEBAR,
      paginaSidebar * TEMAS_POR_PAGINA_SIDEBAR
    )
  , [gruposFiltrados, paginaSidebar]);

  const grupoActual = useMemo(() =>
    grupos.find(g => g.id === grupoSeleccionado)
  , [grupos, grupoSeleccionado]);

  const getFuenteColor = useCallback((dominio: string) => {
    const colores = {
      "mdzol.com": { backgroundColor: "#e3f2fd", color: "#1565c0" },
      "losandes.com.ar": { backgroundColor: "#e8f5e9", color: "#2e7d32" },
      "infobae.com": { backgroundColor: "#fff3e0", color: "#ef6c00" },
      "eldestapeweb.com": { backgroundColor: "#fce4ec", color: "#ad1457" },
      "lanacion.com.ar": { backgroundColor: "#e0f7fa", color: "#006064" },
      "ambito.com": { backgroundColor: "#ede7f6", color: "#4527a0" },
      "cronista.com": { backgroundColor: "#e0f7fa", color: "#00838f" },
      "clarin.com": { backgroundColor: "#ffebee", color: "#c62828" },
      "pagina12.com.ar": { backgroundColor: "#f3e5f5", color: "#6a1b9a" },
      "elmundo.com": { backgroundColor: "#e8f5e9", color: "#388e3c" },
      "elpais.com": { backgroundColor: "#f1f8e9", color: "#33691e" },
      "abc.com.ar": { backgroundColor: "#e3f2fd", color: "#0d47a1" },
      "tycsports.com": { backgroundColor: "#fbe9e7", color: "#bf360c" },
      "elsol.com.ar": { backgroundColor: "#fff8e1", color: "#ff8f00" },
      "memo.com.ar": { backgroundColor: "#f3e5f5", color: "#8e24aa" },
      "plusnoticias.com": { backgroundColor: "#fce4ec", color: "#c2185b" },
      "argentina.as.com": { backgroundColor: "#ede7f6", color: "#512da8" },
      "rosario3.com": { backgroundColor: "#e1f5fe", color: "#0288d1" },
      "elmercurio.com": { backgroundColor: "#e3f2fd", color: "#1976d2" },
      "cooperativa.cl": { backgroundColor: "#fffde7", color: "#f9a825" },
      "elpais.com/chile": { backgroundColor: "#f1f8e9", color: "#558b2f" },
      "eltiempo.com": { backgroundColor: "#e0f7fa", color: "#00838f" },
      "elcolombiano.com": { backgroundColor: "#fbe9e7", color: "#d84315" },
      "elcomercio.pe": { backgroundColor: "#fff3e0", color: "#ef6c00" },
      "larepublica.pe": { backgroundColor: "#fce4ec", color: "#c2185b" },
      "elpais.com/mexico": { backgroundColor: "#f1f8e9", color: "#33691e" },
      "reforma.com": { backgroundColor: "#e8f5e9", color: "#2e7d32" },
      "elmundo.es": { backgroundColor: "#e3f2fd", color: "#1976d2" },
      "abc.es": { backgroundColor: "#ede7f6", color: "#5e35b1" },
      "larazon.es": { backgroundColor: "#e1f5fe", color: "#0277bd" },
      "marca.com": { backgroundColor: "#fbe9e7", color: "#d84315" },
      "as.com": { backgroundColor: "#ede7f6", color: "#512da8" },
      "lanacion.com.ar/deportes": { backgroundColor: "#ede7f6", color: "#512da8" },
    };
    return colores[dominio as keyof typeof colores] || { backgroundColor: "#f5f5f5", color: "#424242" };
  }, []);

  return {
    // Estado
    grupos,
    grupoSeleccionado,
    loading,
    error,
    paginaSidebar,
    busquedaTema,
    ultimaActualizacion,
    modoDemo,
    gruposFiltrados,
    totalPaginasSidebar,
    gruposSidebar,
    grupoActual,
    fuentes,

    // Acciones
    setGrupoSeleccionado,
    setPaginaSidebar,
    setBusquedaTema,
    fetchNews,

    // Utilidades
    getFuenteColor,
  };
};