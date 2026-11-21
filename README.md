# API REST de Livraria — Node.js, Express e MongoDB

API REST para gerenciar **livros** e **autores**, desenvolvida durante o curso da Alura *Node.js: criando uma API Rest com Express e MongoDB*.

O projeto cobre o CRUD completo das duas entidades, o relacionamento entre elas por meio de **documentos embutidos** (embedding) e a busca de livros por parâmetro de consulta (query string).

## Tecnologias

- [Node.js](https://nodejs.org/) (ES Modules)
- [Express 5](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Nodemon](https://nodemon.io/) (ambiente de desenvolvimento)

## Estrutura do projeto

```
├── server.js                  # Ponto de entrada: sobe o servidor na porta 3000
└── src/
    ├── app.js                 # Configura o Express, conecta ao banco e registra as rotas
    ├── config/
    │   └── dbConnect.js       # Conexão com o MongoDB via Mongoose
    ├── models/
    │   ├── Autor.js           # Schema e model de autor (exporta também o autorSchema)
    │   └── Livro.js           # Schema e model de livro, com o autor embutido
    ├── controllers/
    │   ├── autorController.js
    │   └── livroController.js
    └── routes/
        ├── autoresRoutes.js
        └── livrosRoutes.js
```

O fluxo de uma requisição segue o padrão **rota → controller → model → banco**.

## Como executar

### Pré-requisitos

- Node.js **20.12 ou superior** (o projeto usa `process.loadEnvFile()` para ler o `.env`)
- Um cluster no MongoDB Atlas (ou uma instância local do MongoDB)

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/DanielGranato/alura-express-mongodb-api.git
cd alura-express-mongodb-api

# 2. Instalar as dependências
npm install

# 3. Criar o arquivo .env a partir do exemplo
cp .env.example .env
```

Edite o `.env` com a sua string de conexão:

```env
DB_CONNECTION_STRING=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>
```

```bash
# 4. Rodar em modo de desenvolvimento (reinicia a cada alteração)
npm run dev

# ou em modo normal
npm start
```

A API fica disponível em `http://localhost:3000`.

## Endpoints

### Livros

| Método | Rota                         | Descrição                        |
|--------|------------------------------|----------------------------------|
| GET    | `/livros`                    | Lista todos os livros            |
| GET    | `/livros/busca?editora=Nome` | Lista os livros de uma editora   |
| GET    | `/livros/:id`                | Busca um livro pelo id           |
| POST   | `/livros`                    | Cadastra um livro                |
| PUT    | `/livros/:id`                | Atualiza um livro                |
| DELETE | `/livros/:id`                | Exclui um livro                  |

### Autores

| Método | Rota            | Descrição               |
|--------|-----------------|-------------------------|
| GET    | `/autores`      | Lista todos os autores  |
| GET    | `/autores/:id`  | Busca um autor pelo id  |
| POST   | `/autores`      | Cadastra um autor       |
| PUT    | `/autores/:id`  | Atualiza um autor       |
| DELETE | `/autores/:id`  | Exclui um autor         |

## Exemplos de uso

### Cadastrar um autor

`POST /autores`

```json
{
  "nome": "Machado de Assis",
  "nacionalidade": "brasileira"
}
```

### Cadastrar um livro

`POST /livros`. No campo `autor`, envie apenas o **id** de um autor já cadastrado:

```json
{
  "titulo": "Dom Casmurro",
  "editora": "Companhia das Letras",
  "preco": 49.9,
  "paginas": 256,
  "autor": "<id-do-autor>"
}
```

O controller busca o autor pelo id e salva uma cópia dos dados dele dentro do livro:

```json
{
  "_id": "...",
  "titulo": "Dom Casmurro",
  "editora": "Companhia das Letras",
  "preco": 49.9,
  "paginas": 256,
  "autor": {
    "_id": "...",
    "nome": "Machado de Assis",
    "nacionalidade": "brasileira"
  }
}
```

### Buscar livros por editora

```
GET /livros/busca?editora=Companhia das Letras
```

## Relacionamento entre livro e autor

O projeto usa **embedding**: o `autorSchema` é importado no model de livro, e cada livro guarda uma cópia do autor.

- **Vantagem:** a leitura de um livro já traz o autor completo numa única consulta, sem precisar de `populate`.
- **Limitação:** se um autor for atualizado, os livros cadastrados antes continuam com os dados antigos.

A alternativa seria a **referência** (`ObjectId` + `ref` + `populate`), em que o livro guarda só o id do autor, parecido com uma chave estrangeira no SQL.

## Créditos

Projeto desenvolvido a partir do curso da [Alura](https://www.alura.com.br/) sobre API REST com Node.js, Express e MongoDB.
