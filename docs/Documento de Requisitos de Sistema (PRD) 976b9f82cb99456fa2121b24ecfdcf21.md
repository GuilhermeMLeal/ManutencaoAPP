# Documento de Requisitos de Sistema (PRD)

# *Introdução & objetivo*

Este sistema de gerenciamento de manutenções foi desenvolvido para otimizar os processos de manutenção em empresas industriais, melhorando a comunicação interna e a organização. Ele se destaca dos concorrentes por oferecer uma interface amigável e responsiva, medidas robustas de segurança, desempenho otimizado, métricas em tempo real representadas por dashboards e gerenciamento de tarefas em tempo real de cada setor. O sistema visa resolver problemas de falta de organização, comunicação ineficiente e perda de produtividade, trazendo valor aos usuários por meio de um registro eficiente de solicitações de manutenção, monitoramento detalhado de status e controle preciso de custos, resultando em um ambiente de trabalho mais seguro e eficiente.

# *Por que* implementar isto?

A implementação deste sistema de gerenciamento de manutenções é essencial para superar desafios operacionais comuns em empresas industriais. Automatizando o gerenciamento de manutenção, o sistema reduz erros manuais e acelera o tempo de resposta, centralizando informações e melhorando a organização e controle dos custos. Além disso, promove uma comunicação eficiente entre setores com notificações em tempo real, aumentando a produtividade ao reduzir o tempo de inatividade dos equipamentos. Medidas robustas de segurança garantem a proteção dos dados, enquanto o desempenho otimizado do sistema assegura sua eficiência em ambientes industriais complexos, resultando em um ambiente de trabalho mais seguro e produtivo.

---

# ***Público alvo***

| Perfil de usuário | Descrição, necessidades e interesses. |
| --- | --- |
| Supervisor de manutenção | Ele será o que irá averiguar todas as manutenções, sendo o responsável por organizar tudo, ele tem a necessidade de ver todas as equipes de manutenções, quem solicitou a manutenção, quanto tempo durou, se ocorreu tudo certo, quais equipamentos utilizados, etc. |
| Técnico de manutenção  | Eles serão os profissionais da área que irão realizar o procedimento da manutenção. Eles necessitam ter visibilidade do que precisa realizar, qual máquina ou equipamento ele deve arrumar, qual é nível de prioridade da manutenção, além de realizar uma devolutiva de como foi a manutenção. |
| Operador de máquina | Ele será a pessoa responsável por solicitar a manutenção da máquina correspondente. Sua necessidade inclui registrar a manutenção, detalhando o ocorrido e especificando se é uma manutenção preditiva, corretiva, etc. Além disso, ele precisa visualizar a equipe designada para realizar a manutenção e acompanhar o status da mesma. |
| Gestão da empresa | A gestão da empresa também terá toda a visibilidade sobre o sistema, porém com o cunho de averiguar não apenas como anda as manutenções dos equipamentos, como tempo consumido para essas manutenções, resultando em perdas de produção. Exibição de materiais para realizar a manutenção, resultando numa análise de gastos. |

# *Personas*

1. **Big Ken:** é um supervisor de manutenção que necessita acompanhar de perto todas as operações.  Através da aplicação, ele pode visualizar relatórios e métricas detalhadas que o auxiliam na projeção de cenários futuros. Isso permite que ele tome decisões informadas, resultando em melhorias financeiras e maior agilidade nas tarefas diárias.
2. **O Felix Junior:** é um técnico de manutenção experiente, responsável por realizar os procedimentos de manutenção em máquinas e equipamentos. Ele precisa ter uma visão clara e atualizada das tarefas que deve executar, incluindo informações sobre qual máquina ou equipamento precisa ser reparado, o nível de prioridade de cada manutenção e detalhes técnicos relevantes.
3. **Big Brain:**  Ele é operador de máquina responsável por garantir o funcionamento eficiente das máquinas e equipamentos no chão de fábrica. Quando ocorre um problema, ele precisa solicitar a manutenção, detalhando o ocorrido e especificando se é uma manutenção preditiva, corretiva, ou preventiva. Além disso, ele deve visualizar a equipe designada para realizar a manutenção e acompanhar o status da mesma.
4. **Stingy**: é o diretor financeiro da empresa, responsável por gerenciar e analisar todas as informações financeiras e operacionais. Embora não seja diretamente envolvido na manutenção, ele precisa ter visibilidade completa do sistema de manutenção para avaliar o impacto financeiro e operacional dessas atividades. Ele monitora o tempo consumido nas manutenções, o que pode resultar em perdas de produção, e examina os materiais utilizados para realizar as manutenções, a fim de realizar uma análise detalhada dos custos

