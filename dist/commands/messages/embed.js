"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const nhandler_1 = require("nhandler");
const index_1 = require("../../index");
const util_1 = require("../../util");
class default_1 extends util_1.BaseCommand {
    name = "embed";
    description = "Send an embed.";
    metadata = {
        category: "Messages",
    };
    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "title",
            description: "Title of the embed",
            required: false,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "description",
            description: "Description of the embed",
            required: false,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "color",
            description: "Color of the embed",
            required: false,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "footer",
            description: "Footer of the embed",
            required: false,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "thumbnail",
            description: "Thumbnail of the embed",
            required: false,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "image",
            description: "Image of the embed",
            required: false,
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "author",
            description: "Author of the embed",
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
        const embed = new discord_js_1.EmbedBuilder();
        const title = interaction.options.getString("title");
        const description = interaction.options.getString("description");
        const color = interaction.options.getString("color");
        if (color && !/^#[0-9A-F]{6}$/i.test(color)) {
            throw new nhandler_1.ExecutionError(`Invalid color provided. Color must be in the hex format: #RRGGBB.`);
        }
        const footer = interaction.options.getString("footer");
        const thumbnail = interaction.options.getString("thumbnail");
        const image = interaction.options.getString("image");
        const author = interaction.options.getString("author");
        if (title)
            embed.setTitle(title);
        if (description)
            embed.setDescription(description);
        if (color)
            embed.setColor(color);
        if (footer)
            embed.setFooter({ text: footer });
        if (thumbnail)
            embed.setThumbnail(thumbnail);
        if (image)
            embed.setImage(image);
        if (author)
            embed.setAuthor({ name: author });
        try {
            await interaction.reply({
                embeds: [embed],
            });
        }
        catch (err) {
            throw new nhandler_1.ExecutionError(`Failed to send embed.\n${err.message}`);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=embed.js.map