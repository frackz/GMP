package me.asi.fr3ckz.gmpplugin.commands;

import com.mojang.datafixers.types.templates.Check;
import me.asi.fr3ckz.gmpplugin.GmpPlugin;
import me.asi.fr3ckz.gmpplugin.commands.subcommands.CheckPlayer;
import me.asi.fr3ckz.gmpplugin.commands.subcommands.HelpCommand;
import me.asi.fr3ckz.gmpplugin.commands.subcommands.ReloadCommand;
import me.asi.fr3ckz.gmpplugin.commands.subcommands.ReportCommand;
import org.apache.logging.log4j.core.tools.picocli.CommandLine;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;

public class CommandManager implements CommandExecutor {

    private ArrayList<SubCommands> subcommands = new ArrayList<>();
    private GmpPlugin plugin;

    public CommandManager(GmpPlugin plugin) {
        this.plugin = plugin;
        subcommands.add(new CheckPlayer(plugin));
        subcommands.add(new HelpCommand(plugin));
        subcommands.add(new ReportCommand());
        subcommands.add(new ReloadCommand(plugin));
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {

        if (sender instanceof Player) {
            Player p = (Player) sender;



            if (args.length > 0) {
                for (int i = 0; i < getSubcommands().size(); i++) {
                    if (args[0].equalsIgnoreCase(getSubcommands().get(i).getName())){
                        getSubcommands().get(i).perform(p, args);
                    }
                }
            } else {
                plugin.helpCommand.perform(p, args);
            }
        }

        return true;
    }

    public ArrayList<SubCommands> getSubcommands() {
        return subcommands;
    }
}
