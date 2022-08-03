module.exports = {
    data: {
        id: "ban*",
        contain: true
    },
	async execute(client, interaction, config, db) {
        const key = interaction.customId.split("*")[1]
        const data = db.prepare('SELECT * FROM `keys` WHERE `key` = ?').get(key)
        if (data == undefined) {return interaction.reply({content: "API key doesn't exist.", ephemeral: true}).catch(err => console.log("INTERACTION"))}
        console.log(data)
        db.prepare('INSERT INTO `keyban` (`user`) VALUES (?)').run(data.owner)
        db.prepare('DELETE FROM `keys` WHERE `key` = ?').run(key)

        interaction.reply({content: "User has now been banned!", ephemeral: true})
	},
};