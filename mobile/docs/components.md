## Documentação - Projeto de Gestão de Máquinas

### Visão Geral

Este projeto é um sistema de gerenciamento de máquinas, permitindo visualizar informações sobre as máquinas, detalhes específicos e o histórico de manutenção. A aplicação é composta por componentes: **Machine**, **MachineDetail** e **MachineMaintenanceHistory**. Abaixo está a documentação detalhada de cada componente e como eles se relacionam.

---

## Componentes

### Máquinas

#### 1. **Machine**

Este componente é responsável por exibir uma lista de máquinas disponíveis no sistema, juntamente com seus tipos e localizações. Ele serve como ponto de entrada para o usuário visualizar todas as máquinas registradas.

- **Props:**
  - `machines`: Array de objetos contendo os dados das máquinas (nome, tipo, localização).

- **Exemplo de Estrutura de Dados:**

  ```js
  const machines = [
    {
      id: '1',
      name: 'Máquina A',
      type: 'Tipo 1',
      location: 'Fábrica 1'
    },
    {
      id: '2',
      name: 'Máquina B',
      type: 'Tipo 2',
      location: 'Fábrica 2'
    }
  ];
  ```

- **Funcionamento:**
  - Exibe a lista de máquinas, apresentando suas informações básicas.
  - Cada item da lista é clicável, levando ao componente **MachineDetail** para visualizar mais detalhes.

#### 2. **MachineDetail**

O **MachineDetail** é um componente que exibe informações detalhadas de uma máquina específica, como o modelo, número de série e data de fabricação. Ele também permite ao usuário acessar o histórico de manutenção dessa máquina, acionando o componente **MachineMaintenanceHistory**.

- **Exemplo de Estrutura de Dados:**

  ```js
    const mockMachineDetails = {
    model: 'XYZ-1234',
    manufactureDate: '2022-06-15',
    serialNumber: 'SN1234567890',
    description: 'Fresa',
    location: 'Setor A',
    condiction: 'Bom',
    lastMaintenance: '2023-08-01',
    status: 'Em Operação',

  };
  ```

- **Funcionamento:**
  - Exibe os detalhes da máquina com base no ID recebido.
  - Inclui um botão que, ao ser clicado, exibe o **MachineMaintenanceHistory**.

#### 3. **MachineMaintenanceHistory**

O componente **MachineMaintenanceHistory** exibe o histórico de manutenções realizadas em uma máquina específica. Ele mostra as datas das manutenções, a descrição dos serviços realizados e os custos associados.

- **Exemplo de Estrutura de Dados:**

  ```js
    const maintenanceHistory = [
    { id: '1', startDate: '2024-09-20', endDate: '2024-09-30', cost: '$150.00', description: 'Troca de óleo e filtro.' },
    { id: '2', startDate: '2024-08-05', endDate: '2024-08-10', cost: '$200.00', description: 'Reparo no sistema de ar condicionado.' },
    { id: '3', startDate: '2024-07-15', endDate: '2024-07-20', cost: '$100.00', description: 'Substituição de peças quebradas.' },
    { id: '4', startDate: '2024-06-01', endDate: '2024-06-05', cost: '$250.00', description: 'Manutenção geral e calibração.' },
  ];
  ```

- **Funcionamento:**
  - Lista as manutenções realizadas na máquina selecionada.
  - Cada item exibe as datas, o que foi feito e o valor gasto.
  
---

### Fluxo de Navegação de máquinas

1. **Machine**: O usuário inicia visualizando todas as máquinas.
   - Selecionando uma máquina, o usuário é levado ao **MachineDetail**.

2. **MachineDetail**: Exibe informações detalhadas de uma máquina.
   - O usuário pode clicar em um botão para visualizar o histórico de manutenção da máquina.

3. **MachineMaintenanceHistory**: Mostra o histórico de manutenção da máquina selecionada, com detalhes de cada serviço realizado.

### Manutenção

O componente **Maintenance** é responsável por gerenciar as máquinas que estão atualmente em manutenção, permitindo ao usuário visualizar a lista de máquinas em manutenção e, ao clicar em uma máquina específica, registrar e editar os itens (peças e materiais) utilizados durante a manutenção.

---

### Estrutura do Componente

#### **Maintenance**

Este componente exibe uma lista de máquinas em manutenção e permite o acesso à tela de registro e edição de itens utilizados em cada manutenção.

- **Exemplo de Estrutura de Dados:**

  ```js
  const maintenanceMachines = [
    {
      id: '1',
      name: 'Máquina A',
      type: 'Tipo 1',
      location: 'Fábrica 1',
      status: 'Em progresso',
    },
    {
      id: '2',
      name: 'Máquina B',
      type: 'Tipo 2',
      location: 'Fábrica 2',
      status: 'Pendente',
    }
  ];
  ```

