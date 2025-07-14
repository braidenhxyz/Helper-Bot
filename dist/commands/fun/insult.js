// ── /insult ────────────────────────────────────────────────────────────────────
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { BaseCommand } = require("../../util");

class default_1 extends BaseCommand {
    name = "insult";
    description = "Deliver a savage insult to a user.";
    metadata = { category: "fun" };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];

    options = [
        {
            type: ApplicationCommandOptionType.User,
            name: "user",
            description: "The unlucky target.",
            required: true,
        },
    ];

    insults = [
        "I'd call you sharp, but even a bowling ball has better edges.",
        "Your ideas are like software updates—announced loudly, forgotten quickly.",
        "You have the charisma of unsalted oatmeal.",
        "If ignorance were currency, you'd have Jeff Bezos sweating.",
        "I've met JSON files with more structure than your arguments.",
        "You're the human equivalent of a 404 error: here, but nothing loads.",
        "Your potential is like a comment marked TODO—permanently pending.",
        "You add as much value as a semicolon in Python.",
        "I'd explain it slowly, but your bandwidth is already saturated.",
        "Evolution is working overtime to patch your bugs."
    ];

    async run(interaction) {
        const user = interaction.options.getUser("user", true);
        const burn = this.insults[Math.floor(Math.random() * this.insults.length)];

        const embed = new EmbedBuilder()
            .setTitle("🗯️ Brutal Insult")
            .setDescription(`**${user.username}**, ${burn}`)
            .setColor(0x8B0000)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
