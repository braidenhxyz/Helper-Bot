"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_translate_api_1 = require("@vitalets/google-translate-api");
const discord_js_1 = require("discord.js");
const embeds_1 = require("../../embeds");
const index_1 = require("../../index");
const util_1 = require("../../util");
class default_1 extends util_1.BaseCommand {
    name = "translate";
    description = "Translate text.";
    metadata = {
        category: "Utility",
    };
    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "text",
            description: "Original text to translate.",
            required: true,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "lang",
            description: "Language code to translate to.",
            required: true,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Boolean,
            name: "ephemeral",
            description: "Make the message display to you only.",
            required: false,
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
        const lang = interaction.options.getString("lang", true);
        const ephemeral = interaction.options.getBoolean("ephemeral") ?? false;
        const { text: result, raw } = await (0, google_translate_api_1.translate)(text, { to: lang });
        await interaction.reply({
            embeds: [
                (0, embeds_1.infoEmbed)([`**Translator** (${raw.src.toUpperCase()} -> ${lang.toUpperCase()})`, result].join("\n"))
                    .setAuthor({
                    name: "@" + interaction.user.username,
                    iconURL: interaction.user.displayAvatarURL(),
                })
                    .setTimestamp(null),
            ],
            ephemeral,
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=translate.js.map