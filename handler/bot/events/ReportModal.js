const axios = require('axios')
module.exports = {
    event: "interactionCreate",
    execute(client, interaction, config, db) {
        if (interaction.type !== require('discord.js').InteractionType.ModalSubmit) return;
        
        if (interaction.customId === 'reportuser') {
            const user = db.prepare('SELECT * FROM `user` WHERE `user` = ?').get(interaction.user.id)
            if (user == null || user.reportcn < Date.now()) {
                const username = interaction.fields.getTextInputValue('username');
                const reason = interaction.fields.getTextInputValue('reason');
                const proof = interaction.fields.getTextInputValue('proof');
                axios.get('https://api.mojang.com/users/profiles/minecraft/'+username).then((res) => {
                    if (res.data == '') {return interaction.reply({content: "User does not exist.", ephemeral: true})}
                    const hasBeenReported = db.prepare('SELECT * FROM `reports` WHERE `user` = ? AND `target` = ?').get(interaction.user.id, res.data.id)
                    if (hasBeenReported != null) {return interaction.reply({content: "You've already reported this person!", ephemeral: true})}    
                    db.prepare("INSERT INTO `reports` (`user`, `target`, `reason`, `proof` ) VALUES (?, ?, ?, ?)").run(
                        interaction.user.id,
                        res.data.id,
                        reason,
                        proof
                    );
                    if(user != null) {
                        db.prepare('UPDATE `user` SET `reportcn` = ? WHERE `user` = ?').run(Date.now()+(60*1000), interaction.user.id)
                    } else {
                        db.prepare("INSERT INTO `user` (`user`, `reportcn`) VALUES (?, ?)").run(
                            interaction.user.id,
                            Date.now()+(60*1000)
                        );
                    }
                    const reports = client.channels.cache.get('1004139467398971453');
                    reports.send({
                        embeds:[{
                            "title": "A new report!",
                            "description": "There is a new report, made by user <@"+interaction.user.id+">.\nThis is the information:\n**Target**: "+res.data.id+" / "+username+"\n**Reason**: "+reason+"\n**Proof**: "+proof,
                            "color": 8060672
                        }],
                        components:[
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "type": 2,
                                        "label": "✨ Accept",
                                        "style": 3,
                                        "custom_id": "accept*"+interaction.user.id+'*'+res.data.id
                                    },
                                    {
                                        "type": 2,
                                        "label": "🍄 Decline",
                                        "style": 4,
                                        "custom_id": "decline*"+interaction.user.id+'*'+res.data.id
                                    }
                                ]
                    
                            }
                        ]
                    })

                    return interaction.reply({
                        embeds:[{
                            "title": "Success, a good report!",
                            "description": "The player with the name **"+username+"** has now been reported to GMP.\n\nYou will receive a response to your reporting within a few days.\n\nIf this is a spam report you will receive a ban.",
                            "color": 16774400
                        }], ephemeral: true
                    })
                })
            } else {
                return interaction.reply({embeds:[{
                    "title": "Slow down on those reports!",
                    "description": "You can only send a report each minute to stop spamming.\n\nPlease wait those seconds and we hope you will report, and make Minecraft\na better place...",
                    "color": 16493568
                }], ephemeral: true})
            }
        }
    }
}