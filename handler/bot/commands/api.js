const wait = require('node:timers/promises').setTimeout;
module.exports = {
    data: {
        name: "api",
        description: "Get your API key!"
    },
    async execute(client, interaction, config, db) {
        await interaction.deferReply({ephemeral: true})
        var data = db.prepare('SELECT * FROM `keys` WHERE `owner` = ?').get(interaction.user.id)
        var owned = false; if(data != null) {owned=true}
        var msg = ""; if (data != null) {msg="\n\nYour current API key is: ||"+data.key+"||"}

        // Enable / Disable
        var text = "🍄 Disable"; if(data != null && data.disabled == true){text='🌱 Enable'}
        var style = 4; if(text.includes('En')){style=3}
        interaction.editReply({
            embeds: [{
                "title": "Welcome to GMP API.",
                "description": "If you would like an API key, your account must be over 2 weeks old.\nYou can reset or disable your key if it is in bad use.\n\nIf you abuse our API, you will get banned from our discord server, and terminated from using our API.\n\nBy using our API, you also allow our rules as stated in #rules, if you break a rule, you can be banned from our server and API."+msg,
                "color": 16493568
            }],
            components: [
                {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "✨ Generate",
                            "style": 1,
                            "custom_id": "generate",
                            "disabled": owned
                        },
                        {
                            "type": 2,
                            "label": "🔍 Reset",
                            "style": 2,
                            "custom_id": "reset",
                            "disabled": !owned
                        },
                        {
                            "type": 2,
                            "label": text,
                            "style": style,
                            "custom_id": "disable",
                            "disabled": !owned
                        },
                    ]
        
                }
            ], ephemeral: true}).catch((err) => console.log(err))
    }
}