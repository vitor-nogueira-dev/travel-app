# Teste Técnico - Full Stack

## Descrição
Desenvolvi uma aplicação conceito onde o usuário pode solicitar uma viagem de carro particular entre dois pontos, definindo a origem e o destino. O sistema oferece opções de motoristas, com valores e detalhes para escolher a melhor opção. Após confirmar a viagem, o usuário pode visualizar um histórico completo das viagens realizadas. O projeto foi pensado para ser funcional e intuitivo, seguindo uma estrutura clara e bem definida.

---

## Como Executar o Projeto

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker-compose](https://docs.docker.com/compose/)

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/vitor-nogueira-dev/travel-app.git
   ```

2. Acesse o diretório do projeto:
   ```sh
   cd travel-app
   ```

3. Suba os containers das aplicações:
   ```sh
   docker-compose up
   ```

4. Acesse a aplicação no navegador (frontend):
   ```sh
   http://localhost:80
   ```

---

## Stacks e Tecnologias

### **Backend**
- Node.js
- Express.js
- TypeScript
- MySQL2
- Mocha/Chai para testes
- Axios para requisições HTTP
- Helmet para segurança

### **Frontend**
- React
- Chakra UI para design system
- React-Leaflet para mapas
- Redux Toolkit para gerenciamento de estado
- Axios para comunicação com a API
- React Router para navegação

### **Ferramentas**
- Docker e Docker-Compose para containerização
- Vite para construção e desenvolvimento do frontend
- Jest e Mocha para testes
- ESLint para linting do código
- TypeScript para tipagem estática

---

## Arquitetura do Projeto

### **Backend**
```plaintext
/src
  /controllers     # Lógica para tratar as requisições
  /database        # Conexão com o banco de dados
  /interfaces      # Interfaces
  /middlewares     # Middlewares para validações
  /models          # Modelos de dados e queries
  /routes          # Definição das rotas da API
  /services        # Lógica de negócio
  /types           # Tipos
  /utils           # Funções utilitárias

/tests  
  /unit            # Testes unitários
  /utils           # Funções utilitárias para testes
```

### **Frontend**
```plaintext
/src
  /components      # Componentes reutilizáveis
  /interfaces      # Tipos e interfaces
  /pages           # Páginas principais
  /store           # Configuração do Redux

/src/components
  /common          # Componentes comuns
  /travel          # Componentes específicos para viagens
  /ui              # Componentes de interface
```

---

## Funcionalidades do Projeto

- **Criar estimativas de viagem**: Simula a solicitação de viagem entre dois pontos, oferecendo opções de motoristas.
- **Confirmar viagens**: Permite que o usuário escolha um motorista e finalize a solicitação.
- **Histórico de viagens**: Exibe viagens anteriores, com detalhes como origem, destino, motorista e valor.
- **Visualização no mapa**: Mostra rotas e distâncias utilizando Leaflet.

---

## Rotas da API

### BaseURL
```
http://localhost:8080
```

### **[POST] /ride/estimate**
- Cria uma estimativa de viagem
- **Body**:
    ```json
    {
      "customer_id": "string",
      "origin": "string",
      "destination": "string"
    }
    ```
- **Response**:
    ```json
    {
      "origin": {
          "latitude": "number",
          "longitude": "number"
      },
      "destination": {
          "latitude": "number",
          "longitude": "number"
      },
      "distance": "string",
      "duration": "string",
      "options": [
         {
            "id": "number",
            "name": "string",
            "description": "string",
            "vehicle": "string",
            "review": {
                "rating": "number",
                "comment": "string"
            },
            "value": "number"
        }
      ],
      "routeResponse": {
          "distanceMeters": "number",
          "duration": "string",
          "polyline": {
              "encodedPolyline": "string"
          }
      }
    }
    ```

### **[PATCH] /ride/confirm**
- Confirma a viagem
- **Body**:
    ```json
    {
      "customer_id": "string",
      "origin": "string",
      "destination": "string",
      "distance": "number",
      "duration": "number",
      "driver": {
          "id": "number",
          "name": "string"
      },
      "value": "number"
    }
    ```
- **Response**:
    ```json
    {
      "success": true
    }
    ```

### **[GET] /ride/{customer_id}?driver_id={driver_id}**
- Lista as viagens realizadas
- **Response**:
    ```json
    {
      "customer_id": "string",
      "rides": [
          {
            "id": "number",
            "date": "date",
            "origin": "string",
            "destination": "string",
            "distance": "number",
            "duration": "string",
            "driver": {
                "id": "number",
                "name": "string"
            },
            "value": "number"
          }
      ]
    }
    ```

---

## Testes

- **Backend:** Testes unitários utilizando Mocha e Chai. Para executar os testes:

1. Acesse o container do backend:
```sh
docker exec -it taxi_api bash
```

2. Execute o comando:
```sh
npm run test:mocha
```

--- 