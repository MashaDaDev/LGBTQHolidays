 else if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'holidays-month-select') { // matches customId in holidays.js 
        const months = [
          "January","February","March","April","May","June",
          "July","August","September","October","November","December"
        ];

        const monthNum = interaction.values[0]; // e.g. "6"
        const monthName = months[monthNum - 1];
        const url = `https://raw.githubusercontent.com/MashaDaDev/LGBTQHolidays/main/months/${monthNum}.js`;

        try {
          // fetch as text
          const holidaysText = await fetch(url).then(res => res.text());

          // clean up export default
          const cleaned = holidaysText
            .replace(/^export\s+default\s+/, "")
            .replace(/;$/, "");

          const holidays = JSON.parse(cleaned);

          // build embed
          const embed = new EmbedBuilder()
            .setTitle(`🌈 LGBTQ+ Holidays in ${monthName}`)
            .setColor(0xff69b4);

          if (holidays.length) {
            embed.setDescription(
              holidays
                .map(h => `**${h.date}** — ${h.name}${h.description ? `\n*${h.description}*` : ""}`)
                .join("\n\n")
            );
          } else {
            embed.setDescription(`No holidays found for ${monthName}.`);
          }

          // update the interaction
          await interaction.update({
            embeds: [embed],
            components: interaction.message.components, // keep the menu
          });

        } catch (err) {
          console.error("Failed to fetch/parse holidays:", err);
          await interaction.reply({
            content: "❌ Could not load holidays.",
            ephemeral: true,
          });
        }
      }
    }
