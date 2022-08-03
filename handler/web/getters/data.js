const hook = 'https://discord.com/api/webhooks/1004381844726370417/ga3Fpd3SRmCbcDmvElljXoLZRIhZvHN5t6Aim20RX24qs4ho1TRrdOtDTLWPxlRD-wx9'
const axios = require('axios')
module.exports = {
    route: '/gmp/data',
    async execute(req, res, db, config) {
        if (req.headers.auth == null) return res.json({auth: false, success: false, message: "Auth is null"})
        const api = db.prepare('SELECT * FROM `keys` WHERE `key` = ?').get(req.headers.auth)
        if (api == null) return res.json({auth: false, success:false, message: "Auth is not valid"})
        if (api.disabled == 1) return res.json({auth: false, success:false, message: "Auth is disabled"})

        if (req.headers.uuid == null) return res.json({auth: true, success: false, message: "UUID header is null"})
        const data = db.prepare('SELECT * FROM `bans` WHERE `uuid` = ?').get(req.headers.uuid)
        var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
        let embeds = [
            {
                title: "/data Route",
                color: 16774400,
                footer: {
                    text: "📅 "+new Date(Date.now()).toLocaleDateString()
                },
                fields: [
                    {
                        name: "IP",
                        value: "IP of user: "+ ip
                    },
                    {
                        name: "Data sent",
                        value: "UUID: **"+req.headers.uuid+'** AUTH: **'+req.headers.auth+'**'  
                    }
                ]
            }
        ]        

        let discorddata = JSON.stringify({ embeds });

        axios({
            method: "POST",
            url: hook,
            headers: { "Content-Type": "application/json" },
            data: discorddata,
        })
        return res.json({auth: true, success: true, data:data})
    }
}