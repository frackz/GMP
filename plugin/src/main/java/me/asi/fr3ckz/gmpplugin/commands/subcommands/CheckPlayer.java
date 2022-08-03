package me.asi.fr3ckz.gmpplugin.commands.subcommands;

import com.google.common.net.HttpHeaders;
import me.asi.fr3ckz.gmpplugin.GmpPlugin;
import me.asi.fr3ckz.gmpplugin.commands.SubCommands;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;

public class CheckPlayer extends SubCommands {

    private GmpPlugin plugin;
    private final CloseableHttpClient httpClient = HttpClients.createDefault();

    public CheckPlayer(GmpPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public String getName() {
        return "checkplayer";
    }

    @Override
    public String getDescription() {
        return "Returns if player is banned from GMP or not";
    }

    @Override
    public String getSyntax() {
        return "/GMP checkplayer <player name>";
    }

    @Override
    public void perform(Player player, String[] args) {
        if (args.length > 1){
            HttpGet request = new HttpGet("https://api.mojang.com/users/profiles/minecraft/" + args[1]);
            try (CloseableHttpResponse response = httpClient.execute(request)) {

                HttpEntity entity = response.getEntity();

                if (entity != null) {
                    String result = EntityUtils.toString(entity);
                    JSONParser parser = new JSONParser();
                    JSONObject json = (JSONObject) parser.parse(result);
                    if (json == null) {return;}
                    try {
                        if(plugin.GetBanned.getData(String.valueOf(json.get("id"))).containsKey("data")) {
                            player.sendMessage(ChatColor.translateAlternateColorCodes('&', "&8[ &6GMP &8] &7This player &cis &7banned from &eGMP"));
                        } else {
                            player.sendMessage(ChatColor.translateAlternateColorCodes('&', "&8[ &6GMP &8] &7This player &ais mot &7banned from &eGMP"));
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            } catch (ClientProtocolException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
    }
}
