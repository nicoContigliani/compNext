// import { useState, useEffect, useCallback } from "react";

// type Noticia = {
//   titulo: string;
//   link: string;
//   fuente: string;
//   dominio: string;
//   fechaExtraccion?: Date;
// };

// type GrupoNoticias = {
//   id: string;
//   tema: string;
//   noticias: Noticia[];
//   palabrasClave: string[];
//   relevancia: number;
// };

// type ApiResponse = Noticia[] | { error: string; suggestion?: string; htmlSample?: string };

// const fuentes = [
//   { url: "https://www.mdzol.com", nombre: "MDZ Online" },
//   { url: "https://www.losandes.com.ar", nombre: "Los Andes" },
//   { url: "https://www.infobae.com", nombre: "Infobae" },
//   { url: "https://www.eldestapeweb.com/", nombre: "El Destape" },
//   { url: "https://www.lanacion.com.ar/", nombre: "La Nacion" },
//   { url: "https://www.ambito.com", nombre: "Ambito" },
//   { url: "https://www.clarin.com", nombre: "Clarin" },
//   { url: "https://www.pagina12.com.ar", nombre: "Pagina 12" },
//   { url: "https://www.elmundo.com", nombre: "El Mundo" },
//   { url: "https://www.elpais.com", nombre: "El Pais" },
//   { url: "https://www.abc.com.ar", nombre: "ABC" },
//   { url: "https://www.tycsports.com/", nombre: "TycSports" },
//   // Diarios de Mendoza
//   { url: "https://www.elsol.com.ar/", nombre: "Diario El Sol (Mendoza)" },
//   { url: "https://www.memo.com.ar/", nombre: "Memo (Mendoza)" },
//   { url: "https://www.plusnoticias.com/", nombre: "Plus Noticias (Mendoza)" },
//   // Diarios de Deportes (Argentina)
//   { url: "https://argentina.as.com/", nombre: "AS Argentina (Deportes)" },
//   { url: "https://www.rosario3.com/seccion/deportes/", nombre: "Rosario3 Deportes" },
//   // Diarios de Chile
//   { url: "https://www.elmercurio.com/", nombre: "El Mercurio (Chile)" },
//   { url: "https://cooperativa.cl/", nombre: "Cooperativa (Chile)" },
//   { url: "https://elpais.com/chile/", nombre: "El País Chile" },
//   // Diarios de Colombia
//   { url: "https://www.eltiempo.com/", nombre: "El Tiempo (Colombia)" },
//   { url: "https://www.elcolombiano.com/", nombre: "El Colombiano (Colombia)" },
//   // Diarios de Perú
//   { url: "https://elcomercio.pe/", nombre: "El Comercio (Perú)" },
//   { url: "https://larepublica.pe/", nombre: "La República (Perú)" },
//   // Diarios de México
//   { url: "https://elpais.com/mexico/", nombre: "El País México" },
//   { url: "https://www.reforma.com/", nombre: "Reforma (México)" },
//   // Diarios de España (repeated, but kept for completeness based on your prompt)
//   { url: "https://elpais.com/", nombre: "El País (España)" },
//   { url: "https://www.elmundo.es/", nombre: "El Mundo (España)" },
//   { url: "https://www.abc.es/", nombre: "ABC (España)" },
//   { url: "https://www.larazon.es/", nombre: "La Razón (España)" },
//   { url: "https://www.marca.com/", nombre: "Marca (España - Deportes)" },
//   { url: "https://www.as.com/", nombre: "AS (España - Deportes)" },
// ];

// const TEMAS_POR_PAGINA_SIDEBAR = 10;

// export const useNewsAggregator = () => {
//   const [grupos, setGrupos] = useState<GrupoNoticias[]>([]);
//   const [grupoSeleccionado, setGrupoSeleccionado] = useState<any | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [paginaSidebar, setPaginaSidebar] = useState<number>(1);
//   const [busquedaTema, setBusquedaTema] = useState<string>("");
//   const [ultimaActualizacion, setUltimaActualizacion] = useState<Date>(new Date());
//   const [modoDemo, setModoDemo] = useState<boolean>(false);

