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
        this.app.get("/gmp/api/banned", (req, res) => {
            const uuid = req.headers.uuid
            if (uuid == null) {return res.json({success: false, message: "UUID is invalid."})}
        })
    }
}