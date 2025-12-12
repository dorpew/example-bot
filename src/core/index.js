const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = '!';

client.commands = new Map();

let loaded = 0;
let ignored = 0;

const logTimestamp = () => `\x1b[36m[${new Date().toISOString()}]\x1b[0m`;

function loadCommands(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filepath = `${dir}/${file}`;
    const stat = fs.lstatSync(filepath);

    if (stat.isDirectory()) {
      loadCommands(filepath);
    } else if (file.endsWith('.js')) {
      try {
        const command = require(filepath);

        if (command.name && typeof command.execute === 'function') {
          client.commands.set(command.name, command);
          loaded++;
        } else {
          ignored++;
        }
      } catch (error) {
        ignored++;
      }
    }
  }
}

loadCommands(path.join(__dirname, '../commands'));

console.log(
  `\x1b[32m[COMANDOS]\x1b[90m ${loaded} carregados.\x1b[0m`
);

if (ignored > 0) {
  console.log(
    `\x1b[33m[IGNORADOS]\x1b[90m ${ignored} ignorados ou com erro.\x1b[0m`
  );
}

client.once('clientReady', () => {
  console.log(
    `\x1b[31m[APLICAÇÃO]\x1b[90m Bot online como ${client.user.tag}\x1b[0m`
  );
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(
      `\x1b[31m[ERRO]\x1b[90m Falha ao executar comando ${commandName}\x1b[0m`,
      error
    );
    message.reply('Ocorreu um erro ao executar este comando.');
  }
});

client.login(process.env.TOKEN);