module.exports = class Web {
    constructor(client) {
        this.db = client.db
        this.app = require('express')()
        this.config = client.config
        this.bot = client.bot
    }

    run() {
        const fs = require('fs'); 
        const https = require('https'); 

        https.createServer({cert: fs.readFileSync('cert/site.crt'), ca: fs.readFileSync('cert/site.ca-bundle'), key: fs.readFileSync('cert/key.key')}, this.app).listen(443);

        this.init()
    }

    init() {
        require('fs').readdirSync('./web/getters').forEach(f => {
            const name = require('./getters/'+f).route
            console.log('[ Web Handler ] Loaded route '+name+' on port 8080')
            this.app.get(name, (req, res) => {
                require('./getters/'+f).execute(req,res,this.db, this.config, this.bot)
            })
        })
    }
}