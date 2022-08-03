const { readdirSync}= require("fs");
module.exports = class LoadCommands {
    constructor(client) {
        this.dir = "bot/buttons/"
        this.client = client
        this.buttonlist = client.buttons
    }
    

    load() {
        readdirSync(this.dir).forEach(e => {
            if (!e.endsWith(".js")) return;
            const event = require(`../../${this.dir}${e}`);
            console.log('[ Button Loader ] Loaded button ' + event.data.id)

            this.buttonlist[event.data.id] = {
                file: e,
                contain: event.data.contain            
            }
        })
    }
}