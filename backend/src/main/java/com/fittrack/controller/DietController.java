package com.fittrack.controller;

import com.fittrack.entity.DietPlan;
import com.fittrack.service.DietService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/diet")
@RequiredArgsConstructor
public class DietController {

    private final DietService dietService;

    @PostMapping
    public ResponseEntity<DietPlan> saveDietPlan(Authentication authentication, @RequestBody DietPlan dietPlan) {
        String email = authentication.getName();
        return ResponseEntity.ok(dietService.saveDietPlan(email, dietPlan));
    }

    @GetMapping
    public ResponseEntity<List<DietPlan>> getUserDietPlans(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(dietService.getUserDietPlans(email));
    }

    @PutMapping("/{id}/rename")
    public ResponseEntity<DietPlan> renameDietPlan(Authentication authentication, @PathVariable Long id, @RequestBody Map<String, String> request) {
        String email = authentication.getName();
        String newName = request.get("name");
        return ResponseEntity.ok(dietService.renameDietPlan(email, id, newName));
    }
}
