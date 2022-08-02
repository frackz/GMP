const axios = require('axios')

module.exports = {
    data: {
        "name": "check",
        "description": "Check if user is banned from GMP.",
        "options": [
            {
                "type": 3,
                "name": "username",
                "description": "Username of the user you want to check.",
                "required": true
            }
        ]
    },
    execute(client, interaction, config, db) {
        //const data = db.prepare('SELECT * FROM `bans` WHERE `owner` = ?').get(interaction.user.id)

        const username = interaction.options.getString('username');

        axios.get('https://api.mojang.com/users/profiles/minecraft/'+username).then((res) => {
            if (res.data == '') {return interaction.reply({content: "User does not exist.", ephemeral: true})}
            const data = db.prepare('SELECT * FROM `bans` WHERE `uuid` = ?').get(res.data.id)
            if (data == null) {
                return interaction.reply({content: "User **"+username+'** is not banned!', ephemeral: true})
            } else {
                return interaction.reply({content: "User **"+username+'** is banned!', ephemeral: true})
            }
        }).catch((err) => console.error)

    }
}