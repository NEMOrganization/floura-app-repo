export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  console.log('API REQUEST:', { url: `${BASE_URL}${path}`, method, body, headers });

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} ${errorText}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  const data: T = await response.json();
  return data;
}

export const apiClient = {
  get: <T>(path: string, headers: Record<string, string> = {}) =>
    request<T>(path, { method: 'GET', headers }),
  post: <T>(path: string, body: any, headers: Record<string, string> = {}) =>
    request<T>(path, { method: 'POST', body, headers }),
  put: <T>(path: string, body: any, headers: Record<string, string> = {}) =>
    request<T>(path, { method: 'PUT', body, headers }),
  delete: <T>(path: string, headers: Record<string, string> = {}) =>
    request<T>(path, { method: 'DELETE', headers }),
};

