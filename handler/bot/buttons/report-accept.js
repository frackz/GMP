const axios = require('axios')
module.exports = {
    data: {
        id: "accept*",
        contain: true
    },
	async execute(client, interaction, config, db) {
        const splitted = interaction.customId.split("*")
        const user = splitted[1]
        const target = splitted[2]
        const report = db.prepare('SELECT * FROM `reports` WHERE `user` = ? AND `target` = ?').get(
            user,
            target
        )
        if (report == null) {return interaction.reply({content: "The report doens't exist.", ephemeral: true}).catch((err) => console.log("INTERACTION"))}
        const res = await axios({url: 'https://api.mojang.com/user/profiles/'+target+'/names',method: 'GET'});
        await interaction.reply({content: "The report has been accepted!", ephemeral: true}).catch((err) => console.log("INTERACTION"))
        
        db.prepare('DELETE FROM `reports` WHERE `user` = ? AND `target` = ?').run(user, target)
        db.prepare("INSERT INTO `bans` (`uuid`, `reason`, `proof`, `warning`, `date`) VALUES (?, ?, ?, ?, ?)").run(
            target,
            report.reason,
            report.proof,
            '1',
            Date.now()
        );

        const userg = interaction.guild.members.cache.get(user);
        if (userg == null) {return interaction.followUp({content: "User is not found, cannot DM", ephemeral: true})}
        var name = 'Cannot find, sorry'; if (res.data != null) {name=res.data[res.data.length-1].name}
        
        try {
            userg.send({
                embeds:[{
                    "title": "Report accepted!",
                    "description": "Your report against **"+name+"** has been accepted!",
                    "color": 16774400
                }]
            })
        } catch {
            interaction.followUp({content: "User's dm is not open", ephemeral: true})
        }
	}
};