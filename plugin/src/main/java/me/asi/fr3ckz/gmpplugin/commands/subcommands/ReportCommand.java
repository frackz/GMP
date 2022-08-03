package me.asi.fr3ckz.gmpplugin.commands.subcommands;

import me.asi.fr3ckz.gmpplugin.commands.SubCommands;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;

public class ReportCommand extends SubCommands {
    @Override
    public String getName() {
        return "Report";
    }

    @Override
    public String getDescription() {
        return "Get link to our discord server to report players";
    }

    @Override
    public String getSyntax() {
        return "/GMP report";
    }

    @Override
    public void perform(Player player, String[] args) {
        player.sendMessage(ChatColor.WHITE + "If you want to report a player, then join our discord and make a report request. Type frackz.xyz/gmp in a browser.");
    }
}
