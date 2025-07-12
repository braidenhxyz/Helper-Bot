"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const nhandler_1 = require("nhandler");
const index_1 = require("../../index");
const util_1 = require("../../util");
class default_1 extends util_1.BaseCommand {
    name = "say";
    description = "Say as the bot.";
    metadata = {
        category: "Messages",
    };
    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "text",
            description: "Text to say.",
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
        const text = interaction.options.getString("text", true);
        try {
            await interaction.reply({ content: text });
        }
        catch (err) {
            throw new nhandler_1.ExecutionError(`Failed to send text.\n${err.message}`);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=say.js.map