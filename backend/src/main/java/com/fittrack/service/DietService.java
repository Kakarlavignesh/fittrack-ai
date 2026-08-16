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
}
