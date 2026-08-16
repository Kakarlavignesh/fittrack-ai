export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  height?: number;
  currentWeight?: number;
  targetWeight?: number;
  fitnessGoal?: string;
  activityLevel?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
}

export interface Progress {
  id?: number;
  weight: number;
  caloriesConsumed: number;
  caloriesBurned: number;
  steps: number;
  workoutCompleted: boolean;
  notes?: string;
  recordedDate?: string;
}

export interface Workout {
  id?: number;
  workoutName: string;
  workoutType: string;
  duration: number;
  caloriesBurned: number;
  workoutDate?: string;
}

export interface DietPlan {
  id?: number;
  goal: string;
  dailyCalories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  createdAt?: string;
}
