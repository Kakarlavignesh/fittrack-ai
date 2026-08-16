package com.fittrack.service;

import com.fittrack.entity.User;
import com.fittrack.entity.Workout;
import com.fittrack.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutService {
    private final WorkoutRepository workoutRepository;
    private final UserService userService;

    public Workout addWorkout(String email, Workout workout) {
        User user = userService.getUserByEmail(email);
        workout.setUser(user);
        if (workout.getWorkoutDate() == null) {
            workout.setWorkoutDate(LocalDate.now());
        }
        return workoutRepository.save(workout);
    }

    public List<Workout> getUserWorkouts(String email) {
        User user = userService.getUserByEmail(email);
        return workoutRepository.findByUserIdOrderByWorkoutDateDesc(user.getId());
    }

    public void deleteWorkout(String email, Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workout not found"));
        
        if (!workout.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException("Not authorized to delete this workout");
        }
        
        workoutRepository.delete(workout);
    }
}
