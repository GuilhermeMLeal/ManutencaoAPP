import { maintenanceApiClient } from "./api";

const MaintenanceService = {
  async getAllMaintenances(): Promise<Maintenance[]> {
    try {
      const response = await maintenanceApiClient.get<Maintenance[]>("/Maintenance");
      return response.data;
    } catch (error) {
      console.error("Error fetching maintenances:", error);
      throw error;
    }
  },

  async getMaintenanceById(id: number): Promise<Maintenance> {
    try {
      const response = await maintenanceApiClient.get<Maintenance>(`/Maintenance/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching maintenance with id ${id}:`, error);
      throw error;
    }
  },

  async createMaintenance(maintenanceDto: MaintenanceCreateDTO): Promise<Maintenance> {
    try {
      const response = await maintenanceApiClient.post<Maintenance>("/Maintenance", maintenanceDto);
      return response.data;
    } catch (error) {
      console.error("Error creating maintenance:", error);
      throw error;
    }
  },

  async updateMaintenance(maintenanceDto: Maintenance): Promise<void> {
    try {
      await maintenanceApiClient.put('/Maintenance', maintenanceDto);
    } catch (error) {
      console.error(`Error updating maintenance with id ${maintenanceDto.id}:`, error);
      throw error;
    }
  },
};

export default MaintenanceService;
