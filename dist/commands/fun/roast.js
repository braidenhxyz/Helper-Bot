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
            "You're not dumb — you're just... chronically under-updated.",
            "If I had a dollar for every smart thing you've said, I’d still be broke.",
            "You bring the same energy as a printer with low ink — loud, slow, and full of errors.",
            "Your confidence is impressive for someone who gets lost in their own browser tabs.",
            "You're the human version of a software beta — always crashing at the worst time.",
            "You have potential — it's just hiding really, really well.",
            "You're not completely useless. You can always serve as a bad example.",
            "You have something AI will never match: consistently poor decision-making.",
            "Your talent is like a hidden file — very well hidden.",
            "You're the reason the 'Are you sure?' button exists.",
            "You're like a slow-loading webpage — everyone gives up halfway through.",
            "If common sense were RAM, you'd be out of memory errors constantly.",
            "You're the plot twist nobody asked for in a story that was fine without it.",
            "You talk like your ideas are still buffering.",
            "You're a walking typo in the script of life."
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