const axios = require('axios')

module.exports = {
    data: {
        "name": "setup",
        "description": "Setup the report forms"
    },
    execute(client, interaction, config, db) {
        return interaction.channel.send({embeds:[{
            "title": "Reporting a user.",
            "description": "Welcome to our reporting page, here you can report people, and maybe get them banned from GMP if we think the person is breaking a rule.\n\nWhen you report a person, you automatically agree to our set of rules / tos.\n\nYou can also use our [report site](https://frackz.xyz/gmp/report) to report people, for those who would rather use a page.\n\nYou can make a report every minute or you can use our API using **/api** and read <#1003701237075693731>.\n\nIf you abuse access to report-api or report forms you will be banned.",
            "color": 16774400
        }], components:[
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "✨ Report a user",
                        "style": 1,
                        "custom_id": "report"
                    },
                    {
                        "type": 2,
                        "label": "🔍 My Reports",
                        "style": 2,
                        "custom_id": "reports"
                    }
                ]
    
            }
        ]})
    }
}