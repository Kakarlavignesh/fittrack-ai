package com.fittrack.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    private final WebClient webClient;
    private final String geminiApiKey;
    private final String geminiApiUrl;
    private final String openRouterApiKey;
    private final String openRouterApiUrl;
    private final String groqApiKey;
    private final String groqApiUrl;

    public GeminiService(WebClient.Builder webClientBuilder,
                         @Value("${gemini.api.url}") String geminiApiUrl,
                         @Value("${gemini.api.key}") String geminiApiKey,
                         @Value("${openrouter.api.url}") String openRouterApiUrl,
                         @Value("${openrouter.api.key}") String openRouterApiKey,
                         @Value("${groq.api.url}") String groqApiUrl,
                         @Value("${groq.api.key}") String groqApiKey) {
        this.webClient = webClientBuilder.build();
        this.geminiApiUrl = geminiApiUrl;
        this.geminiApiKey = geminiApiKey;
        this.openRouterApiUrl = openRouterApiUrl;
        this.openRouterApiKey = openRouterApiKey;
        this.groqApiUrl = groqApiUrl;
        this.groqApiKey = groqApiKey;
    }

    public String generateContent(String prompt) {
        try {
            return callGemini(prompt);
        } catch (Exception e1) {
            System.err.println("Gemini failed, falling back to OpenRouter: " + e1.getMessage());
            try {
                return callOpenRouterFallback(prompt);
            } catch (Exception e2) {
                System.err.println("OpenRouter failed, falling back to Groq: " + e2.getMessage());
                return callGroqFallback(prompt);
            }
        }
    }

    private String callGemini(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        String responseStr = webClient.post()
                .uri(geminiApiUrl)
                .header("x-goog-api-key", geminiApiKey)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(Mono.just(requestBody), Map.class)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseStr);
            return root.path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Gemini response: " + e.getMessage());
        }
    }

    private String callOpenRouterFallback(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "model", "google/gemini-3.7-flash",
                "max_tokens", 8192,
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                )
        );

        String responseStr = webClient.post()
                .uri(openRouterApiUrl)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + openRouterApiKey)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(Mono.just(requestBody), Map.class)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseStr);
            return root.path("choices").get(0)
                    .path("message").path("content").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate content from OpenRouter fallback: " + e.getMessage());
        }
    }

    private String callGroqFallback(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "model", "llama-3.3-70b-versatile",
                "max_tokens", 8192,
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                )
        );

        String responseStr = webClient.post()
                .uri(groqApiUrl)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + groqApiKey)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(Mono.just(requestBody), Map.class)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseStr);
            return root.path("choices").get(0)
                    .path("message").path("content").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate content from Groq fallback: " + e.getMessage());
        }
    }
}
