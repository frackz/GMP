package me.asi.fr3ckz.gmpplugin.utils;

import com.google.common.net.HttpHeaders;
import me.asi.fr3ckz.gmpplugin.GmpPlugin;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.bukkit.Bukkit;
import org.bukkit.util.Consumer;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.IOException;

public class UpdateChecker {

    private GmpPlugin plugin;
    private final CloseableHttpClient httpClient = HttpClients.createDefault();

    public UpdateChecker(GmpPlugin plugin) {
        this.plugin = plugin;
    }

    public String getLatestVersion() {
        HttpGet request = new HttpGet("https://frackz.xyz/gmp/version");
        try (CloseableHttpResponse response = httpClient.execute(request)) {
            HttpEntity entity = response.getEntity();

            if (entity != null) {
                // return it as a String
                String result = EntityUtils.toString(entity);
                return result;
            }

        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
