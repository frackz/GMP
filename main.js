const BotManager = require('./bot/bot')

const WebManager = require('./web/web')

const Database = require('better-sqlite3')

console.log("[ GMP ] Starting!")

const Object = {}

Object.db = new Database('data.sqlite')

// Setup DB
Object.db.exec("CREATE TABLE IF NOT EXISTS `keys` (`key` varchar(255) NOT NULL, `owner` varchar(255) NOT NULL, `reset` varchar(255) DEFAULT NULL, `disabled` boolean default 0)")
Object.db.exec("CREATE TABLE IF NOT EXISTS `bans` (`uuid` varchar(255) NOT NULL, `reason` varchar(255) NOT NULL, `proof` varchar(255) NOT NULL, `warning` varchar(255) NOT NULL, `date` varchar(255) NOT NULL)")
Object.db.exec("CREATE TABLE IF NOT EXISTS `reports` (`user` varchar(255) NOT NULL, `target` varchar(255) NOT NULL, `reason` varchar(255) NOT NULL, `proof` varchar(255) NOT NULL)")
Object.db.exec("CREATE TABLE IF NOT EXISTS `user` (`user` varchar(255) NOT NULL, `reportcn` varchar(255) NOT NULL)")

Object.config = require('./config.json')
function doIt() {
    const axios = require('axios');
    return axios.get('http://localhost:8080/gmp/data', {
        headers: {
            auth: "308f098a-68d4-486f-98f1-792eb5dc7884",
            uuid: "24488c5722a0492ab00c359b6b9875e0"
        }
    }).catch(error => {
    }).then(res => {
        console.log(res.data)
    })
}

setTimeout(doIt, 3000)


new BotManager({partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: 32767, disableMentions: 'everyone'},Object).run()

new WebManager(Object).run()