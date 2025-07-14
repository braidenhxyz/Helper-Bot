"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { BaseCommand } = require("../../util");

class default_1 extends BaseCommand {
    name = "simprate";
    description = "Calculate how much of a simp someone is.";
    metadata = { category: "fun" };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];

    options = [
        {
            type: ApplicationCommandOptionType.User,
            name: "user",
            description: "The user to rate.",
            required: true,
        },
    ];

    async run(interaction) {
        const user = interaction.options.getUser("user", true);
        const rate = Math.floor(Math.random() * 101);

        const embed = new EmbedBuilder()
            .setTitle("🧪 Simp Rating Detected")
            .setDescription(`**${user.username}** is **${rate}%** simp 💘`)
            .setColor(0xFF69B4)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
