<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=808080&height=120&section=header"/>

# Base Discord.js V14

![Stars](https://img.shields.io/github/stars/dorpew/example-bot?style=social)
![Forks](https://img.shields.io/github/forks/dorpew/example-bot)
![License](https://img.shields.io/github/license/dorpew/example-bot)

Este repositório é uma base simples para desenvolvimento de bots no Discord.js v14, criada para quem quer começar e precisa de uma estrutura inicial.

O projeto já traz configurações essenciais e exemplos básicos. Sinta-se livre para usar e adaptar como quiser.

---

## Como usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/dorpew/example-bot.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` com o token do bot e o id da sua conta.  
   Altere o prefixo em `src/core/index.js` conforme necessário.

4. Inicie o bot:
   ```bash
   npm run start
   ```

---

## Estrutura do Projeto

```
example-bot/
├── src/
│   ├── core/
│   │   └── index.js
│   └── commands/
│       ├── Utilidades/
│       │   └── ping.js
│       └── Proprietário Bot/
│           ├── eval.js
│           └── reload.js
├── .env.example
├── package.json
└── README.md
```

---

## Contribuição

Sugestões e melhorias são bem-vindas!  
Abra uma _issue_ ou envie um _pull request_.

## Licença

MIT

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=808080&height=120&section=footer"/>
