import {apiMachine, endpointMachine} from '../services/api'

const MachineService = {
  async getAllMachines(): Promise<Machine[]> {
    return apiMachine.get<Machine[]>(endpointMachine.machine)
    .then((response)=>{
      return response.data;
    })
    .catch ((error) =>{
      console.error("Error fetching machines:", error);
      throw error;
    })   
  },

  async getMachineById(id: number): Promise<Machine> {
    return apiMachine.get<Machine>(endpointMachine.machine + `/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(`Error fetching machine with id ${id}:`, error);
        throw error; // Repassa o erro para quem chamou essa função
      });
  },
  

  async addMachine(machineCreateDto: MachineCreateDto): Promise<Machine> {
    return apiMachine.post<Machine>(endpointMachine.machine, machineCreateDto)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error adding machine:", error);
        throw error; // Repassa o erro para quem chamou a função
      });
  },
  
  async updateMachine(machineUpdateDto: MachineUpdateDto): Promise<Machine> {
    return apiMachine.put<Machine>(endpointMachine.machine, machineUpdateDto)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(
          `Error updating machine with id ${machineUpdateDto.Id}:`,
          error
        );
        throw error; // Repassa o erro para quem chamou a função
      });
  }
  
};

export default MachineService;