//   const calcularSimilitudMejorada = useCallback((titulo1: string, titulo2: string): number => {
//     const normalizar = (texto: string) => {
//       return texto
//         .toLowerCase()
//         .replace(/[^\w\s]/g, " ")
//         .replace(/\s+/g, " ")
//         .trim();
//     };

//     const t1 = normalizar(titulo1);
//     const t2 = normalizar(titulo2);

//     const palabrasComunes = new Set([
//       "que",
//       "con",
//       "por",
//       "para",
//       "una",
//       "del",
//       "las",
//       "los",
//       "este",
//       "esta",
//       "desde",
//       "hasta",
//       "sobre",
//       "tras",
//       "ante",
//       "bajo",
//       "entre",
//       "hacia",
//       "según",
//       "ejemplo",
//       "nueva",
//       "nuevo",
//       "últimas",
//       "último",
//     ]);

//     const palabras1: any = t1.split(" ").filter((p) => p.length > 3 && !palabrasComunes.has(p));
//     const palabras2: any = t2.split(" ").filter((p) => p.length > 3 && !palabrasComunes.has(p));

//     if (palabras1.length === 0 || palabras2.length === 0) return 0;

//     const interseccion = palabras1.filter((p: any) => palabras2.includes(p));
//     const union = [...new Set([...palabras1, ...palabras2])];

//     const similitudJaccard = interseccion.length / union.length;

//     let bonusConsecutivo = 0;
//     for (let i = 0; i < palabras1.length - 1; i++) {
//       const bigrama = `${palabras1[i]} ${palabras1[i + 1]}`;
//       if (t2.includes(bigrama)) {
//         bonusConsecutivo += 0.1;
//       }
//     }

//     return Math.min(1, similitudJaccard + bonusConsecutivo);
//   }, []);

//   const agruparNoticiasInteligente = useCallback(
//     (noticias: Noticia[]): GrupoNoticias[] => {
//       const grupos: GrupoNoticias[] = [];
//       const procesadas = new Set<number>();

//       const noticiasOrdenadas = noticias
//         .map((noticia, index) => ({ noticia, index }))
//         .sort((a, b) => b.noticia.titulo.length - a.noticia.titulo.length);

//       noticiasOrdenadas.forEach(({ noticia, index }) => {
//         if (procesadas.has(index)) return;

//         const grupoActual: Noticia[] = [noticia];
//         procesadas.add(index);

//         noticiasOrdenadas.forEach(({ noticia: otraNoticia, index: otroIndex }) => {
//           if (otroIndex !== index && !procesadas.has(otroIndex)) {
//             const similitud = calcularSimilitudMejorada(noticia.titulo, otraNoticia.titulo);
//             if (similitud > 0.35) {
//               grupoActual.push(otraNoticia);
//               procesadas.add(otroIndex);
//             }
//           }
//         });

//         const todasLasPalabras = grupoActual
//           .flatMap((n) => n.titulo.toLowerCase().split(" "))
//           .filter((p) => p.length > 4)
//           .filter((p) => !["desde", "hasta", "sobre", "entre", "según", "durante", "ejemplo"].includes(p));

//         const frecuencias = todasLasPalabras.reduce(
//           (acc, palabra) => {
//             acc[palabra] = (acc[palabra] || 0) + 1;
//             return acc;
//           },
//           {} as Record<string, number>
//         );

//         const palabrasClave = Object.entries(frecuencias)
//           .filter(([_, freq]) => freq >= Math.max(1, Math.floor(grupoActual.length / 2)))
//           .sort(([_, a], [__, b]) => b - a)
//           .slice(0, 4)
//           .map(([palabra]) => palabra);

//         const tituloMasLargo = grupoActual.reduce((prev, current) =>
//           current.titulo.length > prev.titulo.length ? current : prev
//         );

//         let tema = tituloMasLargo.titulo;
//         if (tema.length > 80) {
//           tema = tema.substring(0, 80) + "...";
//         }