💡 **Dicas Adicionais:**

- O mercado de sistemas de gerenciamento de manutenção industrial (CMMS - Computerized Maintenance Management System) está em constante crescimento, impulsionado pela digitalização e pela necessidade de aumentar a eficiência operacional. Identificar as tendências de mercado, como a adoção de tecnologias de IoT (Internet of Things) e IA (Inteligência Artificial) para manutenção preditiva, pode proporcionar insights valiosos. Empresas que adotam essas tecnologias tendem a reduzir custos operacionais e melhorar a produtividade, o que pode ser um diferencial competitivo para o sistema que está sendo desenvolvido.
- Analisar os concorrentes diretos e indiretos no mercado de CMMS pode ajudar a destacar as funcionalidades únicas do seu sistema. Identificar os pontos fortes, como a robustez das funcionalidades de análise de dados, e os pontos fracos, como interfaces complexas e pouco intuitivas, permite que o produto seja diferenciado ao focar em uma experiência de usuário otimizada e acessível. Também é importante observar como os concorrentes abordam questões como segurança de dados e integração com outros sistemas empresariais, o que pode influenciar as decisões de design e arquitetura do seu sistema.
- O sistema deve ser projetado para escalar conforme a empresa cresce, garantindo que ele continue a operar de forma eficiente mesmo com o aumento do volume de dados e do número de usuários. O desempenho otimizado é essencial para evitar atrasos que poderiam impactar negativamente a produção e a tomada de decisões.

---

# *Requisitos Funcionais*

1. **F1 Gerenciamento de Máquinas:** O sistema deve permitir o cadastro de máquinas, incluindo informações detalhadas como nome, tipo, modelo, data de fabricação, número de série, localização e histórico de manutenção. **P1**
    
    **Critérios de Aceitação:**
    
    - O usuário pode cadastrar novas máquinas com todas as informações necessárias.
    - O sistema deve permitir a visualização detalhada de cada máquina, mostrando seu histórico de manutenções e informações sobre peças e materiais utilizados.
2. **F2 Gerenciamento de Manutenções:** O sistema deve permitir o cadastro de solicitações de manutenção, incluindo informações como descrição do problema, data da solicitação, prioridade, responsável, e status da manutenção.**P1**
    
    **Critérios de Aceitação:**
    
    - O usuário pode criar e gerenciar solicitações de manutenção.
    - O sistema deve gerenciar o status da manutenção (pendente, em andamento, concluída, cancelada) e permitir a adição de comentários e arquivos relacionados.
    - Possibilidade de atribuir equipes de manutenção às solicitações e registrar as peças e materiais utilizados.
3. **F3 Controle de Estoque de Peças:** O sistema deve permitir o cadastro de peças de reposição, incluindo informações como nome, código, fornecedor, quantidade em estoque e valor unitário. **P1**
    
    **Critérios de Aceitação:**
    
    - O usuário pode cadastrar, visualizar e gerenciar o estoque de peças em tempo real.
    - O sistema deve registrar a entrada e saída de peças, com data e quantidade, e gerar relatórios de estoque.
4. **F4 Gerenciamento de Equipes:**  O sistema deve permitir o cadastro de equipes de manutenção, com informações sobre os colaboradores e suas especialidades. **P2**
    
    **Critérios de Aceitação:**
    
    - O usuário pode cadastrar e gerenciar equipes de manutenção.
    - O sistema deve permitir a atribuição de equipes às solicitações de manutenção e gerenciar a disponibilidade dos colaboradores.
