// export const BASE_URL = 'https://floura-api-asfmcdd6fdfkd4df.westeurope-01.azurewebsites.net/api';
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    const data: T = await response.json();
    return data;
}

export const apiClient = {
    get: <T>(path: string) => request<T>(path, { method: 'GET' }),
    post: <T>(path: string, body: any) => request<T>(path, { method: 'POST', body }),
    put: <T>(path: string, body: any) => request<T>(path, { method: 'PUT', body }),
    delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};