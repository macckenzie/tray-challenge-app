# Sales APP – Setup

Este projeto é uma aplicação Vue 3 desenvolvida para fins de teste técnico. Ela utiliza Docker para facilitar a execução
e builda o arquivo `.env` automaticamente com Dockerize.

---

## ✅ Como rodar o projeto localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/macckenzie/tray-challenge-app.git
   cd tray-challenge-app

2. **Suba os containers:**
    * A aplicação estará disponível em localhost:80 com todas as dependências instaladas
   ```bash
   docker-compose up --build -d

---

## Detalhes importantes

- A tabela `users` foi reaproveitada para escalabilidade, utilizando relacionamentos.
- Um usuário pode ser um vendedor 1:1 e administrador ao mesmo tempo.
- A aplicação não possui login de usuários (não deu tempo).


## Créditos
[Nathan Mendes](https://github.com/macckenzie)
