"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const nhandler_1 = require("nhandler");
const embeds_1 = require("../../embeds");
const index_1 = require("../../index");
const util_1 = require("../../util");
class default_1 extends util_1.BaseCommand {
    name = "userinfo";
    description = "Display information about users.";
    metadata = {
        category: "Utility",
    };
    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.User,
            name: "user",
            description: "The user to show information about.",
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
        const user = interaction.options.getUser("user") ?? interaction.user;
        const fetchedUser = this.client.users.cache.get(user.id) || (await this.client.users.fetch(user.id).catch(() => null));
        if (!fetchedUser) {
            throw new nhandler_1.ExecutionError("User not found.");
        }
        const avatars = [
            `[[256]](${fetchedUser.displayAvatarURL({ size: 256, extension: "png" })})`,
            `[[512]](${fetchedUser.displayAvatarURL({ size: 512, extension: "png" })})`,
            `[[1024]](${fetchedUser.displayAvatarURL({ size: 1024, extension: "png" })})`,
            `[[2048]](${fetchedUser.displayAvatarURL({ size: 2048, extension: "png" })})`,
        ];
        const fields = [
            `**» Username** ${fetchedUser.tag}`,
            `**» ID** ${fetchedUser.id}`,
            `**» Registered on Discord** <t:${Math.floor(fetchedUser.createdTimestamp / 1000)}:R>`,
            `**» Avatar** ${avatars.join(", ")}`,
        ];
        const embed = (0, embeds_1.infoEmbed)(fields.join("\n")).setThumbnail(user.displayAvatarURL({ size: 256 }));
        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
//# sourceMappingURL=userinfo.js.map