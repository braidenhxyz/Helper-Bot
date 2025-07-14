"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { BaseCommand } = require("../../util");

class default_1 extends BaseCommand {
    name = "vibecheck";
    description = "Check if someone passes the vibe check.";
    metadata = { category: "fun" };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];

    options = [
        {
            type: ApplicationCommandOptionType.User,
            name: "user",
            description: "The user to vibe check.",
            required: true,
        },
    ];

    async run(interaction) {
        const user = interaction.options.getUser("user", true);
        const passed = Math.random() > 0.4;

        const embed = new EmbedBuilder()
            .setTitle("🎧 Vibe Check")
            .setDescription(`**${user.username}** ${passed ? "passed ✅" : "failed ❌"} the vibe check.`)
            .setColor(passed ? 0x00FF00 : 0xFF0000)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
