// commands/ping.js
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Responde com pong",
  execute(message, args, client) {
    const ping = client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setDescription(`🏓 O meu ping é de **${ping}ms**`);

    message.reply({ embeds: [embed] });
  },
};
