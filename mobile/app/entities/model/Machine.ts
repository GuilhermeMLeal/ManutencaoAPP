
interface Machine {
    Id: number;
    Name: string;
    Type: string;
    Model: string;
    ManufactureDate: string;
    SerialNumber: string;
    Status: string;
    PlaceId?: number | null;
  }
  
interface Place {
    Id: number;
    Name: string;
    Description: string;
    Observation: string;
}