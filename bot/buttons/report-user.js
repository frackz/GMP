const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
module.exports = {
    data: {
        id: "report",
        contain: false
    },
	async execute(client, interaction, config, db) {
        const modal = new ModalBuilder().setTitle("Report a user").setCustomId("reportuser")
        const username = new TextInputBuilder().setCustomId('username').setLabel('Username of the user').setStyle(TextInputStyle.Short)
        const reason = new TextInputBuilder().setCustomId("reason").setLabel("Reason of the report").setStyle(TextInputStyle.Short)
        const proof = new TextInputBuilder().setCustomId("proof").setLabel("Proof of the report (clip or picture)").setStyle(TextInputStyle.Short)

        const urow = new ActionRowBuilder().addComponents(username)
        const rrow = new ActionRowBuilder().addComponents(reason)
        const prow = new ActionRowBuilder().addComponents(proof)
        await interaction.showModal(modal.addComponents(urow,rrow,prow))
	},
};