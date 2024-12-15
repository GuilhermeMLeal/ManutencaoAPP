
interface Maintenance {
    id: number;
    machineId: number;
    observations: string;
    lastUpdate: string;
    startDate: string;
    endDate: string;
    maintenanceParts: MaintenancePart[];
  }
  
  interface MaintenancePart {
    id: number;
    maintenanceId: number;
    partId: number;
    quantity: number;
  }