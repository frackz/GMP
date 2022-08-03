module.exports = {
    data: {
        id: "disable",
        contain: false
    },
	async execute(client, interaction, config, db) {
        const data = db.prepare('SELECT * FROM `keys` WHERE `owner` = ?').get(interaction.user.id)
        if (data != null) {
            if (data.disabled == 0) {
                db.prepare('UPDATE `keys` SET `disabled` = 1 WHERE owner = ?').run(interaction.user.id)
                return interaction.reply({
                    embeds:[{
                        "title": "Your API key is now disabled.",
                        "description": "Your key has been disabled, you can enable it whenever you want.\n\nIf a user is using your key without your consent, please contact tickets.\nNo servers with your api-key will now have contact with GMP servers.",
                        "color": 16506368
                    }], ephemeral: true
                }).catch((err) => console.log("INTERACTION"))
            } else {
                db.prepare('UPDATE `keys` SET `disabled` = 0 WHERE owner = ?').run(interaction.user.id)
                return interaction.reply({
                    embeds: [{
                        "title": "Your API key is now enabled.",
                        "description": "Your key has now been enabled. All servers connected to your API key now have access to GMP servers.\n\nIf there are servers or players who have your key, you can always reset it using **/api**",
                        "color": 16506368
                    }], ephemeral: true
                }).catch((err) => console.log("INTERACTION"))
            }
        }
	},
};