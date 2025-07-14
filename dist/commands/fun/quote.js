"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder } = require("discord.js");
const { BaseCommand } = require("../../util");

class default_1 extends BaseCommand {
    name = "quote";
    description = "Get a random inspirational or funny quote.";
    metadata = { category: "fun" };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];

    quotes = [
        "“The best way to predict the future is to invent it.” – Alan Kay",
        "“I'm not great at the advice. Can I interest you in a sarcastic comment?” – Chandler Bing",
        "“Do or do not. There is no try.” – Yoda",
        "“Life is what happens when you're busy making other plans.” – John Lennon",
        "“Talk is cheap. Show me the code.” – Linus Torvalds",
        "“I'm not arguing, I'm just explaining why I'm right.”",
        "“Reality is broken. Game designers can fix it.” – Jane McGonigal"
    ];

    async run(interaction) {
        const quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];

        const embed = new EmbedBuilder()
            .setTitle("📜 Quote of the Moment")
            .setDescription(quote)
            .setColor(0x87CEEB)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;
