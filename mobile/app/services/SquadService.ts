// import { userApiClient } from "./API";

// const SquadService = {
//     async getAllSquads(): Promise<SquadDTO[]> {
//       try {
//         const response = await userApiClient.get<SquadDTO[]>('/squads');
//         return response.data;
//       } catch (error) {
//         console.error('Error fetching squads:', error);
//         throw error;
//       }
//     },
  
//     async getSquadById(id: number): Promise<SquadDTO> {
//       try {
//         const response = await userApiClient.get<SquadDTO>(`/squads/${id}`);
//         return response.data;
//       } catch (error) {
//         console.error(`Error fetching squad with ID ${id}:`, error);
//         throw error;
//       }
//     },
  
//     async createSquad(squadDTO: SquadDTO): Promise<SquadDTO> {
//       try {
//         const response = await userApiClient.post<SquadDTO>('/squads', squadDTO);
//         return response.data;
//       } catch (error) {
//         console.error('Error creating squad:', error);
//         throw error;
//       }
//     },
  
//     async updateSquad(id: number, squadDTO: SquadDTO): Promise<void> {
//       try {
//         await userApiClient.put(`/squads/${id}`, squadDTO);
//       } catch (error) {
//         console.error(`Error updating squad with ID ${id}:`, error);
//         throw error;
//       }
//     },
  
//     async deleteSquad(id: number): Promise<void> {
//       try {
//         await userApiClient.delete(`/squads/${id}`);
//       } catch (error) {
//         console.error(`Error deleting squad with ID ${id}:`, error);
//         throw error;
//       }
//     },
//   };
  
//   export default SquadService;