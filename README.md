# Sistema de Oficina Mecânica

Projeto da atividade prática do SENAI — Desenvolvimento de Sistemas, aplicando os conceitos dos Módulos 1, 2 e 3.

## 1 Planejamento da entidade Cliente

A entidade principal do sistema é o *Cliente*, pois a oficina precisa cadastrar e identificar a pessoa que utiliza o sistema.

## Atributos definidos

 Atributo / Motivo 
 id / Identificador único, gerado automaticamente 
 nome / Nome completo do cliente 
 email / Login do cliente e identificação única 
 senha / Credencial de acesso, armazenada como hash com bcrypt 
 telefone / Contato da oficina com o cliente 
 modeloVeiculo / Identifica o modelo do veículo do cliente 
 placa / Identifica o veículo e deve ser única 
 anoVeiculo / Complementa a identificação do veículo 

## Respostas do planejamento

**Dado que identifica o veículo:** modelo, placa e ano.
**Informação de contato além do e-mail:** telefone.
**Dado específico do contexto da oficina:** placa e informações do veículo.

## 2 Rotas

 Método / Rota / Protegida? / Função /
 
 POST | /clientes | Não | Cadastrar cliente 
 POST | /login | Não | Fazer login e receber JWT 
 GET  | /clientes/perfil | Sim | Consultar os dados do próprio cliente 

## 3 Regra de segurança

A senha nunca é salva em texto puro. Antes do cadastro, ela é transformada em hash com bcrypt.

A rota `/clientes/perfil` exige um token JWT enviado no header `Authorization` usando o formato `Bearer <token>`.

## 4 Instalação

```bash
npm install express mysql2 sequelize jsonwebtoken bcrypt dotenv
```

Crie um arquivo `.env` usando `.env.example` como base e informe os dados do seu MySQL.

Depois crie o banco:

```sql
CREATE DATABASE oficina;
```

Inicie o projeto:

```bash
node src/app.js
```

## 5 Testes

## Cadastro

POST `http://localhost:3000/clientes`

```json
{
  "nome": "Guilherme Gama",
  "email": "guilherme@email.com",
  "senha": "123456",
  "telefone": "21999999999",
  "modeloVeiculo": "Honda Civic",
  "placa": "ABC1D23",
  "anoVeiculo": 2020
}
```

## Login

POST `http://localhost:3000/login`

```json
{
  "email": "guilherme@email.com",
  "senha": "123456"
}
```

Copie o `token` da resposta.

## Rota protegida

GET `http://localhost:3000/clientes/perfil`

Header:

```text
Authorization: Bearer SEU_TOKEN_AQUI
```

Sem o token, a API deve responder com status `401`.

## 6 Verificação no MySQL Workbench

Depois do cadastro, consulte:

```sql
USE oficina;
SELECT * FROM Clientes;
```

A coluna `senha` deve conter um hash e não a senha digitada originalmente.

## 7 GitHub e commits

Exemplo de sequência de commits:

```bash
git init
git add .
git commit -m "chore: cria estrutura inicial da oficina"
```

Depois do cadastro:

```bash
git add .
git commit -m "feat: implementa cadastro de clientes"
```

Depois do login e proteção:

```bash
git add .
git commit -m "feat: adiciona login e rota protegida"
```
