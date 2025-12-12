const util = require("util");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "eval",
  description: "Executa código JavaScript (somente para o dono)",
  async execute(message, args, client) {
    if (message.author.id !== process.env.OWNER_ID) return;

    const code = args.join(" ");
    if (!code) return message.reply("Por favor, forneça o código para executar.");

    try {
      // Cria ambiente com variáveis úteis
      const context = {
        message,
        client,
        guild: message.guild,
        channel: message.channel,
        author: message.author,
      };

      // Executa código dentro de um async + contexto
      const evaled = await eval(`(async () => {
        with (context) {
          ${code}
        }
      })()`);

      let output = evaled;
      if (typeof output !== "string") {
        output = util.inspect(output, { depth: 1 });
      }

      if (output.length > 1000) {
        output = output.slice(0, 1000) + "... (output truncado)";
      }

      // 📥 Entrada
      const entradaEmbed = new EmbedBuilder()
        .setColor("Blurple")
        .setTitle("📥 Entrada")
        .setDescription(`\`\`\`js\n${code}\n\`\`\``);

      // 📤 Saída
      const saidaEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("📤 Saída")
        .setDescription(`\`\`\`js\n${output}\n\`\`\``);

      await message.reply({ embeds: [entradaEmbed, saidaEmbed] });
    } catch (err) {
      // 📥 Entrada
      const entradaEmbed = new EmbedBuilder()
        .setColor("Blurple")
        .setTitle("📥 Entrada")
        .setDescription(`\`\`\`js\n${code}\n\`\`\``);

      // ❌ Erro
      const erroEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Erro")
        .setDescription(`\`\`\`js\n${err.message || err}\n\`\`\``);

      await message.reply({ embeds: [entradaEmbed, erroEmbed] });
    }
  },
};
