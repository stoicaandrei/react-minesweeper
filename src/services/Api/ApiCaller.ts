import queryString from 'query-string';

import { API_URL } from 'appConstants';

type apiParams<Payload> = {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: Payload;
  auth?: boolean;
};

export type ApiCaller = <T>(params: apiParams<T>) => Promise<any>;

export function apiCaller(endpoint: string): ApiCaller {
  const baseUrl = `${API_URL}/${endpoint}`;

  return async function <Payload>({
    path,
    method = 'GET',
    data,
    auth = true,
  }: apiParams<Payload>): Promise<any> {
    const query = '?' + queryString.stringify((data as any) || {});

    let url = `${baseUrl}${path}${method === 'GET' ? query : ''}`;

    const urlParams = path.split('/').filter(s => s[0] === ':');

    urlParams.forEach(
      param => (url = url.replace(param, (data as any)[param.slice(1)]))
    );

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (auth) {
      headers.append('Authorization', `JWT ${'token'}`);
    }

    const response = await fetch(url, {
      headers,
      method,
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    });

    return response.json();
  };
}
