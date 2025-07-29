"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util_1 = require("../../util");
const fs = require("fs");
const path = require("path");

class default_1 extends util_1.BaseCommand {
    name = "rizz";
    description = "Drop a random pickup line on someone.";
    metadata = { category: "Fun" };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];

    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.User,
            name: "user",
            description: "The person you're trying to rizz.",
            required: true,
        },
    ];

    loadPickupLines() {
        try {
            const presetPath = path.join(__dirname, "../../presets/rizz.txt");
            const content = fs.readFileSync(presetPath, "utf-8");
            return content.trim().split('\n').filter(line => line.trim() !== '');
        } catch (error) {
            console.error("Failed to load pickup lines from preset file:", error);
            // Fallback to default pickup lines if file can't be read
            return [
                "Are you a magician? Because whenever I look at you, everyone else disappears.",
                "Do you have a name, or can I call you mine?",
                "Are you Wi‑Fi? Because I'm feeling a strong connection."
            ];
        }
    }

    async run(interaction) {
        const targetUser = interaction.options.getUser("user", true);
        const pickupLines = this.loadPickupLines();
        const line = pickupLines[Math.floor(Math.random() * pickupLines.length)];

    async run(interaction) {
        const targetUser = interaction.options.getUser("user", true);
        const line = this.pickupLines[Math.floor(Math.random() * this.pickupLines.length)];

        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("💘 Certified Rizz Delivery")
            .setColor(0xFFC0CB)
            .setDescription(`**${targetUser.username}**, ${line}`)
            .setFooter({ text: `Delivered by ${interaction.user.username}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
