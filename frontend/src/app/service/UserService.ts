import { userApiClient } from "./API";

const UserService = {
    async getUsers(): Promise<UserDTO[]> {
      try {
        const response = await userApiClient.get<UserDTO[]>('/users');
        return response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
  
    async getUserById(id: number): Promise<UserDTO> {
      try {
        const response = await userApiClient.get<UserDTO>(`/users/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error;
      }
    },
  
    async createUser(userDTO: UserDTO): Promise<UserDTO> {
      try {
        const response = await userApiClient.post<UserDTO>('/users', userDTO);
        return response.data;
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    },
  
    async updateUser(id: number, userDTO: UserDTO): Promise<void> {
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
  };
  
  export default UserService;