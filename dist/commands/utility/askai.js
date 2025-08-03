"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const nhandler_1 = require("nhandler");
const index_1 = require("../../index");
const util_1 = require("../../util");

class default_1 extends util_1.BaseCommand {
    name = "askai";
    description = "Ask AI a question.";
    metadata = {
        category: "utility",
    };
    options = [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: "prompt",
            description: "Your question or prompt for the AI.",
            required: true,
        },
    ];
    integrationTypes = [0, 1];
    contexts = [0, 1, 2];

    async run(interaction) {
        if (!index_1.config.permittedIds.includes(interaction.user.id)) {
            await interaction.reply({ 
                content: "You are not permitted to use this command.", 
                ephemeral: true 
            });
            return;
        }

        const userPrompt = interaction.options.getString("prompt", true);

        // Defer the reply since AI responses can take time
        await interaction.deferReply();

        try {
            // Get current date and time in the specified format
            const now = new Date();
            const currentDateTime = now.toISOString().replace('T', ' ').substring(0, 19);

            // Default system prompt if not defined in config
            const defaultSystemPrompt = "Prompt:Prompt:You are HelperBot, a friendly and knowledgeable assistant. Always be helpful, polite, and easy to understand. Keep a positive and approachable tone without sounding robotic. Provide accurate information, explain things clearly, and stay neutral in opinions. If you don’t know something, admit it and offer to help the user find the answer. Avoid harmful, offensive, or illegal advice. Be concise, and always aim to make the user’s experience smooth and helpful. also use discord markdown if needed. end-prompt end-prompt";
            
            // Use config system prompt or fallback to default
            const baseSystemPrompt = index_1.config.aiSystemPrompt || defaultSystemPrompt;
            
            // System prompt with current date/time and user info
            const systemPrompt = baseSystemPrompt.replace('{datetime}', currentDateTime) + 
                `\n\nCurrent User: ${interaction.user.username} (ID: ${interaction.user.id})\nUser's question: `;

            // Combine system prompt with user prompt
            const fullPrompt = systemPrompt + userPrompt;

            // Make API request to SpaceAPI
            const apiUrl = `https://spaceapi.gamercat.website/text?message=${encodeURIComponent(fullPrompt)}`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const jsonResponse = await response.json();
            
            // Check if the API call was successful
            if (!jsonResponse.success) {
                throw new Error("AI API returned unsuccessful response");
            }

            // Extract just the generated text
            const aiResponse = jsonResponse.generated_text;

            // Create embed for the response
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle("🤖 AI Response")
                .setDescription(aiResponse.length > 4096 ? aiResponse.substring(0, 4093) + "..." : aiResponse)
                .setColor(index_1.config.embeds.colors.normal)
                .setFooter({ 
                    text: `Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL()
                })
                .setTimestamp();

            // If response is too long, send as multiple messages
            if (aiResponse.length > 4096) {
                await interaction.editReply({ embeds: [embed] });
                
                // Send remaining text in chunks
                const remainingText = aiResponse.substring(4093);
                const chunks = remainingText.match(/.{1,2000}/g) || [];
                
                for (const chunk of chunks) {
                    await interaction.followUp({ content: `\`\`\`${chunk}\`\`\`` });
                }
            } else {
                await interaction.editReply({ embeds: [embed] });
            }

        } catch (err) {
            console.error("AI API Error:", err);
            
            const errorEmbed = new discord_js_1.EmbedBuilder()
                .setTitle("❌ AI Error")
                .setDescription("Failed to get response from AI. Please try again later.")
                .setColor(index_1.config.embeds.colors.error)
                .setTimestamp();

            await interaction.editReply({ embeds: [errorEmbed] });
            throw new nhandler_1.ExecutionError(`Failed to get AI response.\n${err.message}`);
        }
    }
}

exports.default = default_1;
//# sourceMappingURL=askai.js.map\
