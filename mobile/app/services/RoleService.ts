// import { userApiClient } from "./API";

// const RoleService = {
//   async getRoles(): Promise<RoleDTO[]> {
//     try {
//       const response = await userApiClient.get<RoleDTO[]>('/roles');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching roles:', error);
//       throw error;
//     }
//   },

//   async getRoleById(id: number): Promise<RoleDTO> {
//     try {
//       const response = await userApiClient.get<RoleDTO>(`/roles/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching role with ID ${id}:`, error);
//       throw error;
//     }
//   },

//   async createRole(roleDTO: RoleDTO): Promise<RoleDTO> {
//     try {
//       const response = await userApiClient.post<RoleDTO>('/roles', roleDTO);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating role:', error);
//       throw error;
//     }
//   },

//   async updateRole(id: number, roleDTO: RoleDTO): Promise<void> {
//     try {
//       await userApiClient.put(`/roles/${id}`, roleDTO);
//     } catch (error) {
//       console.error(`Error updating role with ID ${id}:`, error);
//       throw error;
//     }
//   },

//   async deleteRole(id: number): Promise<void> {
//     try {
//       await userApiClient.delete(`/roles/${id}`);
//     } catch (error) {
//       console.error(`Error deleting role with ID ${id}:`, error);
//       throw error;
//     }
//   },
// };

// export default RoleService;
