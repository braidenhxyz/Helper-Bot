import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ExecutionError } from "nhandler";
import { config } from "../../index";
import { BaseCommand } from "../../util";

export default class extends BaseCommand {
  name = "askai";
  description = "Ask Google AI a question.";
  metadata = {
    category: "utility",
  };
  options = [
    {
      type: ApplicationCommandOptionType.String,
      name: "prompt",
      description: "Your question or prompt for the AI.",
      required: true,
    },
  ];
  integrationTypes = [0, 1];
  contexts = [0, 1, 2];

  async run(interaction: any) {
    if (!config.permittedIds.includes(interaction.user.id)) {
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
      // Initialize Google AI
      const genAI = new GoogleGenerativeAI(config.googleAiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Get current date and time in the specified format
      const now = new Date();
      const currentDateTime = now.toISOString().replace('T', ' ').substring(0, 19);

      // System prompt with current date/time and user info
      const systemPrompt = config.aiSystemPrompt.replace('{datetime}', currentDateTime) + 
        `\n\nCurrent User: ${interaction.user.username} (ID: ${interaction.user.id})\nUser's question: `;

      // Combine system prompt with user prompt
      const fullPrompt = systemPrompt + userPrompt;

      // Generate response
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      // Create embed for the response
      const embed = new EmbedBuilder()
        .setTitle("🤖 AI Response")
        .setDescription(text.length > 4096 ? text.substring(0, 4093) + "..." : text)
        .setColor(config.embeds.colors.normal)
        .setFooter({ 
          text: `Requested by ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL()
        })
        .setTimestamp();

      // If response is too long, send as multiple messages
      if (text.length > 4096) {
        await interaction.editReply({ embeds: [embed] });
        
        // Send remaining text in chunks
        const remainingText = text.substring(4093);
        const chunks = remainingText.match(/.{1,2000}/g) || [];
        
        for (const chunk of chunks) {
          await interaction.followUp({ content: `\`\`\`${chunk}\`\`\`` });
        }
      } else {
        await interaction.editReply({ embeds: [embed] });
      }

    } catch (err: any) {
      console.error("Google AI Error:", err);
      
      const errorEmbed = new EmbedBuilder()
        .setTitle("❌ AI Error")
        .setDescription("Failed to get response from Google AI. Please try again later.")
        .setColor(config.embeds.colors.error)
        .setTimestamp();

      await interaction.editReply({ embeds: [errorEmbed] });
      throw new ExecutionError(`Failed to get AI response.\n${err.message}`);
    }
  }
}
