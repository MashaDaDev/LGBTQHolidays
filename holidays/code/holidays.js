import {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} from "discord.js";

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
