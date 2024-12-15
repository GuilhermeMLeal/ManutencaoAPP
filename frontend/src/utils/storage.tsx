// Armazena tokens no localStorage
export const storeTokens = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  try {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.error('Erro ao armazenar os tokens', error);
  }
};

export const storeAccessToken = (accessToken: string) => {
  try {
    localStorage.setItem("accessToken", accessToken);
  } catch (error) {
    console.error("Erro ao armazenar o token de acesso", error);
  }
};

// Obtém tokens do localStorage
export const getTokens = () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Erro ao obter os tokens', error);
    return null;
  }
};

export const getAccessToken = () => {
  try {
    return localStorage.getItem('accessToken') || null;
  } catch (error) {
    console.error('Erro ao obter o token de acesso', error);
    return null;
  }
};

// Remove tokens do localStorage
export const clearTokens = () => {
  try {
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Erro ao remover o token de acesso", error);
  }
};