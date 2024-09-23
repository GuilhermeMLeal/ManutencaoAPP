interface Maintenance {
    id: number;
    description: string;
    priority: string;
    responsible: string;
    status: 'Pendente' | 'Em andamento' | 'Concluída';
    materials: string[];
    date: string;
  }
  
  interface StockItem {
    id: string;
    name: string;
    quantity: number;
    price: string;
  }

  interface MaintenanceData {
    id: string;
    date: string;
    description: string;
    status: string;
  }
  
  interface MachineDetailsScreenProps {
    route: {
      params: {
        machine: {
          name: string;
          model: string;
          fabricationDate: string;
          serialNumber: string;
          status: string;
          image?: string;
        };
      };
    };
    navigation: {
      goBack: () => void;
    };
  }
  interface CreateMaintenanceRouteParams {
    addMaintenance: (maintenance: { description: string; priority: string; responsible: string }) => void;
  }
  interface StockItem {
    id: string;
    name: string;
    quantity: number;
    price: string;
  }
  interface ScreenItem {
    name: string;
    icon: string;
  }  