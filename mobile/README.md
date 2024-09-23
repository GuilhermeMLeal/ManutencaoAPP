# Documentação do Projeto: Maintenance App Mobile

## Introdução

O **Maintenance App Mobile** é uma aplicação desenvolvida para gerenciar eficientemente a manutenção de máquinas e o estoque de peças em um ambiente industrial. Através de uma interface amigável, o aplicativo permite que os usuários monitorem manutenções, gerenciem máquinas e peças, e atualizem informações relevantes em tempo real, facilitando a operação e a tomada de decisões.

## Estrutura do Aplicativo

### 1. Tela Inicial
**Função**: A tela inicial do aplicativo, a HomeScreen, apresenta uma saudação ao usuário e um grid de opções de navegação. Cada opção é representada por um ícone e um texto, permitindo que o usuário navegue facilmente para diferentes seções do aplicativo, como Manutenções, Máquinas, Estoque de Peças e Perfil do Usuário.

---

### 2. Tela de Máquinas

#### MachineDetailsScreen
**Função**: Exibe informações detalhadas sobre uma máquina específica. Permite ao usuário editar informações da máquina, alterar seu status e visualizar relatórios de manutenção. Contém botões de ação para facilitar a interação e modais para edição e exibição de status e manutenção.

- **BackButton**: Permite voltar à tela anterior.
- **MachineInfo**: Mostra informações detalhadas sobre a máquina.
- **ActionButtons**: Conjunto de botões para ações como editar, deletar, mudar status e visualizar manutenção.
- **EditMachineModal**: Modal para editar os dados da máquina.
- **StatusModal**: Modal para alterar o status da máquina e adicionar comentários.
- **MaintenanceModal**: Modal que exibe os relatórios de manutenção da máquina.

---

### 3. Tela de Estoque

**Função**: A tela de Estoque gerencia a exibição do estoque de peças, permitindo ao usuário buscar por itens específicos através de uma barra de pesquisa. A tela também oferece a funcionalidade de adicionar novas peças ao estoque por meio de um modal. Os dados do estoque são filtrados com base na pesquisa, e a interface é projetada para facilitar a visualização e a gestão das peças disponíveis.

- **StockScreen**: Exibe a lista de peças em estoque e permite buscar e adicionar novas peças.
- **SearchComponent**: Campo de busca para filtrar as peças na lista de estoque.
- **StockList**: Renderiza a lista de itens de estoque filtrados.
- **AddStockModal**: Modal para adicionar uma nova peça ao estoque.

---

### 4. Tela de Perfil de Usuário

**Função**: A ProfileScreen exibe as informações do perfil do usuário, incluindo nome, email e setor. A tela apresenta uma imagem de perfil e um botão que permite ao usuário navegar para a tela de edição do perfil. É uma interface intuitiva que facilita a visualização e atualização dos dados do usuário.

---

### 5. Tela sobre as Manutenções

**Função**: A MaintenanceScreen é uma tela central para gerenciar e registrar manutenções de máquinas, proporcionando uma interface interativa para adicionar, visualizar e editar informações sobre as atividades de manutenção. Os usuários podem cadastrar novas manutenções, adicionar materiais e fotos, e acompanhar o status de cada atividade, tudo de forma simplificada e acessível.

---