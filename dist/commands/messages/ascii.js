"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { BaseCommand } = require("../../util");
const figlet = require('figlet');

class default_1 extends BaseCommand {
    name = "ascii";
    description = "Convert text to ASCII art.";
    metadata = { category: "fun" };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];
    options = [
        {
            type: ApplicationCommandOptionType.String,
            name: "text",
            description: "Text.",
            required: true,
        },
    ];

    async run(interaction) {
        const text = interaction.options.getString("text", true);
        figlet(text, function (err, data) {
            if (err) {
                console.log("Something went wrong...");
                console.dir(err);
                return;
            }
            const embed = new EmbedBuilder()
                .setTitle("🎨 ASCII Art")
                .setDescription("```" + `${data}` + "```")
                .setColor(0x8B0000)
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.username}` })

            interaction.reply({ embeds: [embed] });
        });
    };
}
exports.default = default_1;