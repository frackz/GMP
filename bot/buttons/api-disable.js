module.exports = {
    data: {
        id: "disable",
        contain: false
    },
	async execute(client, interaction, config, db) {
        const data = db.prepare('SELECT * FROM `keys` WHERE `owner` = ?').get(interaction.user.id)
        if (data != null) {
            console.log("DIASBLE")
        }
	},
};