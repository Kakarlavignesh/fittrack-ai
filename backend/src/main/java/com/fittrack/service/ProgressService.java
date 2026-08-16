package com.fittrack.service;

import com.fittrack.entity.Progress;
import com.fittrack.entity.User;
import com.fittrack.repository.ProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgressService {
    private final ProgressRepository progressRepository;
    private final UserService userService;

    public Progress addProgress(String email, Progress progress) {
        User user = userService.getUserByEmail(email);
        progress.setUser(user);
        if (progress.getRecordedDate() == null) {
            progress.setRecordedDate(LocalDate.now());
        }
        
        // Update user's current weight if a new weight is logged
        if (progress.getWeight() != null) {
            user.setCurrentWeight(progress.getWeight());
            userService.updateUserProfile(email, mapToDto(user));
        }
        
        return progressRepository.save(progress);
    }

    public List<Progress> getUserProgress(String email) {
        User user = userService.getUserByEmail(email);
        return progressRepository.findByUserIdOrderByRecordedDateDesc(user.getId());
    }

    public void deleteProgress(String email, Long id) {
        Progress progress = progressRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Progress not found"));
        
        if (!progress.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException("Not authorized to delete this progress");
        }
        
        progressRepository.delete(progress);
    }
    
    private com.fittrack.dto.UserProfileUpdateDTO mapToDto(User user) {
        com.fittrack.dto.UserProfileUpdateDTO dto = new com.fittrack.dto.UserProfileUpdateDTO();
        dto.setCurrentWeight(user.getCurrentWeight());
        return dto;
    }
}
