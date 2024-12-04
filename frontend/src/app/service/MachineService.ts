import { machineApiClient } from "./API";

const MachineService = {
  async getAllMachines(): Promise<Machine[]> {
    try {
      const response = await machineApiClient.get<Machine[]>("/machines");
      return response.data;
    } catch (error) {
      console.error("Error fetching machines:", error);
      throw error;
    }
  },

  async getMachineById(id: number): Promise<Machine> {
    try {
      const response = await machineApiClient.get<Machine>(`/machines/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching machine with id ${id}:`, error);
      throw error;
    }
  },

  async addMachine(machineCreateDto: MachineCreateDto): Promise<Machine> {
    try {
      const response = await machineApiClient.post<Machine>(
        "/machines",
        machineCreateDto
      );
      return response.data;
    } catch (error) {
      console.error("Error adding machine:", error);
      throw error;
    }
  },

  async updateMachine(machineUpdateDto: MachineUpdateDto): Promise<Machine> {
    try {
      const response = await machineApiClient.put<Machine>(
        "/machines",
        machineUpdateDto
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating machine with id ${machineUpdateDto.Id}:`,
        error
      );
      throw error;
    }
  },
};

export default MachineService;
