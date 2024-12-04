
interface PlaceDTO {
    Id?: number;
    Name: string;
    Description: string;
    Observation: string;
    Machines?: Machine[] | null;
  }