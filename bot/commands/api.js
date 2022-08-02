module.exports = {
    data: {
        name: "api",
        description: "Get your API key!"
    },
    execute(client, interaction, config, db) {
        //const createdAt = interaction.user.createdAt
        //if(Date.now()-createdAt > 1000*60*60*24*7*2)
        const data = db.prepare('SELECT * FROM `keys` WHERE `owner` = ?').get(interaction.user.id)

        var owned = false; if(data != null) {owned=true}
        var key = "None"; if(owned == true){key=data.key}
        var msg = ""; if (key!="None") {msg="\n\nYour current API key is: ||"+key+"||"}

        // Enable / Disable
        var text = "🍄 Disable"; if(data != null && data.disabled == true){text='🌱 Enable'}
        var style = 4; if(text.includes('En')){style=3}
        
        return interaction.reply({
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
            ], ephemeral: true})
    }
}