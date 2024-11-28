import { setCookie } from 'nookies';

const login = async () => {
  const response = await fetch('/api/login', { method: 'POST' });
  const data = await response.json();

  if (data.token) {
    setCookie(null, 'auth_token', data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }
};
