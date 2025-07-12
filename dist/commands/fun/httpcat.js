"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const nhandler_1 = require("nhandler");
const embeds_1 = require("../../embeds");
const index_1 = require("../../index");
const util_1 = require("../../util");
class default_1 extends util_1.BaseCommand {
    name = "httpcat";
    description = "Find a http.cat for a http status code.";
    metadata = {
        category: "Fun",
    };
    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "code",
            description: "HTTP status code",
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
        const code = interaction.options.getString("code", true);
        if (!code.match(/^\d{3}$/)) {
            throw new nhandler_1.ExecutionError("Invalid status code.");
        }
        const embed = (0, embeds_1.infoEmbed)().setTimestamp(null).setTitle(`HTTP ${code}`).setImage(`https://http.cat/${code}.jpg`);
        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
//# sourceMappingURL=httpcat.js.map