5. **F5 Autenticação e Autorização:** O sistema deve permitir a criação de contas de usuário com diferentes níveis de acesso (administrador, técnico, etc.). **P1**
    
    **Critérios de Aceitação:**
    
    - O sistema deve controlar os acessos a diferentes funcionalidades da aplicação web com base no perfil do usuário.

**P1** = **Crítico | P2 = Importante | P3 = Bom ter**

### *Casos de uso*

> Caso de uso 1: Um técnico de manutenção precisa visualizar as solicitações atribuídas a ele e atualizar o status de cada manutenção conforme o trabalho progride. Ele acessa o sistema, verifica as manutenções pendentes, e ao concluir uma, muda o status para "Concluída", adicionando comentários e arquivos, se necessário.
> 

> Caso de uso 2: Um gestor precisa gerar um relatório mensal de manutenções preventivas realizadas em uma máquina específica. Ele acessa o módulo de gerenciamento de máquinas, seleciona a máquina em questão, e gera o relatório com os dados filtrados por tipo de manutenção e período.
> 

> Caso de uso 3: O responsável pelo estoque precisa verificar a quantidade disponível de uma peça específica. Ele acessa o módulo de controle de estoque, pesquisa pelo código da peça e visualiza a quantidade atual em estoque, além das entradas e saídas recentes.
> 

---

# *Requisitos Não Funcionais*

1. **NF1** Interface Amigável e Intuitiva**:** A interface do sistema deve ser fácil de usar e intuitiva para todos os usuários, independentemente do nível de conhecimento técnico. **P3**
    
    **Critérios de Aceitação:**
    
    - Usuários conseguem navegar e utilizar o sistema sem a necessidade de treinamento extensivo.
    - Feedbacks de testes de usabilidade devem indicar uma alta taxa de satisfação com a interface.
2. **NF2 Responsividade:** A aplicação web deve ser responsiva e funcionar perfeitamente em diferentes dispositivos, como computadores, tablets e smartphones. **P3**
    
    **Critérios de Aceitação:**
    
    - O sistema deve adaptar sua interface e funcionalidades ao tamanho da tela e ao dispositivo do usuário sem perda de desempenho ou usabilidade.
3. **NF3 Segurança:** O sistema deve implementar medidas robustas de segurança para proteger os dados, evitando acessos não autorizados e protegendo a aplicação contra ataques cibernéticos. **P1**
    
    **Critérios de Aceitação:**
    
    - O sistema deve estar em conformidade com as normas de segurança relevantes (ex.: ISO/IEC 27001).
    - Testes de penetração devem ser realizados para verificar a resiliência contra ameaças.
4. NF4 Desempenho: O sistema deve ser rápido e eficiente, respondendo às solicitações do usuário com rapidez, mesmo sob carga de dados elevada. **P2**
    
    **Critérios de Aceitação:**
    
    - O tempo de resposta do sistema deve ser inferior a 2 segundos para as principais funcionalidades, mesmo com um grande volume de dados.
    - Testes de estresse devem confirmar que o sistema pode suportar o uso simultâneo por um grande número de usuários sem degradação de desempenho.

**P1** = **Crítico | P2 = Importante | P3 = Bom ter**

### 📊 Métricas

| Medida | Estado atual | Esperado | Resultados |
| --- | --- | --- | --- |
| Tempo de resposta da interface | N/A | < 2 segundos | N/Aa |
| Satisfação do usuário | N/A | > 90% de aprovação | N/A |
| Tempo de inatividade do sistema | N/A | < 1% ao mês | N/A |

---

# *Fora de escopo*

Nosso projeto visa manter o foco nas funcionalidades e requisitos previamente definidos para garantir um produto eficiente e alinhado às necessidades do cliente. Portanto, listamos a seguir as abordagens e funcionalidades que estão fora do escopo deste projeto:

**1:** **Integração com Sistemas Externos de ERP**

- O projeto não prevê a integração direta com sistemas de ERP (Enterprise Resource Planning) externos, como SAP, Oracle, etc. Qualquer necessidade de integração deverá ser tratada como um projeto separado.

**2:** **Manutenção Baseada em Inteligência Artificial**

