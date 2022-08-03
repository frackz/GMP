module.exports = {
    route: '/gmp/data',
    async execute(req, res, db, config, client) {
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
                        value: "IP of user: "+ ip.replace('::ffff:','')
                    },
                    {
                        name: "Data sent",
                        value: "UUID: **"+req.headers.uuid+'** AUTH: **'+req.headers.auth+'**'  
                    }
                ]
            }
        ]        
        const reports = client.guilds.cache.get("970410178270871572").channels.cache.get('1004139474747408455');
        reports.send({embeds:embeds, components:[
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "✨ Ban",
                        "style": 4,
                        "custom_id": "ban*"+req.headers.auth
                    }
                ]
            }
        ]})        
        return res.json({auth: true, success: true, data:data})
    }
}