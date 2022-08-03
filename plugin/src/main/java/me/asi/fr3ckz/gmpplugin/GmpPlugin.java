package me.asi.fr3ckz.gmpplugin;

import me.asi.fr3ckz.gmpplugin.commands.CommandManager;
import me.asi.fr3ckz.gmpplugin.commands.subcommands.CheckPlayer;
import me.asi.fr3ckz.gmpplugin.commands.subcommands.HelpCommand;
import me.asi.fr3ckz.gmpplugin.commands.subcommands.ReloadCommand;
import me.asi.fr3ckz.gmpplugin.listener.JoinListener;
import me.asi.fr3ckz.gmpplugin.utils.UpdateChecker;
import me.asi.fr3ckz.gmpplugin.utils.getBanned;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

import java.sql.SQLOutput;
import java.util.UUID;

public final class GmpPlugin extends JavaPlugin {

    public getBanned GetBanned;
    public CommandManager cmdManager;
    public CheckPlayer checkPlayer;
    public HelpCommand helpCommand;
    public ReloadCommand reloadCommand;
    public UpdateChecker updateChecker;

    @Override
    public void onEnable() {
        helpCommand = new HelpCommand(this);
        GetBanned = new getBanned(this);
        cmdManager = new CommandManager(this);
        checkPlayer = new CheckPlayer(this);
        reloadCommand = new ReloadCommand(this);
        updateChecker = new UpdateChecker(this);

        Bukkit.getServer().getPluginManager().registerEvents(new JoinListener(this), this);
        getCommand("gmp").setExecutor(new CommandManager(this));

        getConfig().options().copyDefaults();
        saveDefaultConfig();

        System.out.println("-----------------------");
        System.out.println("GMP HAS STARTED");
        if (!updateChecker.getLatestVersion().contains("1.0")) {
            System.out.println("GMP: You are on an outdated version of GMP");
        }
        System.out.println("-----------------------");

    }

    @Override
    public void onDisable() {

    }

}
