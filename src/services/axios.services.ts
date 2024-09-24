import axios, { AxiosResponse } from 'axios';

interface AxiosServiceParams {
    id?: string | undefined;
    token?: string | undefined;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    body?: any;
}

const axiosService = async ({
    id,
    token,
    method,
    url,
    body
}: AxiosServiceParams): Promise<AxiosResponse | null> => {
    try {
        // Construir headers de forma segura
        const headers: { [key: string]: string } = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Configurar el objeto de solicitud
        const config: any = {
            method,
            url: id ? `${url}/${id}` : url,
            headers,
        };

        // Solo añadir body en métodos que lo soporten
        if (method !== 'GET' && body) {
            config.data = body;
        }

        const response = await axios(config);
        console.log('Response:', response);
        return response; // Devuelve la respuesta si es exitosa
    } catch (error: any) {
        // Mejor manejo de errores
        if (error.response) {
            console.error('Error en la respuesta del servidor:', error.response.data);
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
        return null; // Retorna null en caso de error
    }
};

export default axiosService;
