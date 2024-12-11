import { userApiClient } from "./api";

const SquadService = {
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
      const response = await userApiClient.get<Squad>(`/Squads/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching squad with id ${id}:`, error);
      throw error;
    }
  },

  async addSquad(squadDto: SquadDTO): Promise<Squad> {
    try {
      const response = await userApiClient.post<Squad>("/Squads", squadDto);
      return response.data;
    } catch (error) {
      console.error("Error adding squad:", error);
      throw error;
    }
  },

  async updateSquad(id: number, squadDto: SquadDTO): Promise<void> {
    try {
      await userApiClient.put(`/Squads/${id}`, squadDto);
    } catch (error) {
      console.error(`Error updating squad with id ${id}:`, error);
      throw error;
    }
  },

  async deleteSquad(id: number): Promise<void> {
    try {
      await userApiClient.delete(`/Squads/${id}`);
    } catch (error) {
      console.error(`Error deleting squad with id ${id}:`, error);
      throw error;
    }
  },
};

export default SquadService;
