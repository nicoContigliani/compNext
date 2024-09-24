interface WeatherParams {
    q?: string; // Ciudad opcional
    lat?: number; // Latitud opcional
    lon?: number; // Longitud opcional
    id?: string; // ID opcional
    units?: string; // Unidades (métrico, imperial, etc.)
    lang?: string; // Idioma de la respuesta
    appid: string; // API key, requerido
    mode?: string; // Modo de respuesta (JSON por defecto)
    exclude?: string; // Excluir partes (minuto, diario, etc.)
    cnt?: number; // Cantidad de resultados
    dt?: number; // Tiempo Unix opcional
    hourly?: boolean; // Hora opcional
    daily?: boolean; // Diario opcional
    timezone?: string; // Zona horaria opcional
    timezone_offset?: number; // Offset de zona horaria
}


export const weather = async ({
    q,
    lat,
    lon,
    id,
    units = 'metric', // Valor por defecto
    lang = 'en', // Valor por defecto
    appid,
    mode = 'json', // Valor por defecto
    exclude,
    cnt,
    dt,
    hourly,
    daily,
    timezone,
    timezone_offset
}: WeatherParams) => {
    try {
        const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

        // Construir URL con parámetros dinámicos
        const url = `${baseUrl}?${lat ? `lat=${lat}&lon=${lon}&appid=${appid}` : `q=${q}`}&appid=${appid}&units=${units}&lang=${lang}&mode=${mode}`;
        return url; // Devuelve los datos obtenidos
    } catch (error: any) {
        console.error('Error al obtener el clima:', error.message);
        throw error; // Propagar el error
    }
};