"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { BaseCommand } = require("../../util");

class default_1 extends BaseCommand {
  name = "insult";
  description = "Playfully insult someone (opt-in).";
  metadata = { category: "fun" };
  integrationTypes = [0, 1];
  contexts = [0, 1, 2];

  // Optional inputs: a target user and whether to reply ephemerally
  options = [
    {
      name: "target",
      description: "Who should receive the insult?",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
    {
      name: "ephemeral",
      description: "Only you can see the response",
      type: ApplicationCommandOptionType.Boolean,
      required: false,
    },
  ];

  async fetchInsult() {
    try {
      const res = await fetch(
        "https://evilinsult.com/generate_insult.php?lang=en&type=json",
        { headers: { Accept: "application/json" } }
      );
      if (!res.ok) throw new Error(`API request failed: ${res.status}`);
      const data = await res.json();
      return (data && data.insult) || null;
    } catch (err) {
      console.error("Failed to fetch insult from API:", err);
      return null; // fall back in run()
    }
  }

  async run(interaction) {
    const target = interaction.options.getUser("target");
    const ephemeral = interaction.options.getBoolean("ephemeral") ?? false;

    const insult =
      (await this.fetchInsult()) ??
      "I couldn’t think of a witty jab right now 🙃";

    const description = target ? `<@${target.id}>, ${insult}` : insult;

    const embed = new EmbedBuilder()
      .setTitle("🗯️ Insult")
      .setDescription(description)
      .setColor(0x8b0000)
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.username}` });

    await interaction.reply({ embeds: [embed], ephemeral });
  }
}
exports.default = default_1;
