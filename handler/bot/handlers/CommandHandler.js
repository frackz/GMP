const { Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')

module.exports = class CommandHandler {
    constructor(client) {
        this.config = client.config
        this.db = client.db
        this.client = client
        this.commands = client.commands
    }

    load() {
        const rest = new REST({ version: '10' }).setToken(this.config.bot.token)
        var data = []
        require('fs').readdirSync('bot/commands').forEach(f => {
            if (!f.endsWith(".js")) {return}
            const e = require('../commands/'+f)
            this.commands[e.data.name] = {
                file: f
            }
            data.push(e.data)
            console.log("[ GMP ] Loaded command /"+e.data.name)
        })
        rest.put(Routes.applicationCommands(this.config.bot.id, '1002311893014286446'), {body: data})
            .then(() => console.log("[ GMP ] Completed all commands"))
            .catch(console.error)
    }
}