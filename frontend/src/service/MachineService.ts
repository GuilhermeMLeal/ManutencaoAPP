import { machineApiClient } from "./api";

const MachineService = {
  async getAllMachines(): Promise<Machine[]> {
    try {
      const response = await machineApiClient.get<Machine[]>("/Machines");
      return response.data;
    } catch (error) {
      console.error("Error fetching machines:", error);
      throw error;
    }
  },

  async getMachineById(id: number): Promise<Machine> {
    try {
      const response = await machineApiClient.get<Machine>(`/Machines/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching machine with id ${id}:`, error);
      throw error;
    }
  },

  async addMachine(machineCreateDto: MachineCreateDto): Promise<Machine> {
    try {
      const response = await machineApiClient.post<Machine>(
        "/Machines",
        machineCreateDto
      );
      return response.data;
    } catch (error) {
      console.error("Error adding machine:", error);
      throw error;
    }
  },

  async updateMachine(machineUpdateDto: MachineUpdateDto): Promise<void> {
    try {
      await machineApiClient.put(`/Machines`, machineUpdateDto);
    } catch (error) {
      console.error(`Error updating machine with id ${machineUpdateDto.Id}:`, error);
      throw error;
    }
  },

  async deleteMachine(id: number): Promise<void> {
    try {
      await machineApiClient.delete(`/Machines/${id}`);
    } catch (error) {
      console.error(`Error deleting machine with id ${id}:`, error);
      throw error;
    }
  },

  async getAllPlaces(): Promise<Place[]> {
    try {
      const response = await machineApiClient.get<Place[]>("/Places");
      return response.data;
    } catch (error) {
      console.error("Error fetching places:", error);
      throw error;
    }
  },

  async getPlaceById(id: number): Promise<Place> {
    try {
      const response = await machineApiClient.get<Place>(`/Places/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching place with id ${id}:`, error);
      throw error;
    }
  },
/*
  async addPlace(placeDto: PlaceDTO): Promise<Place> {
    try {
      const response = await machineApiClient.post<Place>("/Places", placeDto);
      return response.data;
    } catch (error) {
      console.error("Error adding place:", error);
      throw error;
    }
  },

  async updatePlace(placeDto: PlaceDTO): Promise<void> {
    try {
      await machineApiClient.put(`/Places`, placeDto);
    } catch (error) {
      console.error(`Error updating place with id ${placeDto.Id}:`, error);
      throw error;
    }
  },
*/
  async deletePlace(id: number): Promise<void> {
    try {
      await machineApiClient.delete(`/Places/${id}`);
    } catch (error) {
      console.error(`Error deleting place with id ${id}:`, error);
      throw error;
    }
  },

  async getAllStatuses(): Promise<Status[]> {
    try {
      const response = await machineApiClient.get<Status[]>("/Status");
      return response.data;
    } catch (error) {
      console.error("Error fetching statuses:", error);
      throw error;
    }
  },

  async getStatusById(id: number): Promise<Status> {
    try {
      const response = await machineApiClient.get<Status>(`/Status/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching status with id ${id}:`, error);
      throw error;
    }
  },
};

export default MachineService;
