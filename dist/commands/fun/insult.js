// ── /insult ────────────────────────────────────────────────────────────────────
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { BaseCommand } = require("../../util");
const fs = require("fs");
const path = require("path");

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

    loadInsults() {
        try {
            const presetPath = path.join(__dirname, "../../presets/insult.txt");
            const content = fs.readFileSync(presetPath, "utf-8");
            return content.trim().split('\n').filter(line => line.trim() !== '');
        } catch (error) {
            console.error("Failed to load insults from preset file:", error);
            // Fallback to default insults if file can't be read
            return [
                "I'd call you sharp, but even a bowling ball has better edges.",
                "Your ideas are like software updates—announced loudly, forgotten quickly.",
                "You have the charisma of unsalted oatmeal.",
                "If ignorance were currency, you'd have Jeff Bezos sweating.",
                "I've met JSON files with more structure than your arguments."
            ];
        }
    }

    async run(interaction) {
        const user = interaction.options.getUser("user", true);
        const insults = this.loadInsults();
        const burn = insults[Math.floor(Math.random() * insults.length)];

        const embed = new EmbedBuilder()
            .setTitle("🗯️ Brutal Insult")
            .setDescription(`**${user.username}**, ${burn}`)
            .setColor(0x8B0000)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
