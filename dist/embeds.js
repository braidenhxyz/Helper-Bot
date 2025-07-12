"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successEmbed = exports.errorEmbed = exports.infoEmbed = void 0;
const discord_js_1 = require("discord.js");
const _1 = require(".");
const baseEmbed = (content) => {
    let embed = new discord_js_1.EmbedBuilder().setTimestamp();
    if (content)
        embed.setDescription(content); //.setColor(config.embeds.colors.normal);
    // if (config.embeds.footer) embed.setFooter({ text: config.embeds.footer });
    return embed;
};
const infoEmbed = (content) => {
    return baseEmbed(content).setColor(parseInt(_1.config.embeds.colors.normal.replaceAll("#", ""), 16));
};
exports.infoEmbed = infoEmbed;
const errorEmbed = (content) => {
    return baseEmbed(content).setColor(parseInt(_1.config.embeds.colors.error.replaceAll("#", ""), 16));
};
exports.errorEmbed = errorEmbed;
const successEmbed = (content) => {
    return baseEmbed(content).setColor(parseInt(_1.config.embeds.colors.success.replaceAll("#", ""), 16));
};
exports.successEmbed = successEmbed;
//# sourceMappingURL=embeds.js.map