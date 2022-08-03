package me.asi.fr3ckz.gmpplugin.commands.subcommands;

import me.asi.fr3ckz.gmpplugin.GmpPlugin;
import me.asi.fr3ckz.gmpplugin.commands.SubCommands;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;

public class ReloadCommand extends SubCommands {

    private GmpPlugin plugin;
    public ReloadCommand(GmpPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public String getName() {
        return "reload";
    }

    @Override
    public String getDescription() {
        return "reload the config";
    }

    @Override
    public String getSyntax() {
        return "/gmp reload";
    }

    @Override
    public void perform(Player player, String[] args) {
        if (player.isOp()) {
            plugin.reloadConfig();
            player.sendMessage(ChatColor.GREEN + "Reloaded the config sucessfully");
        }
    }
}