//         const fuentesUnicas = new Set(grupoActual.map((n) => n.fuente)).size;
//         const relevancia = grupoActual.length * 10 + fuentesUnicas * 5;

//         grupos.push({
//           id: `grupo-${grupos.length}`,
//           tema,
//           noticias: grupoActual.sort((a, b) => b.titulo.length - a.titulo.length),
//           palabrasClave,
//           relevancia,
//         });
//       });

//       return grupos.filter((grupo) => grupo.noticias.length > 0).sort((a, b) => b.relevancia - a.relevancia);
//     },
//     [calcularSimilitudMejorada]
//   );

//   const fetchNews = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch("/api/noticias", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ urls: fuentes.map((f) => f.url) }),
//       });

//       const data: ApiResponse = await response.json();

//       if (!response.ok || "error" in data) {
//         throw new Error("error" in data ? `${data.error} ${data.suggestion || ""}` : "Error desconocido");
//       }

//       const noticiasConFecha = (data as Noticia[]).map((noticia) => ({
//         ...noticia,
//         fechaExtraccion: new Date(),
//       }));

//       const esDemo = noticiasConFecha.some((n) => n.titulo.startsWith("Ejemplo:"));
//       setModoDemo(esDemo);

//       const noticiasAgrupadas = agruparNoticiasInteligente(noticiasConFecha);
//       setGrupos(noticiasAgrupadas);
//       setUltimaActualizacion(new Date());
//       setPaginaSidebar(1);

//       if (noticiasAgrupadas.length > 0) {
//         setGrupoSeleccionado(noticiasAgrupadas[0].id);
//       }
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Error al cargar noticias";
//       setError(errorMessage);
//       console.error("Error fetching news:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [agruparNoticiasInteligente]);

//   useEffect(() => {
//     fetchNews();
//     const interval = setInterval(fetchNews, 300000);
//     return () => clearInterval(interval);
//   }, [fetchNews]);

//   const gruposFiltrados = grupos.filter(
//     (grupo) =>
//       grupo.tema.toLowerCase().includes(busquedaTema.toLowerCase()) ||
//       grupo.palabrasClave.some((palabra) => palabra.toLowerCase().includes(busquedaTema.toLowerCase()))
//   );

//   const totalPaginasSidebar = Math.ceil(gruposFiltrados.length / TEMAS_POR_PAGINA_SIDEBAR);
//   const gruposSidebar = gruposFiltrados.slice(
//     (paginaSidebar - 1) * TEMAS_POR_PAGINA_SIDEBAR,
//     paginaSidebar * TEMAS_POR_PAGINA_SIDEBAR
//   );

//   const grupoActual = grupos.find((g) => g.id === grupoSeleccionado);

//   const getFuenteColor = (dominio: string) => {
//     const colores = {
//       "mdzol.com": { backgroundColor: "#e3f2fd", color: "#1565c0" },
//       "losandes.com.ar": { backgroundColor: "#e8f5e9", color: "#2e7d32" },
//       "infobae.com": { backgroundColor: "#fff3e0", color: "#ef6c00" },
//       "eldestapeweb.com": { backgroundColor: "#fce4ec", color: "#ad1457" },
//       "lanacion.com.ar": { backgroundColor: "#e0f7fa", color: "#006064" },
//       "ambito.com": { backgroundColor: "#ede7f6", color: "#4527a0" },
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
//     };

//     return colores[dominio as keyof typeof colores] || { backgroundColor: "#f5f5f5", color: "#424242" };
//   };

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




import { useState, useEffect, useCallback } from "react";

type Noticia = {
  titulo: string;
  link: string;
  fuente: string;
  dominio: string;
  fechaExtraccion?: Date;
};

type GrupoNoticias = {
  id: string;
  tema: string;
  noticias: Noticia[];
  palabrasClave: string[];
  relevancia: number;
};

type ApiResponse = Noticia[] | { error: string; suggestion?: string; htmlSample?: string };

