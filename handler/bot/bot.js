const Discord = require('discord.js')

// Loaders
const EventLoader = require('./handlers/EventHandler')
const CommandLoader = require('./handlers/CommandHandler')
const ButtonHandler = require("./handlers/ButtonHandler.js")

module.exports = class BotManager extends Discord.Client {
    constructor(options, client) {
        super(options)

        this.commands = {}
        this.buttons = {}
        this.db = client.db
        this.config = client.config
        this.server = client.server
    }

    run() {
        this.on('ready', () => {
            this.user.setPresence({
                activities: [{ name: `punishing`, type: Discord.ActivityType.Watching }],
                status: 'online',
            });
        })
        new EventLoader(this).load()
        new CommandLoader(this).load()
        new ButtonHandler(this).load()

        this.login(this.config.bot.token)
    }
    get() {return this}
}