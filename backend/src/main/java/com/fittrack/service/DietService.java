package com.fittrack.service;

import com.fittrack.entity.DietPlan;
import com.fittrack.entity.User;
import com.fittrack.repository.DietPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DietService {
    private final DietPlanRepository dietPlanRepository;
    private final UserService userService;

    public DietPlan saveDietPlan(String email, DietPlan dietPlan) {
        User user = userService.getUserByEmail(email);
        dietPlan.setUser(user);
        return dietPlanRepository.save(dietPlan);
    }

    public List<DietPlan> getUserDietPlans(String email) {
        User user = userService.getUserByEmail(email);
        return dietPlanRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public DietPlan renameDietPlan(String email, Long id, String newName) {
        User user = userService.getUserByEmail(email);
        DietPlan plan = dietPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Diet Plan not found"));
        
        if (!plan.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized: You do not have permission to rename this plan.");
        }
        
        plan.setName(newName);
        return dietPlanRepository.save(plan);
    }
}
