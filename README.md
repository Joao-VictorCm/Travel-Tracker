# Travel-Tracker

## Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Rotas](#rotas)


## Sobre
Este projeto é uma API criada com Node.js e Express.js para gerenciar um banco de dados PostgreSQL que armazena informações sobre países visitados. Os usuários podem visualizar os países visitados e adicionar novos países por meio de formulários HTML.


## Funcionalidades

- Listar países visitados e o total de países na página inicial.
- Adicionar novos países visitados através de um formulário.
- Integração com banco de dados PostgreSQL.


## Requisitos

- Node.js (v16 ou superior)
- PostgreSQL (v12 ou superior)
- Um banco de dados PostgreSQL configurado com as seguintes tabelas:

```
  CREATE TABLE countries (
    country_code VARCHAR(3) PRIMARY KEY,
    country_name VARCHAR(50) NOT NULL
);

CREATE TABLE visited_countries (
    id SERIAL PRIMARY KEY,
    country_code VARCHAR(3) REFERENCES countries(country_code)
);
```

## Instalação

1. Clone este repositório:
```
git clone git@github.com:Joao-VictorCm/Travel-Tracker.git
```

2. Instale as dependências do projeto:
 ```
   npm install
   ```

3. Configure o banco de dados PostgreSQL:
- Certifique-se de que o PostgreSQL está rodando na máquina.
- Atualize as credenciais de acesso ao banco no arquivo principal (index.js):
  ```
  const db = new pg.Client({
  user: "seus User",
  host: "localhost",
  database: "world",
  password: "sua senha",
  port: "5432"
  );
  ```
4. Inicie o servidor:
   ```
   npm start
   ```
5. Acesse a aplicação em seu navegador 
http://localhost:3000


## Rotas

### GET /
- Exibe a página inicial com a lista de países visitados e o total de países.
- Consulta o banco de dados pela tabela visited_countries e exibe o country_code de cada país.

### POST /add

- Adiciona um novo país à lista de países visitados.
- Recebe o nome do país via formulário.
- Consulta o banco de dados para obter o country_code associado ao nome do país.
- Adiciona o código do país na tabela visited_countries.
