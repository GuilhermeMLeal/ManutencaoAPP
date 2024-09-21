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