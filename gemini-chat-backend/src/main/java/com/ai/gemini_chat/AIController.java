package com.ai.gemini_chat;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/qna")
public class AIController {

    private final QnAService qnAService;

    @PostMapping("/ask")
    public ResponseEntity<String> askQuestion(@RequestBody Map<String, String> payload) {
        String userInput = payload.get("question");

        // Structured prompt for AI to refine the user's input
        String optimizedPrompt = "You are a professional AI prompt optimizer. Your job is to take the user's vague or unclear input and enhance it by:\n"
                + "Please Don't add introductory or closing statements."
                + "1. Understanding the user's intent from the given prompt.\n"
                + "2. Identifying missing details and making the prompt more specific.\n"
                + "3. Structuring the prompt clearly for AI tools like ChatGPT or Gemini.\n"
                + "4. Ensuring the prompt is optimized to get an accurate response.\n\n"
                + "User's Input: \"" + userInput + "\"\n\n"
                + "Provide an optimized and detailed version of the user's input.";

        // Send the refined request to the AI service
        String refinedPrompt = qnAService.getAnswer(optimizedPrompt);

        return ResponseEntity.ok(refinedPrompt);
    }
}
