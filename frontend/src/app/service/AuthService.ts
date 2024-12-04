import { userApiClient } from "./API";

const AuthService = {
    async login(userLoginDTO: UserLoginDTO): Promise<string> {
      try {
        const response = await userApiClient.post<string>('/auth', userLoginDTO);
        return response.data;
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
  
    async refreshToken(): Promise<string> {
      try {
        const response = await userApiClient.post<string>('/auth/refresh-token');
        return response.data;
      } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
      }
    },
  
    async validateToken(): Promise<boolean> {
      try {
        const response = await userApiClient.get<string>('/auth/validate-token');
        return response.status === 200;
      } catch (error) {
        console.error('Error validating token:', error);
        return false;
      }
    },
  };
  
  export default AuthService;
  