const fs = require('fs');
const path = require('path');

function getCommandFiles(dir) {
  let commandFiles = [];

  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      commandFiles = commandFiles.concat(getCommandFiles(fullPath));
    } else if (file.isFile() && file.name.endsWith('.js')) {
      commandFiles.push(fullPath);
    }
  }

  return commandFiles;
}

module.exports = {
  name: 'reload',
  aliases: ['up', 'updateCommands'],
  description: 'Recarrega todos os comandos (incluindo subpastas)',
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) return;
      
    // Aqui está a mágica:
    // Vai um nível acima da subpasta onde está o reload.js para pegar a pasta commands raiz
    const commandsPath = path.join(__dirname, '..');

    const commandFiles = getCommandFiles(commandsPath);

    let reloadedCommands = [];
    let failedCommands = [];

    for (const filePath of commandFiles) {
      try {
        delete require.cache[require.resolve(filePath)];

        const newCommand = require(filePath);

        // Usa o nome do comando da exportação, ou o nome do arquivo caso não tenha
        const commandName = newCommand.name || path.basename(filePath, '.js');

        client.commands.set(commandName, newCommand);
        reloadedCommands.push(commandName);
      } catch (error) {
        console.error(`Erro ao recarregar comando ${filePath}:`, error);
        failedCommands.push(path.basename(filePath));
      }
    }

    console.log(`\x1b[32m[COMANDOS]\x1b[90m Comandos recarregados: ${reloadedCommands.join(', ')}`);
    if (failedCommands.length > 0) console.log(`\x1b[31m[ERRO]\x1b[90m Falha ao recarregar: ${failedCommands.join(', ')}`);

    let replyMessage = `✅ Recarregados: ${reloadedCommands.join(', ') || 'Nenhum'}\n`;
    if (failedCommands.length > 0)
      replyMessage += `\x1b[31m[ERRO]\x1b[90m Falha ao recarregar: ${failedCommands.join(', ')}`;

    message.channel.send(replyMessage);
  },
};
