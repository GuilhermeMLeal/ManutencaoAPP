
interface Machine {
    Id: number;
    Name: string;
    Type: string;
    Model: string;
    ManufactureDate: Date;
    SerialNumber: string;
    Status: string;
    PlaceId?: number | null;
    Place?: Place | null;
  }
  
interface Place {
    Id: number;
    Name: string;
    Description: string;
    Observation: string;
    Machines: Machine[];
}