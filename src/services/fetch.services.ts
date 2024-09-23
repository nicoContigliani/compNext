
type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: any;
  };
  
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Asegúrate de definir esta variable en tu archivo .env
  
  export async function fetchData<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { method = 'GET', headers = {}, body } = options;
  
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }
  
    return response.json();
  }