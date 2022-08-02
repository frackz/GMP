module.exports = class EventHandler {
    constructor(client) {
        this.config = client.config
        this.db = client.db
        this.client = client
    }

    load() {
        require('fs').readdirSync('bot/events').forEach(f => {
            if (!f.endsWith(".js")) {return}
            const e = require('../events/'+f)
            this.client.on(e.event, (...args) => {
                e.execute(this.client, ...args, this.config, this.db)
            })
        })
    }
}