"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { BaseCommand } = require("../../util");

class default_1 extends BaseCommand {
    name = "coinflip";
    description = "Flip a coin!";
    metadata = { category: "Fun" };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];

    async run(interaction) {
        const result = Math.random() < 0.5 ? "🪙 Heads" : "🪙 Tails";

        const embed = new EmbedBuilder()
            .setTitle("Coin Flip Result")
            .setDescription(result)
            .setColor(0xFFD700)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
