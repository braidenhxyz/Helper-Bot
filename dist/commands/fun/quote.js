"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util_1 = require("../../util");
const fs = require("fs");
const path = require("path");

class default_1 extends util_1.BaseCommand {
    name = "quote";
    description = "Get a random inspirational or funny quote.";
    metadata = {
        category: "fun",
    };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];
    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "question",
            description: "Your question to the 8-ball.",
            required: true,
        },
    ];

    loadResponses() {
        try {
            const presetPath = path.join(__dirname, "../../presets/8ball.txt");
            const content = fs.readFileSync(presetPath, "utf-8");
            return content.trim().split('\n').filter(line => line.trim() !== '');
        } catch (error) {
            console.error("Failed to load 8ball responses from preset file:", error);
            // Fallback to default responses if file can't be read
            return [
                "It is certain.",
                "Without a doubt.",
                "You may rely on it.",
                "Yes, definitely.",
                "My reply is no."
            ];
        }
    }

    async run(interaction) {
        const question = interaction.options.getString("question", true);

        const responses = this.loadResponses();
        const answer = responses[Math.floor(Math.random() * responses.length)];

        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("🎱 The Magic 8-Ball Says...")
            .setColor("DarkPurple")
            .addFields(
                { name: "❓ Question", value: question },
                { name: "💬 Answer", value: answer }
            )
            .setFooter({ text: `Asked by ${interaction.user.username}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;