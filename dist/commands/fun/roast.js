"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util_1 = require("../../util");

class default_1 extends util_1.BaseCommand {
    name = "roast";
    description = "Roasts a specified user with a random insult.";
    metadata = {
        category: "Fun",
    };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];
    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.User,
            name: "user",
            description: "The user to roast.",
            required: true,
        },
    ];

    async run(interaction) {
        const targetUser = interaction.options.getUser("user");
        
        const roasts = [
            "You're like a cloud. When you disappear, it's a beautiful day! ☁️☀️",
            "You bring everyone so much joy… when you leave the room! 😆",
            "You're proof that even evolution takes a step back sometimes. 🦧",
            "You have something on your chin… no, the third one down. 😂",
            "I'd agree with you but then we’d both be wrong. 🤷‍♂️"
        ];
        
        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
        
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("🔥 Roast Incoming!")
            .setColor("Orange")
            .setDescription(`**${targetUser.username}**, ${randomRoast}`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
