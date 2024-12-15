
interface MachineCreateDto {
    Name: string;
    Type: string;
    Model: string;
    ManufactureDate: Date;
    SerialNumber: string;
    StatusId?: number | null;
    PlaceId?: number | null;
  }
  
  interface MachineUpdateDto {
    Id: number;
    Name: string;
    Type: string;
    Model: string;
    ManufactureDate: Date;
    Status: string;
    PlaceId: number;
  }