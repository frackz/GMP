const axios = require('axios')
module.exports = {
    data: {
        id: "reports",
        contain: false
    },
	async execute(client, interaction, config, db) {
        const data = db.prepare('SELECT * FROM `reports` WHERE `user` = ?').all(interaction.user.id)
        if (Object.keys(data).length === 0) {return interaction.reply({
            embeds:[{
                "title": "You have no reports...",
                "description": "You have no reports we can show you.\n\nIf you would like to report a person, you can read the message above or just press **Report a user**.",
                "color": 16493568
            }], ephemeral: true
        })}        

        var creports = ''
        for (var i = 0; i < data.length; i++) {
            const currentData = data[i]
            const res = await axios({
                url: 'https://api.mojang.com/user/profiles/'+currentData.target+'/names',
                method: 'GET'
            });
            if (res.data == null) {creports=creports+'ERROR - '+ currentData.target} else {
                creports=creports+res.data[res.data.length-1].name+' - '+currentData.reason+' - '+currentData.proof+'\n'
            }
        }
        return interaction.reply({
            embeds:[{
                "title": "Hey, here is your reports!",
                "description": "It looks like you have some reporting going on. Let's take a look at it. :)\n\nYour current reports.\n```"+creports+"```",
                "color": 16774400
            }], ephemeral: true
        })
	}
};