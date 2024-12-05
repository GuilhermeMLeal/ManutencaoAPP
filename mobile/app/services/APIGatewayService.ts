// import { apiGatewayClient } from "./API";

// const GatewayService = {
//     async getAllTools(): Promise<Tool[]> {
//       try {
//         const response = await apiGatewayClient.get<Tool[]>('/tools');
//         return response.data;
//       } catch (error) {
//         console.error('Error fetching tools from Gateway:', error);
//         throw error;
//       }
//     },
  
//     async getToolById(id: number): Promise<Tool> {
//       try {
//         const response = await apiGatewayClient.get<Tool>(`/tools/${id}`);
//         return response.data;
//       } catch (error) {
//         console.error(`Error fetching tool with ID ${id} from Gateway:`, error);
//         throw error;
//       }
//     },
  
//     async addTool(toolDto: ToolDTO): Promise<Tool> {
//       try {
//         const response = await apiGatewayClient.post<Tool>('/tools', toolDto);
//         return response.data;
//       } catch (error) {
//         console.error('Error adding tool through Gateway:', error);
//         throw error;
//       }
//     },
  
//     async updateTool(toolDto: ToolDTO): Promise<void> {
//       try {
//         await apiGatewayClient.put('/tools', toolDto);
//       } catch (error) {
//         console.error(`Error updating tool with ID ${toolDto.Id} through Gateway:`, error);
//         throw error;
//       }
//     },
  
//     async deleteTool(id: number): Promise<void> {
//       try {
//         await apiGatewayClient.delete(`/tools/${id}`);
//       } catch (error) {
//         console.error(`Error deleting tool with ID ${id} through Gateway:`, error);
//         throw error;
//       }
//     },
//   };
  
//   export default GatewayService;