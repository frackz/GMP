//https://api.mojang.com/user/profiles/:uuid/names
const axios = require('axios')
module.exports = {
    data: {
        "name": "history",
        "description": "Get name history of user",
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
            if (res.data == '') {return interaction.reply({content: "User does not exist.", ephemeral: true})}
            axios.get('https://api.mojang.com/user/profiles/'+res.data.id+'/names').then((history) => {
                if (history.data == null) {return interaction.reply({content: "Cannot find history", ephemeral: true})}
                const data = history.data
                var names = ''
                for (var i = 0; i < data.length; i++) {
                    const currentdata = data[i]
                    if (!currentdata.changedToAt) {
                        names=currentdata.name+'\n'
                    } else {
                        names=names+currentdata.name+' - '+new Date(currentdata.changedToAt).toLocaleDateString()+'\n'
                    }
                }
                return interaction.reply({embeds:[{
                    "title": "Name history...",
                "description": "The user had all of these names...\n``"+names+"``",
                "color": 16774400}], ephemeral: true})
            }).catch((err) => console.error)
        }).catch((err) => console.error)
    }
}