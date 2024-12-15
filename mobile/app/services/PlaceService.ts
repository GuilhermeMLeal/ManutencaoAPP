// import { machineApiClient } from "./API";

// const PlaceService = {
//     async getAllPlaces(): Promise<Place[]> {
//       try {
//         const response = await machineApiClient.get<Place[]>('/places');
//         return response.data;
//       } catch (error) {
//         console.error('Error fetching places:', error);
//         throw error;
//       }
//     },
  
//     async getPlaceById(id: number): Promise<Place> {
//       try {
//         const response = await machineApiClient.get<Place>(`/places/${id}`);
//         return response.data;
//       } catch (error) {
//         console.error(`Error fetching place with ID ${id}:`, error);
//         throw error;
//       }
//     },
  
//     async addPlace(placeDto: PlaceDTO): Promise<Place> {
//       try {
//         const response = await machineApiClient.post<Place>('/places', placeDto);
//         return response.data;
//       } catch (error) {
//         console.error('Error adding place:', error);
//         throw error;
//       }
//     },
  
//     async updatePlace(placeDto: PlaceDTO): Promise<Place> {
//       try {
//         const response = await machineApiClient.put<Place>('/places', placeDto);
//         return response.data;
//       } catch (error) {
//         console.error(`Error updating place with ID ${placeDto.Id}:`, error);
//         throw error;
//       }
//     },
  
//     async deletePlace(id: number): Promise<void> {
//       try {
//         await machineApiClient.delete(`/places/${id}`);
//       } catch (error) {
//         console.error(`Error deleting place with ID ${id}:`, error);
//         throw error;
//       }
//     },
//   };
  
//   export default PlaceService;
  