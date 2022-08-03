const axios = require('axios')

module.exports = {
    data: {
        "name": "unban",
        "description": "Unban a user from GMP",
        "options": [
          {
            "type": 3,
            "name": "username",
            "description": "The username of the user.",
            "required": true
          }
        ]
    },
    execute(client, interaction, config, db) {
        if (interaction.user.id != "734006395900264530" && interaction.user.id != "521047447053664256") {return interaction.reply({content: "No access", ephemeral: true}).catch(err => console.error("INTERACTION"))}
        const username = interaction.options.getString('username')
        axios.get('https://api.mojang.com/users/profiles/minecraft/'+username).then((res) => {
            if (res.data == '') {return interaction.reply({content: "User does not exist.", ephemeral: true}).catch((err) => console.log("INTERACTION"))}
            const data = db.prepare('SELECT * FROM `bans` WHERE `uuid` = ?').get(res.data.id)
            if(data == null) {return interaction.reply({content: "User is not banned", ephemeral: true}).catch((err) => console.log("INTERACTION"))}
            db.prepare('DELETE FROM `bans` WHERE `uuid` = ?').run(res.data.id)
            return interaction.reply({content: "User is now unbanned.", ephemeral: true}).catch((err) => console.log("INTERACTION"))

        })
    }
}