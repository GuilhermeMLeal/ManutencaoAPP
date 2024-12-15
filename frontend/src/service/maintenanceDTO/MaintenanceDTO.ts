
interface MaintenanceCreateDTO {
    machineId: number;
    observations: string;
    startDate: string;
    endDate: string;
    maintenanceParts: MaintenancePartCreateDTO[];
  }
  
  interface MaintenancePartCreateDTO {
    partId: number;
    quantity: number;
  }