const fuentes = [
  { url: "https://www.mdzol.com", nombre: "MDZ Online" },
  { url: "https://www.losandes.com.ar", nombre: "Los Andes" },
  { url: "https://www.infobae.com", nombre: "Infobae" },
  { url: "https://www.eldestapeweb.com/", nombre: "El Destape" },
  { url: "https://www.lanacion.com.ar/", nombre: "La Nacion" },
  { url: "https://www.ambito.com", nombre: "Ambito" },
  { url: "https://www.cronista.com/", nombre: "El Cronista" },
  // { url: "https://www.clarin.com", nombre: "Clarin" },
  // { url: "https://www.pagina12.com.ar", nombre: "Pagina 12" },
  { url: "https://www.elmundo.com", nombre: "El Mundo" },
  { url: "https://www.elpais.com", nombre: "El Pais" },
  { url: "https://www.abc.com.ar", nombre: "ABC" },
  { url: "https://www.tycsports.com/", nombre: "TycSports" },
  // Diarios de Mendoza
  { url: "https://www.elsol.com.ar/", nombre: "Diario El Sol (Mendoza)" },
  { url: "https://www.memo.com.ar/", nombre: "Memo (Mendoza)" },
  { url: "https://www.plusnoticias.com/", nombre: "Plus Noticias (Mendoza)" },
  // Diarios de Deportes (Argentina)
  { url: "https://argentina.as.com/", nombre: "AS Argentina (Deportes)" },
  { url: "https://www.rosario3.com/seccion/deportes/", nombre: "Rosario3 Deportes" },
  // Diarios de Chile
  { url: "https://cooperativa.cl/", nombre: "Cooperativa (Chile)" },
  { url: "https://elpais.com/chile/", nombre: "El País Chile" },
  // Diarios de Colombia
  { url: "https://www.eltiempo.com/", nombre: "El Tiempo (Colombia)" },
  { url: "https://www.elcolombiano.com/", nombre: "El Colombiano (Colombia)" },
  // Diarios de Perú
  { url: "https://larepublica.pe/", nombre: "La República (Perú)" },
  // Diarios de México
  { url: "https://elpais.com/mexico/", nombre: "El País México" },
  { url: "https://www.reforma.com/", nombre: "Reforma (México)" },
  // Diarios de España (repeated, but kept for completeness based on your prompt)
  { url: "https://elpais.com/", nombre: "El País (España)" },
  { url: "https://www.as.com", nombre: "AS (España - Deportes)" },
];

const TEMAS_POR_PAGINA_SIDEBAR = 10;

