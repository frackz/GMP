const crypto = require('crypto');

module.exports = {
    data: {
        id: "reset",
        contain: false
    },
	async execute(client, interaction, config, db) {
        const data = db.prepare('SELECT * FROM `keys` WHERE `owner` = ?').get(interaction.user.id)
        if (data != null) {
            if (data.reset == null || data.reset < Date.now()) {
                const key = crypto.randomUUID()
                db.prepare('UPDATE `keys` SET `key` = ?, `reset` = ? WHERE `owner` = ?').run(
                    key,
                    Date.now()+1000*60*60*60*24,
                    interaction.user.id
                )
                return interaction.reply({
                embeds: [{
                    "title": "Your API key has now been reset.",
                    "description": "Your key has now been reset, and you are now in a cooldown.\n\nYou can only reset your API key once a day, to make sure that  users doesn't reset their code to often.\n\nIf a user other than you, are using your token without your consent and you are in a cooldown, disable your key using **/api**\n\nYour new key is: ||"+key+"||",
                    "color": 16506368
                }], ephemeral: true
                }).catch((err) => console.log("INTERACTION"))
            } else {
                const hours = Math.round((data.reset-Date.now()) / (1000*60*60*60))
                return interaction.reply({
                    embeds:[{
                        "title": "Hey buddy, slowdown!",
                        "description": "You can only change your code once a day.",
                        "color": 16506368,
                        "fields": [
                          {
                            "name": "But, but, why?",
                            "value": "So users can learn to protect their codes, and not just \"reset it\" every day."
                          },
                          {
                            "name": "But, but, a user has my key :(",
                            "value": "You can disable your key using **/api** and pressing the **Disable** button."
                          },
                          {
                            "name": "Okay... But how much time is left?",
                            "value": "You need to wait **"+hours+"** hours to be able reset your code again!"
                          }
                        ]
                    }],ephemeral: true
                }).catch((err) => console.log("INTERACTION"))
            }
        }
	},
};