const axios = require('axios')

module.exports = {
    data: {
        "name": "unbankey",
        "description": "Unban a user from GMP API",
        "options": [
            {
            "type": 6,
            "name": "user",
            "description": "The user you want to unban",
            "required": true
            }
        ]
    },
    execute(client, interaction, config, db) {
        if (interaction.user.id != "734006395900264530" && interaction.user.id != "521047447053664256") {return interaction.reply({content: "No access", ephemeral: true}).catch(err => console.error("INTERACTION"))}
        const user = interaction.options.getUser('user')
        const data = db.prepare('SELECT * FROM `keyban` WHERE `user` = ?').get(user.id)
        if(data == null) {return interaction.reply({content: "User is not banned", ephemeral: true}).catch((err) => console.log("INTERACTION"))}
        db.prepare('DELETE FROM `keyban` WHERE `user` = ?').run(user.id)
        return interaction.reply({content: "User is now unbanned.", ephemeral: true}).catch((err) => console.log("INTERACTION"))
    }
}