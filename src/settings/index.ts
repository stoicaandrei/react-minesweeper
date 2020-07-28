let BASE_URL = '';
let API_URL = '';
let SOCKET_URL = '';

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '';
}

API_URL = `http://${BASE_URL}/api`;
SOCKET_URL = `ws://${BASE_URL}/api`;

export { BASE_URL, API_URL, SOCKET_URL };
