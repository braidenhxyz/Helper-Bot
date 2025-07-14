"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { BaseCommand } = require("../../util");

class default_1 extends BaseCommand {
    name = "roll";
    description = "Roll a dice between 1 and 100.";
    metadata = { category: "fun" };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];

    async run(interaction) {
        const roll = Math.floor(Math.random() * 100) + 1;

        const embed = new EmbedBuilder()
            .setTitle("🎲 You rolled...")
            .setDescription(`**${roll}**`)
            .setColor(0x00FF99)
            .setFooter({ text: `Requested by ${interaction.user.username}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
