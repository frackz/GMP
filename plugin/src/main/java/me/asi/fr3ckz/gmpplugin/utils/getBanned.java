package me.asi.fr3ckz.gmpplugin.utils;

import com.google.common.net.HttpHeaders;
import me.asi.fr3ckz.gmpplugin.GmpPlugin;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.UUID;

public class getBanned {

    private UUID uuid;

    private final CloseableHttpClient httpClient = HttpClients.createDefault();

    private GmpPlugin plugin;

    public getBanned(GmpPlugin plugin) {
        this.plugin = plugin;
    }


    public JSONObject getData(String uuid) throws Exception {

        HttpGet request = new HttpGet("https://frackz.xyz/gmp/data");

        // add request headers
        request.addHeader("auth", plugin.getConfig().getString("api-key"));
        request.addHeader("uuid", String.valueOf(uuid));
        request.addHeader(HttpHeaders.USER_AGENT, "Googlebot");

        try (CloseableHttpResponse response = httpClient.execute(request)) {

            // Get HttpResponse Status
            //System.out.println(response.getStatusLine().toString());

            HttpEntity entity = response.getEntity();
            Header headers = entity.getContentType();
            //System.out.println(headers);

            if (entity != null) {
                // return it as a String
                String result = EntityUtils.toString(entity);
                JSONParser parser = new JSONParser();
                JSONObject json = (JSONObject) parser.parse(result);
                //System.out.println(result);
                return json;
            }

        }

        return null;

    }

}
