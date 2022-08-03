package me.asi.fr3ckz.gmpplugin.listener;

import me.asi.fr3ckz.gmpplugin.GmpPlugin;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;

public class JoinListener implements Listener {

    private GmpPlugin plugin;

    public JoinListener(GmpPlugin plugin) {
        this.plugin = plugin;
    }

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent e) throws Exception {
        Player p = e.getPlayer();
        if (!p.hasPermission(plugin.getConfig().getString("staff-perm"))) {
            if (plugin.GetBanned.getData(String.valueOf(p.getUniqueId()).replaceAll("-",  "")).containsKey("data")){
                p.kickPlayer(ChatColor.translateAlternateColorCodes('&', "&8[ &6GMP &8] &fYou have been kicked from the server, due to being banned from &eGMP&f. Apply for unban on our Discord &fgo to the website. &efrackz.xyz/gmp"));

                for (Player player : Bukkit.getOnlinePlayers()) {
                    if (player.isOp()){
                        player.sendMessage(ChatColor.translateAlternateColorCodes('&', "&8[ &6GMP &8] &e" + p.getDisplayName() + " &ftried to join the server but failed because the player is banned."));
                    }
                }
            }
        }
        }
}
