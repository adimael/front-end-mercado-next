# 🛒 Aplicação Mercado - Next.js 🚀

![Mercado App](./prints/home.png)

## 📌 Sobre o Projeto

Este é um projeto desenvolvido com **Next.js** que simula um sistema de mercado, permitindo a gestão de produtos, fornecedores e pedidos. A aplicação está containerizada utilizando **Docker** para facilitar a implantação e escalabilidade.

---

## ⚙️ Tecnologias Utilizadas

- **Next.js** - Framework React para aplicações web modernas
- **Docker** - Containerização para facilitar a execução da aplicação
- **Node.js 22** - Ambiente de execução JavaScript no servidor
- **Alpine Linux** - Imagem base leve para os containers
- **MySQL** - Banco de dados relacional para armazenamento dos produtos e pedidos

---

## 📸 Prints da Aplicação

### 🔹 Página Inicial
![Página Inicial](./prints/home.png)

### 🔹 Listagem de Produtos
![Listagem de Produtos](./prints/cliente.png)

### 🔹 Cadastro de Novo Produto
![Cadastro de Produto](./prints/local.png)

---

## 📦 Como Rodar a Aplicação

### 🔹 1. Clonar o Repositório
```sh
git clone https://github.com/seu-usuario/mercado-nextjs.git
cd mercado-nextjs
```

### 🔹 3. Rodar com Docker Compose
Caso esteja utilizando docker-compose, basta rodar:
```sh
docker-compose up --build -d
```
#### A aplicação estará disponível em http://localhost:3000.

