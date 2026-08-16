package com.fittrack.controller;

import com.fittrack.entity.Progress;
import com.fittrack.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @PostMapping
    public ResponseEntity<Progress> addProgress(Authentication authentication, @RequestBody Progress progress) {
        String email = authentication.getName();
        return ResponseEntity.ok(progressService.addProgress(email, progress));
    }

    @GetMapping
    public ResponseEntity<List<Progress>> getUserProgress(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(progressService.getUserProgress(email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgress(Authentication authentication, @PathVariable Long id) {
        String email = authentication.getName();
        progressService.deleteProgress(email, id);
        return ResponseEntity.ok().build();
    }
}
