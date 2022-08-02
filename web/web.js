module.exports = class Web {
    constructor(client) {
        this.db = client.db
        this.app = require('express')()
        this.config = client.config
    }

    run() {
        this.app.listen(8080, () => {
            console.log("[ Web ] Web running on port 8080")
        })
        this.init()
    }

    init() {
        require('fs').readdirSync('./web/getters').forEach(f => {
            const name = require('./getters/'+f).route
            console.log('[ Web Handler ] Loaded route '+name+' on port 8080')
            this.app.get(name, (req, res) => {
                require('./getters/'+f).execute(req,res,this.db, this.config)
            })
        })
    }
}