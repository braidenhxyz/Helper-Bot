"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { BaseCommand } = require("../../util");

class default_1 extends BaseCommand {
    name = "joke";
    description = "Give a funny joke.";
    metadata = { category: "fun" };
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];


    async fetchJoke() {
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single');
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            return data.joke;
        } catch (error) {
            console.error('Failed to fetch joke from API:', error);
            throw new Error('API request failed');
        }
    }

    async run(interaction) {
            
        const joke = await this.fetchJoke();

        const embed = new EmbedBuilder()
            .setTitle("🤣 Joke")
            .setDescription(`${joke}`)
            .setColor(0x8B0000)
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}` })

        await interaction.reply({ embeds: [embed] });
    }
}
exports.default = default_1;