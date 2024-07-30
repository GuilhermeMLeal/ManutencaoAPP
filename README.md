# Projeto Integrador - Sistema de Gerenciamento de Manutenção

## **Contexto:**

Imagine uma grande empresa industrial que fabrica peças automotivas. A empresa possui um parque de máquinas diversificado e complexo, e a manutenção preventiva e corretiva é crucial para garantir a produtividade e a segurança dos colaboradores. Atualmente, a empresa utiliza um sistema de gerenciamento de manutenção manual, o que gera diversos problemas, como:

- **Falta de organização e controle:** Dificuldade em registrar todas as solicitações de manutenção, monitorar o status das manutenções e controlar os custos de manutenção.
- **Comunicação ineficiente:** Dificuldade em comunicar as solicitações de manutenção para as equipes responsáveis, acompanhar o progresso das manutenções e registrar as peças e materiais utilizados.
- **Perda de tempo e produtividade:** Dificuldade em encontrar informações relevantes sobre as máquinas e seus históricos de manutenção, o que leva a atrasos e a interrupções na produção.

**Objetivo:** Criar uma aplicação web para gerenciar as atividades de manutenção, otimizando os processos e melhorando a comunicação e a organização dentro da empresa.

## **Requisitos Funcionais:**

- **Gerenciamento de Máquinas:**
    - Cadastro de máquinas, incluindo informações como nome, tipo, modelo, data de fabricação, número de série, localização, histórico de manutenção.
    - Visualização detalhada de cada máquina, com histórico de manutenções, informações sobre peças e materiais utilizados.
- **Gerenciamento de Manutenções:**
    - Cadastro de solicitações de manutenção, incluindo informações como descrição do problema, data da solicitação, prioridade, responsável, status da manutenção.
    - Gerenciar o status da manutenção (pendente, em andamento, concluída, cancelada), com possibilidade de adicionar comentários e arquivos relacionados.
    - Atribuir equipes de manutenção às solicitações.
    - Registrar as peças e materiais utilizados durante a manutenção, incluindo quantidade e fornecedor.
    - Gerar relatórios de manutenção por máquina, por período, por tipo de manutenção (preventiva, corretiva, etc.).
- **Controle de Estoque de Peças:**
    - Cadastrar peças de reposição, incluindo informações como nome, código, fornecedor, quantidade em estoque, valor unitário.
    - Registrar a entrada e saída de peças, com data e quantidade.
    - Visualizar o estoque de peças em tempo real e gerar relatórios de estoque.
- **Gerenciamento de Equipes:**
    - Cadastrar as equipes de manutenção, com informações sobre os colaboradores e suas especialidades.
    - Atribuir as equipes às solicitações de manutenção.
    - Gerenciar a disponibilidade dos colaboradores.
- **Autenticação e Autorização:**
    - Criar contas de usuário para diferentes tipos de acesso (administrador, técnico, etc.).
    - Controlar os acessos a diferentes funcionalidades da aplicação web.

## **Requisitos Não Funcionais:**

- **Interface amigável e intuitiva:** A interface deve ser fácil de usar e intuitiva para todos os usuários, independente do nível de conhecimento técnico.
- **Responsividade:** A aplicação web deve funcionar perfeitamente em diferentes dispositivos (computadores, tablets, smartphones).
- **Segurança:** Implementar medidas de segurança para proteger os dados da aplicação, evitando acessos não autorizados e protegendo a aplicação contra ataques de hackers.
- **Desempenho:** A aplicação deve ser rápida e eficiente, respondendo às solicitações do usuário com rapidez, mesmo com um grande volume de dados.