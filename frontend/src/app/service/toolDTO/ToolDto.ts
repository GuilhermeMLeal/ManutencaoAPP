
interface ToolDTO {
    Id?: number;
    Name: string;
    Type: string;
    Model: string;
    ManufactureDate: Date;
    SerialNumber: string;
    Status: string;
    PlaceId?: number | null;
  }