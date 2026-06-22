package backend.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GroqService {

    @Value("${grok.api.key}")
    private String apiKey;

    public String classifyComplaint(String complaint) {

        try {

            String url =
                    "https://api.groq.com/openai/v1/chat/completions";

            String body = """
            {
              "model": "llama-3.3-70b-versatile",
              "messages": [
                {
                  "role": "system",
                  "content": "Classify the complaint and return only JSON with category, department and priority."
                },
                {
                  "role": "user",
                  "content": "%s"
                }
              ]
            }
            """.formatted(
                    complaint.replace("\"", "\\\"")
            );

            HttpHeaders headers =
                    new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_JSON);

            headers.setBearerAuth(
                    apiKey);

            HttpEntity<String> request =
                    new HttpEntity<>(
                            body,
                            headers);

            RestTemplate restTemplate =
                    new RestTemplate();

            
            String response =
                    restTemplate.postForObject(
                            url,
                            request,
                            String.class);

            ObjectMapper mapper =
                    new ObjectMapper();

            JsonNode root =
                    mapper.readTree(response);

            String content =
                    root.path("choices")
                        .get(0)
                        .path("message")
                        .path("content")
                        .asText();

            return content;

        } catch (Exception e) {

            e.printStackTrace();

            return e.getMessage();
        }
    }
}