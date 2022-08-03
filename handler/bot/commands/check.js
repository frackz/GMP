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
        const username = interaction.options.getString('username');

        axios.get('https://api.mojang.com/users/profiles/minecraft/'+username).then((res) => {
            if (res.data == '') {return interaction.reply({content: "User does not exist.", ephemeral: true}).catch((err) => console.error(err))}
            const data = db.prepare('SELECT * FROM `bans` WHERE `uuid` = ?').get(res.data.id)
            if (data != null) {
                return interaction.reply({embeds:[
                    {
                        "title": "Sorry, but the user is banned... :(",
                        "description": "The user **"+username+"** is banned from using GMP with warning **"+data.warning+"**\nUser **"+username+"** was banned on `"+new Date(Math.round(data.date)).toLocaleDateString().replaceAll('.','/')+"`\nThe reason for the ban is **"+data.reason+"**, the proof provided is:\n```"+data.proof+"```\nThe user can apply for unban, the higher warning you have, the lower is the chance.",
                        "color": 16774400
                    }
                ], ephemeral: true}).catch((err) => console.error(err))
            } else {
                return interaction.reply({content: "User **"+username+'** is not banned!', ephemeral: true}).catch((err) => console.error(err))
            }
        }).catch((err) => console.error)

    }
}