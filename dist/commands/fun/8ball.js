"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util_1 = require("../../util");

class default_1 extends util_1.BaseCommand {
    name = "8ball";
    description = "Ask the magic 8-ball a question and get your answer.";
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

    async run(interaction) {
        const question = interaction.options.getString("question", true);

        const responses = [
            "It is certain.",
            "Without a doubt.",
            "You may rely on it.",
            "Yes, definitely.",
            "It is decidedly so.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "Outlook not so good.",
            "Very doubtful.",
            "Absolutely not.",
            "No chance."
        ];

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