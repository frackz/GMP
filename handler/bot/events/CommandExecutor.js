module.exports = {
    event: "interactionCreate",
    execute(client, interaction, config, db) {
        if (!interaction.isCommand()) return;
        const commands = client.commands
        if (commands[interaction.commandName] != null) {
            require('../commands/'+commands[interaction.commandName].file).execute(client, interaction, config, db)
        }
    }
}