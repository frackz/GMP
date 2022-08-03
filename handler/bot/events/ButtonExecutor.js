module.exports = {
	event: 'interactionCreate',
	execute(client, interaction, config, db) {
        if (!interaction.isButton()) return;
        
        const ButtonList = client.buttons
        const id = interaction.customId
        
        if (ButtonList[id] != undefined && ButtonList[id].contain == false) {
            require('../buttons/'+ButtonList[id].file).execute(client, interaction, config, db); return;
        }
        for (const btn of Object.keys(ButtonList)) {
            const b = ButtonList[btn]
            if (id.includes(btn) && b.contain == true) {
                require('../buttons/'+b.file).execute(client, interaction, config, db);
                return;
            }
        }
	},
};