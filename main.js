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

new BotManager({partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: 32767, disableMentions: 'everyone'},Object).run()

new WebManager(Object).run()