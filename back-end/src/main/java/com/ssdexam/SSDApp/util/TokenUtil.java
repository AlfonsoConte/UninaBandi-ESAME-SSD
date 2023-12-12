package com.ssdexam.SSDApp.util;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class TokenUtil {

	public String getIdFromToken(String token) {
		
		String[] pieces = token.split("\\.");
        String b64payload = pieces[1];
        try {
            String jsonString = new String(Base64.decodeBase64(b64payload), "UTF-8");
            ObjectMapper mapper = new ObjectMapper();
            JsonNode actualObj = mapper.readTree(jsonString);
            String IdToken = actualObj.get("sub").asText();

        return IdToken;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
           
        }
        return "-1";
    }
	

}
