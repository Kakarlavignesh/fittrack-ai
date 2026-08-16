package com.fittrack.controller;

import com.fittrack.dto.ChatRequest;
import com.fittrack.entity.User;
import com.fittrack.service.GeminiService;
import com.fittrack.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final GeminiService geminiService;
    private final UserService userService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody ChatRequest request) {
        String aiResponse = geminiService.generateContent(
                "You are an expert fitness and diet assistant. Answer this query concisely. " +
                "CRITICAL: Do NOT use LaTeX math formatting (like \\frac, \\times, or $...$). " +
                "Use simple human-readable plain text for any formulas (e.g., '10 * weight'). Query: " + request.getMessage()
        );
        return ResponseEntity.ok(Map.of("response", aiResponse));
    }

    @PostMapping("/generate-plan")
    public ResponseEntity<Map<String, String>> generatePlan(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);

        String prompt = String.format(
                "Generate a detailed fitness and diet plan for me. " +
                "My details: Age: %d, Gender: %s, Height: %.1f cm, Current Weight: %.1f kg, Target Weight: %.1f kg, " +
                "Goal: %s, Activity Level: %s. " +
                "Provide daily calories, protein recommendation, suggested meals, workout recommendation, and daily habits. " +
                "Format beautifully in markdown. CRITICAL: Do NOT use LaTeX math formatting (like \\frac, \\times, or $...$). " +
                "Use simple human-readable plain text for any formulas.",
                user.getAge(), user.getGender(), user.getHeight(), user.getCurrentWeight(), user.getTargetWeight(),
                user.getFitnessGoal(), user.getActivityLevel()
        );

        String aiResponse = geminiService.generateContent(prompt);
        return ResponseEntity.ok(Map.of("plan", aiResponse));
    }
}