- **Funcionamento:**
  - Exibe uma lista de máquinas atualmente em manutenção, mostrando informações básicas como nome, tipo e status.
  - Cada máquina é um item clicável, redirecionando o usuário para a tela de **registerParts** onde é possível registrar e editar os itens (peças e materiais) utilizados.

---

#### **ItemRegistration**

Este componente é utilizado para registrar e editar os itens (peças e materiais) utilizados na manutenção de uma máquina específica. Ele é acessado ao clicar em uma máquina listada no componente **Maintenance**.

- **Exemplo de Estrutura de Dados:**

  ```js
  const itemsUsed = [
    {
      id: '1',
      name: 'Peça A',
      quantity: '10',
      price: '$15.00',
    },
    {
      id: '2',
      name: 'Material B',
      quantity: '5',
      price: '$7.00',
    }
  ];
  ```

- **Funcionalidades:**
  - Exibe uma lista de itens já registrados para a manutenção da máquina selecionada.
  - O usuário pode adicionar novos itens à lista ou editar as informações de itens já registrados (nome, quantidade, preço).
  - Inclui campos de entrada para os dados do item (nome, quantidade e preço) e um botão para salvar ou atualizar as informações.
  - Ao salvar, as informações são atualizadas e exibidas na lista.

---

### Fluxo de Navegação

1. **Maintenance**: O usuário inicia na tela de máquinas em manutenção.
   - Cada máquina em manutenção é listada com seu nome, tipo, localização e status.
   - Ao clicar em uma máquina, o usuário é redirecionado para a tela de **registerParts**.

2. **registerParts**: Nesta tela, o usuário pode:
   - Ver todos os itens já registrados para a manutenção da máquina.
   - Adicionar novos itens ou editar os existentes.
   - Salvar ou atualizar as informações dos itens.

### Estoque

## Documentação do Componente **Maintenance**

### **Maintenance**

Este componente exibe uma lista de máquinas atualmente em manutenção, com a opção de acessar a tela de registro e edição dos itens utilizados na manutenção de uma máquina.

- **Props:**
  - `maintenanceMachines`: Array de objetos contendo os dados das máquinas em manutenção (nome, tipo, localização, status da manutenção).

- **Funcionamento:**
  - Exibe a lista de máquinas em manutenção, mostrando informações básicas (nome, tipo, status).
  - Cada máquina é clicável, redirecionando o usuário para a tela de **ItemRegistration**, onde é possível registrar e editar os itens utilizados.

#### **ItemRegistration**

Este componente permite registrar e editar os itens (peças e materiais) utilizados na manutenção de uma máquina específica.

- **Props:**
  - `machineId`: ID da máquina que está sendo mantida.
  - `itemsUsed`: Array contendo as informações dos itens utilizados (nome, quantidade, preço).

- **Funcionalidades:**
  - Exibe os itens registrados e permite adicionar ou editar as informações (nome, quantidade, preço) de itens utilizados.
  - O usuário pode salvar ou atualizar os itens.

---

1. **Maintenance**: Lista as máquinas em manutenção.
   - Cada máquina permite o acesso à tela de **ItemRegistration**.

2. **ItemRegistration**: Exibe e permite registrar/editar itens utilizados na manutenção.

---

#### **Stock**

Este componente exibe a lista de peças disponíveis no estoque, com a possibilidade de solicitar peças para a logística.

- **Exemplo de Estrutura de Dados:**

  ```js
  const stockItems = [
  { id: '1', name: 'Parafuso M8', quantity: 150 },
  { id: '2', name: 'Filtro de Óleo', quantity: 50 },
  { id: '3', name: 'Correia V', quantity: 25 },
  { id: '4', name: 'Parafuzo m12', quantity: 10 },
  ];
  ```

- **Funcionamento:**
  - Exibe a lista de peças em estoque, mostrando informações como nome, id e quantidade disponível.
  - Cada peça possui uma opção de solicitação, onde o usuário pode selecionar a quantidade desejada para ser enviada à logística.

#### **Solicitação de Peças**

Ao clicar em uma peça no componente **Stock**, o usuário pode solicitar uma quantidade específica para ser encaminhada para a logística.

- **Funcionalidades:**
  - Exibe um campo de entrada onde o usuário pode especificar a quantidade de peças que deseja solicitar.
  - Um botão para confirmar a solicitação e enviar a peça para a logística.

---

1. **Stock**: Lista as peças disponíveis no estoque.
   - Cada peça permite a solicitação de uma quantidade específica para a logística.

2. **Solicitação de Peças**: O usuário seleciona a quantidade de peças que deseja solicitar e confirma a ação.

---
