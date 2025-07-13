"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util_1 = require("../../util");

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

    pickupLines = [
        "Are you a magician? Because whenever I look at you, everyone else disappears.",
        "Do you have a name, or can I call you mine?",
        "Are you French? Because Eiffel for you.",
        "If beauty were a crime, you’d definitely be serving life.",
        "Are you Wi‑Fi? Because I’m feeling a strong connection.",
        "Do you have a map? Because I just got lost in your eyes.",
        "You must be a campfire, because you're hot and I want s'more.",
        "Even my GPU doesn’t render something this stunning.",
        "Are you made of copper and tellurium? Because you’re Cu‑Te.",
        "Are you a keyboard? Because you're just my type.",
        "You're so sweet, you could put Hershey’s out of business.",
        "You must be a time traveler — because I see you in my future.",
        "Is your name Google? Because you have everything I’ve been searching for.",
        "Are we in a server together? Because I feel a special connection here.",
        "If we were both strings, I’d be tied to you forever."
    ];

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
