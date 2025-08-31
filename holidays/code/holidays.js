import {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  EmbedBuilder
} from "discord.js";
import fetch from "node-fetch";

export default {
  data: new SlashCommandBuilder()
    .setName("holidays")
    .setDescription("Browse LGBTQ+ holidays month by month"),

  async execute(interaction) {
    // Build select menu with all months
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("holidays-month-select")
      .setPlaceholder("📅 Choose a month")
      .addOptions([
        new StringSelectMenuOptionBuilder().setLabel("January").setValue("1"),
        new StringSelectMenuOptionBuilder().setLabel("February").setValue("2"),
        new StringSelectMenuOptionBuilder().setLabel("March").setValue("3"),
        new StringSelectMenuOptionBuilder().setLabel("April").setValue("4"),
        new StringSelectMenuOptionBuilder().setLabel("May").setValue("5"),
        new StringSelectMenuOptionBuilder().setLabel("June").setValue("6"),
        new StringSelectMenuOptionBuilder().setLabel("July").setValue("7"),
        new StringSelectMenuOptionBuilder().setLabel("August").setValue("8"),
        new StringSelectMenuOptionBuilder().setLabel("September").setValue("9"),
        new StringSelectMenuOptionBuilder().setLabel("October").setValue("10"),
        new StringSelectMenuOptionBuilder().setLabel("November").setValue("11"),
        new StringSelectMenuOptionBuilder().setLabel("December").setValue("12"),
      ]);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({
      content: "Pick a month to view LGBTQ+ holidays 🏳️‍🌈",
      components: [row],
      ephemeral: false,
    });
  },
};


// Put this inside your interactionCreate listener from interactionCreate.js
export async function handleHolidaySelect(interaction) {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== "holidays-month-select") return;

  const monthNum = interaction.values[0];
  const url = `https://raw.githubusercontent.com/MashaDaDev/LGBTQHolidays/main/months/${monthNum}.json`;

  let holidays;
  try {
    const res = await fetch(url);
    const text = await res.text();

    try {
      holidays = JSON.parse(text);
    } catch {
      const cleaned = text
        .replace(/^export\s+default\s+/, "")
        .replace(/;$/, "");
      holidays = JSON.parse(cleaned);
    }
  } catch (err) {
    console.error(err);
    return interaction.reply({
      content: "❌ Could not load holidays.",
      ephemeral: false,
    });
  }

  const embed = new EmbedBuilder()
    .setTitle(`🏳️‍🌈 Holidays in ${monthNum}`)
    .setColor(0xff69b4);

  holidays.forEach((h) => {
    embed.addFields({
      name: h.date || "Unknown date",
      value: h.name || "Unnamed holiday",
    });
  });

  await interaction.update({ embeds: [embed], components: [] });
}
