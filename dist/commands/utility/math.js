"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const embeds_1 = require("../../embeds");
const index_1 = require("../../index");
const util_1 = require("../../util");
class default_1 extends util_1.BaseCommand {
    name = "math";
    description = "Evaluate math or code.";
    metadata = {
        category: "Utility",
    };
    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "input",
            description: "Input to evaluate.",
            required: true,
        },
    ];
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];
    async run(interaction) {
        if (!index_1.config.permittedIds.includes(interaction.user.id)) {
            await interaction.reply({ content: "You are not permitted to use this command.", ephemeral: true });
            return;
        }
        const text = interaction.options.getString("input", true);
        try {
            const result = eval(text);
            await interaction.reply({
                embeds: [(0, embeds_1.infoEmbed)(`\`\`\`js\n${result}\`\`\``).setTimestamp(null)],
            });
        }
        catch (err) {
            await interaction.reply({
                embeds: [(0, embeds_1.infoEmbed)(`\`\`\`js\n${err}\`\`\``).setTimestamp(null)],
            });
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=math.js.map