"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder } = require("discord.js");
const { BaseCommand } = require("../../util");

// ZenQuotes (keyless)
async function getFromZenQuotes() {
  const res = await fetch("https://zenquotes.io/api/random");
  if (!res.ok) throw new Error(`ZenQuotes failed: ${res.status}`);
  const data = await res.json(); // [{ q, a, h }]
  if (!Array.isArray(data) || data.length === 0) throw new Error("ZenQuotes returned empty");
  const { q, a } = data[0] || {};
  if (!q) throw new Error("ZenQuotes missing quote text");
  return { content: q, author: a || "Unknown" };
}

class default_1 extends BaseCommand {
  name = "quote";
  description = "Get a random quote (ZenQuotes).";
  metadata = { category: "fun" };
  integrationTypes = [0, 1];
  contexts = [0, 1, 2];

  async run(interaction) {
    try {
      const q = await getFromZenQuotes();

      const embed = new EmbedBuilder()
        .setTitle("💬 Quote")
        .setDescription(`*${q.content}*\n— **${q.author}**`)
        .setColor(0x8b0000)
        .setTimestamp()
        .setFooter({ text: `Requested by ${interaction.user.username}` });

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      const embed = new EmbedBuilder()
        .setTitle("💬 Quote")
        .setDescription("Couldn’t fetch a quote from ZenQuotes right now. Please try again later.")
        .setColor(0x8b0000)
        .setTimestamp()
        .setFooter({ text: `Requested by ${interaction.user.username}` });

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
}
exports.default = default_1;
