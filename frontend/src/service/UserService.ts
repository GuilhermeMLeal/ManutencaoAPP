import { loginApiClient, userApiClient } from "./api";

const UnifiedService = {
  // User Services
  async getUsers(): Promise<User[]> {
    try {
      const response = await userApiClient.get<User[]>("/User");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async getUserById(id: number): Promise<User> {
    try {
      const response = await userApiClient.get<User>(`/User/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  async createUser(userDTO: User): Promise<User> {
    try {
      const response = await loginApiClient.post<User>("/User", userDTO);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async updateUser(id: number, userDTO: User): Promise<void> {
    try {
      await userApiClient.put(`/User/${id}`, userDTO);
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  },

  async deleteUser(id: number): Promise<void> {
    try {
      await userApiClient.delete(`/User/${id}`);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  },

  // Role Services
  async getRoles(): Promise<Role[]> {
    try {
      const response = await userApiClient.get<Role[]>("/Role");
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },

  async getRoleById(id: number): Promise<Role> {
    try {
      const response = await userApiClient.get<Role>(`/Role/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching role with ID ${id}:`, error);
      throw error;
    }
  },

  async createRole(roleDTO: Role): Promise<Role> {
    try {
      const response = await userApiClient.post<Role>("/Role", roleDTO);
      return response.data;
    } catch (error) {
      console.error("Error creating role:", error);
      throw error;
    }
  },

  async updateRole(id: number, roleDTO: Role): Promise<void> {
    try {
      await userApiClient.put(`/Role/${id}`, roleDTO);
    } catch (error) {
      console.error(`Error updating role with ID ${id}:`, error);
      throw error;
    }
  },

  async deleteRole(id: number): Promise<void> {
    try {
      await userApiClient.delete(`/Role/${id}`);
    } catch (error) {
      console.error(`Error deleting role with ID ${id}:`, error);
      throw error;
    }
  },

  // Squad Services
  async getAllSquads(): Promise<Squad[]> {
    try {
      const response = await userApiClient.get<Squad[]>("/Squad");
      return response.data;
    } catch (error) {
      console.error("Error fetching squads:", error);
      throw error;
    }
  },

  async getSquadById(id: number): Promise<Squad> {
    try {
      const response = await userApiClient.get<Squad>(`/Squad/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching squad with ID ${id}:`, error);
      throw error;
    }
  },

  async createSquad(squadDTO: Squad): Promise<Squad> {
    try {
      const response = await userApiClient.post<Squad>("/Squad", squadDTO);
      return response.data;
    } catch (error) {
      console.error("Error creating squad:", error);
      throw error;
    }
  },

  async updateSquad(id: number, squadDTO: Squad): Promise<void> {
    try {
      await userApiClient.put(`/Squad/${id}`, squadDTO);
    } catch (error) {
      console.error(`Error updating squad with ID ${id}:`, error);
      throw error;
    }
  },

  async deleteSquad(id: number): Promise<void> {
    try {
      await userApiClient.delete(`/Squad/${id}`);
    } catch (error) {
      console.error(`Error deleting squad with ID ${id}:`, error);
      throw error;
    }
  },

  async login(userLoginDTO: { username: string; password: string }): Promise<string> {
    try {
      const response = await loginApiClient.post("/Auth", userLoginDTO);
      const token = response.data;
  
      if (!token) {
        throw new Error("Token não encontrado na resposta do servidor.");
      }
      localStorage.setItem("token", token);
  
      return token;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Falha no login. Verifique suas credenciais.");
    }
  },

  async renewToken(): Promise<void> {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available.");
    }

    try {
      const response = await loginApiClient.post<{ token: string; refreshToken: string }>(
        "/Auth/refresh-token",
        { refreshToken }
      );
      const { token, refreshToken: newRefreshToken } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", newRefreshToken);
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw new Error("Failed to renew token.");
    }
  },

  async validateToken(): Promise<boolean> {
    try {
      const response = await loginApiClient.get("/Auth/validate-token");
      return response.status === 200;
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  },
};

export default UnifiedService;
