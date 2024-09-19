interface Maintenance {
    id: number;
    description: string;
    priority: string;
    responsible: string;
    status: 'Pendente' | 'Em andamento' | 'Concluída';
    materials: string[];
    date: string;
  }
  