"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const embeds_1 = require("../../embeds");
const index_1 = require("../../index");
const util_1 = require("../../util");
class default_1 extends util_1.BaseCommand {
    name = "rps";
    description = "Play rock, paper, scissors.";
    metadata = {
        category: "Fun",
    };
    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "choice",
            description: "Your choice.",
            choices: [
                { name: "Rock", value: "rock" },
                { name: "Paper", value: "paper" },
                { name: "Scissors", value: "scissors" },
            ],
            required: true,
        },
    ];
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];
    async run(interaction) {
        if (!index_1.config.permittedIds.includes(interaction.user.id)) {
            await interaction.reply({ content: "You are not permitted to use this command.", ephemeral: true });
            return;
        }
        const choices = ["rock", "paper", "scissors"];
        const choice = interaction.options.getString("choice", true);
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        let result;
        if (choice === botChoice) {
            result = "It's a tie!";
        }
        else if ((choice === "rock" && botChoice === "scissors") ||
            (choice === "paper" && botChoice === "rock") ||
            (choice === "scissors" && botChoice === "paper")) {
            result = "You win!";
        }
        else {
            result = "You lose!";
        }
        await interaction.reply({ embeds: [(0, embeds_1.infoEmbed)(`You chose ${choice}, I chose ${botChoice}. **${result}**`)] });
    }
}
exports.default = default_1;
//# sourceMappingURL=rps.js.map