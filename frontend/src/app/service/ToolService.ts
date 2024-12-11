import { toolApiClient } from "./api";

const ToolService = {
  async getAllTools(): Promise<Tool[]> {
    try {
      const response = await toolApiClient.get<Tool[]>("/Tools");
      return response.data;
    } catch (error) {
      console.error("Error fetching tools:", error);
      throw error;
    }
  },

  async getToolById(id: number): Promise<Tool> {
    try {
      const response = await toolApiClient.get<Tool>(`/Tools/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tool with ID ${id}:`, error);
      throw error;
    }
  },

  async addTool(toolDto: ToolDTO): Promise<Tool> {
    try {
      const response = await toolApiClient.post<Tool>("/Tools", toolDto);
      return response.data;
    } catch (error) {
      console.error("Error adding tool:", error);
      throw error;
    }
  },

  async updateTool(toolDto: ToolDTO): Promise<void> {
    try {
      await toolApiClient.put("/Tools", toolDto);
    } catch (error) {
      console.error(`Error updating tool with ID ${toolDto.Id}:`, error);
      throw error;
    }
  },

  async updateToolQuantity(updateTool: UpdateTool): Promise<void> {
    try {
      await toolApiClient.put("/Tools/quantity", updateTool);
    } catch (error) {
      console.error(
        `Error updating quantity for tool with ID ${updateTool.id}:`,
        error
      );
      throw error;
    }
  },

  async deleteTool(id: number): Promise<void> {
    try {
      await toolApiClient.delete(`/Tools/${id}`);
    } catch (error) {
      console.error(`Error deleting tool with ID ${id}:`, error);
      throw error;
    }
  },
};

export default ToolService;