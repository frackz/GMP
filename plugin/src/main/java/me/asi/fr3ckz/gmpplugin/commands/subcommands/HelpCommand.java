package me.asi.fr3ckz.gmpplugin.commands.subcommands;

import me.asi.fr3ckz.gmpplugin.GmpPlugin;
import me.asi.fr3ckz.gmpplugin.commands.SubCommands;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;

public class HelpCommand extends SubCommands {

    private GmpPlugin plugin;

    public HelpCommand(GmpPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public String getName() {
        return "help";
    }

    @Override
    public String getDescription() {
        return "Get all commands within the gmp plugin";
    }

    @Override
    public String getSyntax() {
        return "/GMP Help";
    }

    @Override
    public void perform(Player player, String[] args) {

        if (player.hasPermission(plugin.getConfig().getString("staff-perm"))) {
            player.sendMessage(ChatColor.DARK_GRAY + "-------------------------------");
            player.sendMessage(ChatColor.YELLOW + "--> " + ChatColor.WHITE + " /gmp checkplayer to check a player");
            player.sendMessage(ChatColor.YELLOW + "--> " + ChatColor.WHITE + " /gmp help check all commands");
            player.sendMessage(ChatColor.YELLOW + "--> " + ChatColor.WHITE + " /gmp reload reloads the config");
            player.sendMessage(ChatColor.YELLOW + "--> " + ChatColor.WHITE + " /gmp report for instructions to report a player");
            player.sendMessage(ChatColor.DARK_GRAY + "-------------------------------");
        }


    }
}
