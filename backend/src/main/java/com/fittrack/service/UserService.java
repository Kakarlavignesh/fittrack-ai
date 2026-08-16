package com.fittrack.service;

import com.fittrack.dto.UserProfileUpdateDTO;
import com.fittrack.entity.User;
import com.fittrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User updateUserProfile(String email, UserProfileUpdateDTO dto) {
        User user = getUserByEmail(email);
        
        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getAge() != null) user.setAge(dto.getAge());
        if (dto.getGender() != null) user.setGender(dto.getGender());
        if (dto.getHeight() != null) user.setHeight(dto.getHeight());
        if (dto.getCurrentWeight() != null) user.setCurrentWeight(dto.getCurrentWeight());
        if (dto.getTargetWeight() != null) user.setTargetWeight(dto.getTargetWeight());
        if (dto.getFitnessGoal() != null) user.setFitnessGoal(dto.getFitnessGoal());
        if (dto.getActivityLevel() != null) user.setActivityLevel(dto.getActivityLevel());
        
        return userRepository.save(user);
    }
}
