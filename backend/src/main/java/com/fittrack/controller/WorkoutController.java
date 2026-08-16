package com.fittrack.controller;

import com.fittrack.entity.Workout;
import com.fittrack.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;

    @PostMapping
    public ResponseEntity<Workout> addWorkout(Authentication authentication, @RequestBody Workout workout) {
        String email = authentication.getName();
        return ResponseEntity.ok(workoutService.addWorkout(email, workout));
    }

    @GetMapping
    public ResponseEntity<List<Workout>> getUserWorkouts(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(workoutService.getUserWorkouts(email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(Authentication authentication, @PathVariable Long id) {
        String email = authentication.getName();
        workoutService.deleteWorkout(email, id);
        return ResponseEntity.ok().build();
    }
}
