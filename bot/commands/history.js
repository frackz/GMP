//https://api.mojang.com/user/profiles/:uuid/names

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

    }
}