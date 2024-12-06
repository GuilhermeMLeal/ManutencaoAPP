import Cookies from 'js-cookie';

// Armazena tokens nos cookies
export const storeTokens = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  try {
    Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'strict', path: '/' });
    Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'strict', path: '/' });
  } catch (error) {
    console.error('Erro ao armazenar os tokens', error);
  }
};

export const storeAccessToken = (accessToken: string) => {
  try {
    Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'strict', path: '/' });
  } catch (error) {
    console.error('Erro ao armazenar o token de acesso', error);
  }
};

// Obtém tokens dos cookies
export const getTokens = () => {
  try {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Erro ao obter os tokens', error);
    return null;
  }
};

export const getAccessToken = () => {
  try {
    return Cookies.get('accessToken') || null;
  } catch (error) {
    console.error('Erro ao obter o token de acesso', error);
    return null;
  }
};

// Remove tokens dos cookies
export const clearTokens = () => {
  try {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
  } catch (error) {
    console.error('Erro ao remover os tokens', error);
  }
};
