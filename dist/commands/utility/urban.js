"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const embeds_1 = require("../../embeds");
const index_1 = require("../../index");
const util_1 = require("../../util");
function clean(str) {
    return str.replace(new RegExp("[\\[\\]]", "g"), "");
}
class default_1 extends util_1.BaseCommand {
    name = "urban";
    description = "Urban dictionary lookup.";
    metadata = {
        category: "Utility",
    };
    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "term",
            description: "Term to find.",
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
        const text = interaction.options.getString("term", true);
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(text)}`).then((res) => res.json());
        if (!list.length) {
            await interaction.reply({ content: "No results found.", ephemeral: true });
            return;
        }
        await interaction.reply({
            embeds: [
                (0, embeds_1.infoEmbed)(`**Urban Dictionary Lookup: ${text}**`)
                    .addFields(list
                    .sort((a, b) => b.thumbs_up - b.thumbs_down - (a.thumbs_up - a.thumbs_down))
                    .slice(0, 3)
                    .map((e, i) => ({
                    name: `Definition ${i + 1}:`,
                    value: `[🔗 URL](${e.permalink}) **${clean(e.definition.slice(0, 480))}**\nExample:\n\`\`\`\n${clean(e.example.slice(0, 480))}\`\`\`\nRating: 👍 ${e.thumbs_up}/${e.thumbs_down} 👎`,
                })))
                    .setTimestamp(null),
            ],
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=urban.js.map