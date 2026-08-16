package com.fittrack.dto;

import lombok.Data;

@Data
public class UserProfileUpdateDTO {
    private String name;
    private Integer age;
    private String gender;
    private Double height;
    private Double currentWeight;
    private Double targetWeight;
    private String fitnessGoal;
    private String activityLevel;
}