- O sistema não incluirá funcionalidades avançadas de inteligência artificial para prever falhas em equipamentos ou otimizar automaticamente os cronogramas de manutenção.

**3:** **Localização Multilíngue**

- A aplicação será desenvolvida em um único idioma (especificar o idioma, como português ou inglês). A tradução para múltiplos idiomas não faz parte do escopo atual.

**4:** **Funcionalidades de Realidade Aumentada (AR)**

- O sistema não incluirá recursos de realidade aumentada para visualização de equipamentos ou manutenções em campo. Qualquer funcionalidade relacionada deve ser considerada para um projeto futuro.

**5:** **Módulo Financeiro Completo**

- Embora o sistema forneça informações financeiras relacionadas a manutenções (como custos de peças e mão de obra), ele não incluirá um módulo financeiro completo para gestão de orçamento, contas a pagar, ou contabilidade.

**6: Treinamento e Suporte Contínuo**

- O projeto incluirá treinamento básico para usuários, mas não contemplará programas extensivos de treinamento ou suporte contínuo. Esses serviços podem ser contratados separadamente.

# *User Experience*

*Não há nenhuma prototipação para User Experience nesse projeto* 

# **Dependências**

1. **Infraestrutura de TI**:
    - Servidores para hospedar a aplicação web.
    - Banco de dados robusto para armazenar as informações das máquinas, manutenções, equipes e peças.
    - Rede de comunicação interna segura para permitir o acesso à aplicação pelos colaboradores.
2. **Recursos Humanos**:
    - Desenvolvedores Full Stack para implementar o sistema.
    - Especialistas em segurança da informação para garantir que a aplicação seja segura.
3. **Integração com sistemas legados**:
    - Conexão com sistemas atuais de gestão da empresa (ERP, controle de estoque, etc.), se aplicável, para sincronização de dados.
4. **Regulamentações e Compliance**:
    - Conformidade com as normas de segurança da informação e proteção de dados, como LGPD.
5. **Treinamento de Equipes**:
    - Treinamento dos colaboradores para utilização eficiente da nova aplicação.

---

# **Plano de lançamento**

1. **Regras para lançamento interno:**
    - [ ]  **Validação**:
        - Testes de integração para garantir que todos os módulos do sistema funcionam perfeitamente juntos.
        - Testes de carga para garantir que o sistema suporta o volume de dados esperado.
        - Testes de segurança para verificar a proteção contra acessos não autorizados.
    - [ ]  **Divulgação**:
        - Comunicação interna sobre o novo sistema.
        - Sessões de demonstração para os principais stakeholders e usuários.
        - Material de suporte (manuais, vídeos tutoriais) para facilitar a adoção do sistema.
2. **Regras para lançamento externo:**
    - [ ]  **Go-live**:
        - Migração dos dados do sistema manual atual para o novo sistema.
        - Monitoramento contínuo nos primeiros dias de operação para identificar e corrigir possíveis problemas.
        - Suporte técnico disponível para solucionar dúvidas e dificuldades dos usuários.

---

# **Plano de comunicação**

1. **Comunicações Internas**:
    - **Pré-lançamento**:
        - Informar as equipes de manutenção e gestores sobre a chegada do novo sistema com antecedência (via e-mail e reuniões).
        - Realizar workshops e treinamentos sobre como utilizar o sistema.
    - **Lançamento**:
        - Enviar notificações por e-mail e no aplicativo sobre a disponibilização do novo sistema.
        - Publicar um comunicado oficial na intranet da empresa.
    - **Pós-lançamento**:
        - Enviar pesquisas de satisfação para os usuários após o primeiro mês de uso.
        - Comunicar atualizações e melhorias no sistema conforme forem sendo implementadas.
2. **Comunicações Externas**:
    - **Clientes e Fornecedores**:
        - Enviar e-mails informativos sobre o novo sistema de gerenciamento de manutenção que garante maior eficiência na produção e no atendimento.
    - **Outras partes interessadas**:
        - Preparar relatórios periódicos para stakeholders estratégicos mostrando os benefícios alcançados com a implementação do sistema.