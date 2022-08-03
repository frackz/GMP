const crypto = require('crypto');

module.exports = {
    data: {
        id: "generate",
        contain: false
    },
	async execute(client, interaction, config, db) {
        const data = db.prepare('SELECT * FROM `keys` WHERE `owner` = ?').get(interaction.user.id)
        if (data == null) {

            const key = crypto.randomUUID()
            db.prepare("INSERT INTO `keys` (`key`, `owner`, `reset`, `disabled`) VALUES (?, ?, ?, ?)").run(
                key,
                interaction.user.id,
                null,
                0
            );

            return interaction.reply({
                embeds:
                [{
                    "title": "You got your new API key!",
                    "description": "Congratulations, you've got your API key, you can now mess around with our API.\n\nRemember that using our API with bad intentions will get you banned from our API and server.\n\nIf you would like to use this API on larger servers, please contact us using tickets if you would like to use our API with higher request limits.\n\nYour new API key is: ||"+key+"||, please use **/api** again, if you want to reset or disable your key.",
                    "color": 16506368
                }],
                components: [
                    {
                        "type": 1,
                        "components": [
                            {
                                "type": 2,
                                "label": "✨ API",
                                "style": 3,
                                "custom_id": "api-cmd"
                            }
                        ]
            
                    }
                ], ephemeral: true}).catch((err) => console.error(err))
        } else {
            console.log("Already generated")
        }
	},
};