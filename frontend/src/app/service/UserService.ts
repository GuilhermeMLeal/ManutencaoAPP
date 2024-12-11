import { userApiClient } from "./api";

const UnifiedService = {
  // User Services
  async getUsers(): Promise<User[]> {
    try {
      const response = await userApiClient.get<User[]>("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async getUserById(id: number): Promise<User> {
    try {
      const response = await userApiClient.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  async createUser(userDTO: User): Promise<User> {
    try {
      const response = await userApiClient.post<User>("/users", userDTO);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async updateUser(id: number, userDTO: User): Promise<void> {
    try {
      await userApiClient.put(`/users/${id}`, userDTO);
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  },

  async deleteUser(id: number): Promise<void> {
    try {
      await userApiClient.delete(`/users/${id}`);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  },

  // Role Services
  async getRoles(): Promise<Role[]> {
    try {
      const response = await userApiClient.get<Role[]>("/roles");
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },

  async getRoleById(id: number): Promise<Role> {
    try {
      const response = await userApiClient.get<Role>(`/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching role with ID ${id}:`, error);
      throw error;
    }
  },

  async createRole(roleDTO: Role): Promise<Role> {
    try {
      const response = await userApiClient.post<Role>("/roles", roleDTO);
      return response.data;
    } catch (error) {
      console.error("Error creating role:", error);
      throw error;
    }
  },

  async updateRole(id: number, roleDTO: Role): Promise<void> {
    try {
      await userApiClient.put(`/roles/${id}`, roleDTO);
    } catch (error) {
      console.error(`Error updating role with ID ${id}:`, error);
      throw error;
    }
  },

  async deleteRole(id: number): Promise<void> {
    try {
      await userApiClient.delete(`/roles/${id}`);
    } catch (error) {
      console.error(`Error deleting role with ID ${id}:`, error);
      throw error;
    }
  },

  // Squad Services
  async getAllSquads(): Promise<Squad[]> {
    try {
      const response = await userApiClient.get<Squad[]>("/squads");
      return response.data;
    } catch (error) {
      console.error("Error fetching squads:", error);
      throw error;
    }
  },

  async getSquadById(id: number): Promise<Squad> {
    try {
      const response = await userApiClient.get<Squad>(`/squads/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching squad with ID ${id}:`, error);
      throw error;
    }
  },

  async createSquad(squadDTO: Squad): Promise<Squad> {
    try {
      const response = await userApiClient.post<Squad>("/squads", squadDTO);
      return response.data;
    } catch (error) {
      console.error("Error creating squad:", error);
      throw error;
    }
  },

  async updateSquad(id: number, squadDTO: Squad): Promise<void> {
    try {
      await userApiClient.put(`/squads/${id}`, squadDTO);
    } catch (error) {
      console.error(`Error updating squad with ID ${id}:`, error);
      throw error;
    }
  },

  async deleteSquad(id: number): Promise<void> {
    try {
      await userApiClient.delete(`/squads/${id}`);
    } catch (error) {
      console.error(`Error deleting squad with ID ${id}:`, error);
      throw error;
    }
  },

  // Auth Services
  async login(userLoginDTO: { username: string; password: string }): Promise<string> {
    try {
      const response = await userApiClient.post<string>("/Auth", userLoginDTO);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  async refreshToken(): Promise<string> {
    try {
      const response = await userApiClient.post<string>("/Auth/refresh-token");
      return response.data;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  },

  async validateToken(): Promise<boolean> {
    try {
      const response = await userApiClient.get<string>("/Auth/validate-token");
      return response.status === 200;
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  },
};

export default UnifiedService;
