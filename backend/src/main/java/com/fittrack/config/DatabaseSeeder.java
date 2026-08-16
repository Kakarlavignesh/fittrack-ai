package com.fittrack.config;

import com.fittrack.entity.Progress;
import com.fittrack.entity.User;
import com.fittrack.entity.Workout;
import com.fittrack.repository.ProgressRepository;
import com.fittrack.repository.UserRepository;
import com.fittrack.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProgressRepository progressRepository;
    private final WorkoutRepository workoutRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println("Seeding database with demo data...");

            User demoUser = User.builder()
                    .name("Demo User")
                    .email("demo@fittrack.ai")
                    .password(passwordEncoder.encode("demo123"))
                    .age(28)
                    .gender("Male")
                    .height(180.0)
                    .currentWeight(82.5)
                    .targetWeight(75.0)
                    .fitnessGoal("Weight Loss")
                    .activityLevel("Moderate")
                    .build();

            userRepository.save(demoUser);

            // Seed some past progress data for the chart
            for (int i = 6; i >= 0; i--) {
                Progress p = Progress.builder()
                        .user(demoUser)
                        .weight(83.0 - (6 - i) * 0.1) // Gradually losing weight
                        .caloriesConsumed(2100 + (int)(Math.random() * 300))
                        .caloriesBurned(2500 + (int)(Math.random() * 400))
                        .steps(8000 + (int)(Math.random() * 4000))
                        .workoutCompleted(Math.random() > 0.3)
                        .notes(i == 0 ? "Felt great today!" : "Consistent progress.")
                        .recordedDate(LocalDate.now().minusDays(i))
                        .build();
                progressRepository.save(p);
            }

            Workout w1 = Workout.builder()
                    .user(demoUser)
                    .workoutName("Upper Body Power")
                    .workoutType("Strength Training")
                    .duration(45)
                    .caloriesBurned(320)
                    .workoutDate(LocalDate.now().minusDays(1))
                    .build();
            
            Workout w2 = Workout.builder()
                    .user(demoUser)
                    .workoutName("Morning Run 5k")
                    .workoutType("Cardio")
                    .duration(30)
                    .caloriesBurned(400)
                    .workoutDate(LocalDate.now().minusDays(2))
                    .build();

            workoutRepository.save(w1);
            workoutRepository.save(w2);
            
            System.out.println("Database seeded successfully.");
            System.out.println("Demo Login: demo@fittrack.ai / demo123");
        }
    }
}
