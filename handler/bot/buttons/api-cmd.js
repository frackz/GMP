module.exports = {
    data: {
        id: "api-cmd",
        contain: false
    },
	async execute(client, interaction, config, db) {
        require('../commands/api').execute(client, interaction, config, db)
	},
};