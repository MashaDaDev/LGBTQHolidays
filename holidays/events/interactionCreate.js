     // --- interaction handler for the holidays select menu  so users can select from it in the Discord client--- 
client.on('interactionCreate', async (interaction) => {
  try { if (interaction.isStringSelectMenu()) {
      await handleHolidaySelect(interaction);
    }


    async function handleHolidaySelect(interaction) {
      if (!interaction.isStringSelectMenu()) return;
      if (interaction.customId !== "holidays-month-select") return;

      const monthNum = interaction.values[0];
      const url = `https://raw.githubusercontent.com/MashaDaDev/LGBTQHolidays/main/holidays/${monthNum}.json`;

      let holidays;
      try {
        const res = await fetch(url);
        const text = await res.text();

        // Remove any export/default syntax if present
        const cleaned = text.replace(/^export\s+default\s+/, "").replace(/;$/, "");
        holidays = JSON.parse(cleaned);
      } catch (err) {
        console.error("Failed to read or parse holiday data:", err);
        return interaction.reply({
          content: "❌ Could not load holidays for this month.",
          ephemeral: true,
        });
      }
// err if N/A like in January
      if (!holidays || holidays.length === 0) {
        return interaction.update({
          content: `No holidays found for this month.`,
          components: [],
        });
      }
// I use embeds but use what you feel comfy with 
      const embed = new EmbedBuilder()
        .setTitle(`🏳️‍🌈 LGBTQ+ Holidays in Month ${monthNum}`)
        .setColor(0xff69b4);

      holidays.forEach(h => {
        embed.addFields({ name: h.date || "Unknown date", value: h.name || "Unnamed holiday" });
      });
// add it like this so the select menu remains even upon edit
      await interaction.update({ embeds: [embed], components: [interaction.message.components[0]] });

    }
