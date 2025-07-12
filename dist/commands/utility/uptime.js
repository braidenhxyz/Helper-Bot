"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util_1 = require("../../util");

class default_1 extends util_1.BaseCommand {
    name = "uptime";
    description = "Displays how long the bot has been running.";
    metadata = {
        category: "Utility",
    };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];
    
    async run(interaction) {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("⏳ Bot Uptime")
            .setColor("Purple")
            .setDescription(`Uptime: **${hours}h ${minutes}m ${seconds}s**`)
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
