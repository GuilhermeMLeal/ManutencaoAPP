
interface Machine {
  id: number;
  name: string;
  type: string;
  model: string;
  manufactureDate: Date;
  serialNumber: string;
  placeId?: number | null;
  place?: Place;
  statusId?: number | null;
  status?: Status;
}
  
interface Place {
  id: number;
  name: string;
  description: string;
  observation: string;
  machines?: Machine[];
}

interface Status {
  id: number;
  name: string;
  machines?: Machine[];
}