export const useNewsAggregator = () => {
  const [grupos, setGrupos] = useState<GrupoNoticias[]>([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaSidebar, setPaginaSidebar] = useState<number>(1);
  const [busquedaTema, setBusquedaTema] = useState<string>("");
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date>(new Date());
  const [modoDemo, setModoDemo] = useState<boolean>(false);

  const calcularSimilitudMejorada = useCallback((titulo1: string, titulo2: string): number => {
    const normalizar = (texto: string) => {
      return texto
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Elimina acentos
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    };

    const t1 = normalizar(titulo1);
    const t2 = normalizar(titulo2);

    // Si un título está completamente incluido en el otro, alta similitud
    if (t1.includes(t2) || t2.includes(t1)) {
      return 0.8;
    }

    const palabrasComunes = new Set([
      "que", "con", "por", "para", "una", "del", "las", "los", "este", "esta", 
      "desde", "hasta", "sobre", "tras", "ante", "bajo", "entre", "hacia", "según", 
      "ejemplo", "nueva", "nuevo", "últimas", "último", "más", "cómo", "qué"
    ]);

    const palabras1 = t1.split(" ").filter(p => p.length > 3 && !palabrasComunes.has(p));
    const palabras2 = t2.split(" ").filter(p => p.length > 3 && !palabrasComunes.has(p));

    if (palabras1.length === 0 || palabras2.length === 0) return 0;

    // Bonus por nombres propios o palabras clave importantes
    const nombresPropios = new Set([...palabras1, ...palabras2].filter(p => p[0] === p[0].toUpperCase()));
    
    const interseccion = palabras1.filter(p => palabras2.includes(p));
    const union = [...new Set([...palabras1, ...palabras2])];

    let similitudJaccard = interseccion.length / union.length;

    // Bonus por nombres propios en común
    if (nombresPropios.size > 0) {
      const nombresComunes = palabras1.filter(p => nombresPropios.has(p) && palabras2.includes(p));
      similitudJaccard += nombresComunes.length * 0.2;
    }

    // Bonus por secuencias de palabras en común
    let bonusConsecutivo = 0;
    for (let i = 0; i < palabras1.length - 1; i++) {
      const bigrama = `${palabras1[i]} ${palabras1[i + 1]}`;
      if (t2.includes(bigrama)) {
        bonusConsecutivo += 0.15;
      }
    }

    // Bonus si comparten una palabra clave importante (larga o en mayúsculas)
    const palabrasClave1 = palabras1.filter(p => p.length > 6 || p[0] === p[0].toUpperCase());
    const palabrasClave2 = palabras2.filter(p => p.length > 6 || p[0] === p[0].toUpperCase());
    const clavesComunes = palabrasClave1.filter(p => palabrasClave2.includes(p));
    similitudJaccard += clavesComunes.length * 0.1;

    return Math.min(1, similitudJaccard + bonusConsecutivo);
  }, []);

  const agruparNoticiasInteligente = useCallback(
    (noticias: Noticia[]): GrupoNoticias[] => {
      const grupos: GrupoNoticias[] = [];
      const procesadas = new Set<number>();

      // Primero agrupamos por nombres propios o palabras clave muy específicas
      const nombresPropios = new Map<string, number[]>();
      
      noticias.forEach((noticia, index) => {
        const palabras = noticia.titulo.split(" ")
          .filter(p => p.length > 4 && p[0] === p[0].toUpperCase())
          .map(p => p.toLowerCase().replace(/[^\w]/g, ''));
        
        palabras.forEach(palabra => {
          if (!nombresPropios.has(palabra)) {
            nombresPropios.set(palabra, []);
          }
          nombresPropios.get(palabra)?.push(index);
        });
      });

      // Agrupamos noticias que comparten nombres propios relevantes
      Array.from(nombresPropios.entries())
        .filter(([_, indices]) => indices.length > 1)
        .forEach(([palabra, indices]) => {
          const indicesNoProcesados = indices.filter(i => !procesadas.has(i));
          
          if (indicesNoProcesados.length > 1) {
            const grupoActual: Noticia[] = indicesNoProcesados.map(i => noticias[i]);
            
            // Buscamos noticias similares para añadir al grupo
            indicesNoProcesados.forEach(i => {
              if (!procesadas.has(i)) {
                for (let j = 0; j < noticias.length; j++) {
                  if (i !== j && !procesadas.has(j)) {
                    const similitud = calcularSimilitudMejorada(
                      noticias[i].titulo, 
                      noticias[j].titulo
                    );
                    if (similitud > 0.4) {
                      grupoActual.push(noticias[j]);
                      procesadas.add(j);
                    }
                  }
                }
                procesadas.add(i);
              }
            });

            if (grupoActual.length > 0) {
              agregarGrupo(grupoActual);
            }
          }
        });

      // Procesamos las noticias restantes que no fueron agrupadas por nombres propios
      noticias.forEach((noticia, index) => {
        if (procesadas.has(index)) return;

        const grupoActual: Noticia[] = [noticia];
        procesadas.add(index);

        // Buscamos noticias similares
        noticias.forEach((otraNoticia, otroIndex) => {
          if (otroIndex !== index && !procesadas.has(otroIndex)) {
            const similitud = calcularSimilitudMejorada(noticia.titulo, otraNoticia.titulo);
            if (similitud > 0.45) {
              grupoActual.push(otraNoticia);
              procesadas.add(otroIndex);
            }
          }
        });

        if (grupoActual.length > 0) {
          agregarGrupo(grupoActual);
        }
      });

      function agregarGrupo(noticiasGrupo: Noticia[]) {
        // Extraemos palabras clave más relevantes
        const todasLasPalabras = noticiasGrupo
          .flatMap(n => n.titulo.toLowerCase().split(" "))
          .filter(p => p.length > 4)
          .filter(p => !["desde", "hasta", "sobre", "entre", "según", "durante", "ejemplo"].includes(p));

        const frecuencias = todasLasPalabras.reduce((acc, palabra) => {
          acc[palabra] = (acc[palabra] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Priorizamos nombres propios y palabras largas como palabras clave
        const palabrasClave = Object.entries(frecuencias)
          .sort(([a, freqA], [b, freqB]) => {
            // Priorizar nombres propios (inician con mayúscula en el título original)
            const esNombrePropioA = noticiasGrupo.some(n => 
              n.titulo.split(" ").some(p => p.toLowerCase() === a && p[0] === p[0].toUpperCase())
            );
            const esNombrePropioB = noticiasGrupo.some(n => 
              n.titulo.split(" ").some(p => p.toLowerCase() === b && p[0] === p[0].toUpperCase())
            );
            
            if (esNombrePropioA && !esNombrePropioB) return -1;
            if (!esNombrePropioA && esNombrePropioB) return 1;
            
            // Luego priorizar palabras más largas
            if (a.length !== b.length) return b.length - a.length;
            
            // Finalmente por frecuencia
            return freqB - freqA;
          })
          .slice(0, 5)
          .map(([palabra]) => palabra);

        // Seleccionamos el título más representativo (el más largo que incluya las palabras clave)
        const tituloRepresentativo = noticiasGrupo.reduce((prev, current) => {
          const prevScore = palabrasClave.filter(p => prev.titulo.toLowerCase().includes(p)).length;
          const currentScore = palabrasClave.filter(p => current.titulo.toLowerCase().includes(p)).length;
          
          if (currentScore > prevScore) return current;
          if (currentScore === prevScore && current.titulo.length > prev.titulo.length) return current;
          return prev;
        }).titulo;

        let tema = tituloRepresentativo;
        if (tema.length > 80) {
          tema = tema.substring(0, 80) + "...";
        }

        const fuentesUnicas = new Set(noticiasGrupo.map(n => n.fuente)).size;
        const relevancia = noticiasGrupo.length * 10 + fuentesUnicas * 5;

        grupos.push({
          id: `grupo-${grupos.length}`,
          tema,
          noticias: noticiasGrupo.sort((a, b) => b.titulo.length - a.titulo.length),
          palabrasClave,
          relevancia,
        });
      }

      return grupos
        .filter(grupo => grupo.noticias.length > 0)
        .sort((a, b) => b.relevancia - a.relevancia);
    },
    [calcularSimilitudMejorada]
  );

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/noticias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      const esDemo = noticiasConFecha.some(n => n.titulo.startsWith("Ejemplo:"));
      setModoDemo(esDemo);

      const noticiasAgrupadas = agruparNoticiasInteligente(noticiasConFecha);
      setGrupos(noticiasAgrupadas);
      setUltimaActualizacion(new Date());
      setPaginaSidebar(1);

      if (noticiasAgrupadas.length > 0) {
        setGrupoSeleccionado(noticiasAgrupadas[0].id);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar noticias";
      setError(errorMessage);
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, [agruparNoticiasInteligente]);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  const gruposFiltrados = grupos.filter(
    grupo =>
      grupo.tema.toLowerCase().includes(busquedaTema.toLowerCase()) ||
      grupo.palabrasClave.some(palabra => palabra.toLowerCase().includes(busquedaTema.toLowerCase()))
  );

  const totalPaginasSidebar = Math.ceil(gruposFiltrados.length / TEMAS_POR_PAGINA_SIDEBAR);
  const gruposSidebar = gruposFiltrados.slice(
    (paginaSidebar - 1) * TEMAS_POR_PAGINA_SIDEBAR,
    paginaSidebar * TEMAS_POR_PAGINA_SIDEBAR
  );

  const grupoActual = grupos.find(g => g.id === grupoSeleccionado);

  const getFuenteColor = (dominio: string) => {
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
    };

    return colores[dominio as keyof typeof colores] || { backgroundColor: "#f5f5f5", color: "#424242" };
  };

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