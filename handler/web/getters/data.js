module.exports = {
    route: '/gmp/data',
    async execute(req, res, db, config) {
        if (req.headers.auth == null) return res.json({auth: false, success: false, message: "Auth is null"})
        const api = db.prepare('SELECT * FROM `keys` WHERE `key` = ?').get(req.headers.auth)
        if (api == null) return res.json({auth: false, success:false, message: "Auth is not valid"})
        if (api.disabled == 1) return res.json({auth: false, success:false, message: "Auth is disabled"})

        if (req.headers.uuid == null) return res.json({auth: true, success: false, message: "UUID header is null"})
        const data = db.prepare('SELECT * FROM `bans` WHERE `uuid` = ?').get(req.headers.uuid)
        return res.json({auth: true, success: true, data:data})
    }
}