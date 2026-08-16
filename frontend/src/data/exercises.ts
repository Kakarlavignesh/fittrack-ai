export interface Exercise {
  id: string;
  name: string;
  category: string;
  targetMuscle: string;
  description: string;
  difficulty: string;
  equipment: string;
  image: string;
  tips: string;
  mistakes: string;
  suggestedSets: string;
}

export const EXERCISE_CATEGORIES = [
  { id: 'chest', name: 'Chest', description: 'Build strength & muscle', image: '/exercises/cat_chest.jpg' },
  { id: 'back', name: 'Back', description: 'Improve posture & width', image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=800' },
  { id: 'shoulders', name: 'Shoulders', description: 'Broaden your frame', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800' },
  { id: 'biceps', name: 'Biceps', description: 'Grow your arms', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800' },
  { id: 'triceps', name: 'Triceps', description: 'Define the back of arms', image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?q=80&w=800' },
  { id: 'legs', name: 'Legs', description: 'Build a strong foundation', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=800' },
  { id: 'abs', name: 'Abs / Core', description: 'Strengthen your midsection', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800' },
  { id: 'glutes', name: 'Glutes', description: 'Power and stability', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800' },
  { id: 'fullbody', name: 'Full Body', description: 'Total conditioning', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800' },
];

export const EXERCISES: Exercise[] = [
  // CHEST
  {
    id: 'chest-1', name: 'Push-Ups', category: 'Chest', targetMuscle: 'Primary: Chest',
    description: 'Keep your body in a straight line and lower yourself until your chest nearly touches the floor. Push back up with control.',
    difficulty: 'Beginner', equipment: 'Bodyweight', image: '/exercises/pushups.jpg',
    tips: 'Keep your core braced and don\'t let your hips sag.', mistakes: 'Flaring elbows out too wide.', suggestedSets: '3 sets × 10–15 reps'
  },
  {
    id: 'chest-2', name: 'Barbell Bench Press', category: 'Chest', targetMuscle: 'Primary: Chest',
    description: 'Lie flat on the bench and lower the bar toward your chest with control. Push it upward while keeping your feet stable and your back supported.',
    difficulty: 'Beginner', equipment: 'Barbell + Bench', image: '/exercises/barbell_bench_press.png',
    tips: 'Keep your feet flat on the ground for stability.', mistakes: 'Bouncing the bar off the chest.', suggestedSets: '3 sets × 8–12 reps'
  },
  {
    id: 'chest-3', name: 'Incline Dumbbell Press', category: 'Chest', targetMuscle: 'Primary: Upper Chest',
    description: 'Lie on an incline bench and press the dumbbells straight up over your chest. Lower them slowly until you feel a stretch.',
    difficulty: 'Beginner', equipment: 'Dumbbells + Incline Bench', image: '/exercises/incline_dumbell_press.png',
    tips: 'Set the bench to a 30-45 degree angle.', mistakes: 'Arching the lower back excessively.', suggestedSets: '3 sets × 8–12 reps'
  },
  {
    id: 'chest-4', name: 'Chest Press Machine', category: 'Chest', targetMuscle: 'Primary: Chest',
    description: 'Sit in the machine with your back flat. Push the handles forward until your arms are fully extended, then return with control.',
    difficulty: 'Beginner', equipment: 'Chest Press Machine', image: '/exercises/chest_press_machine.png',
    tips: 'Adjust the seat so the handles are at mid-chest level.', mistakes: 'Using momentum instead of chest muscles.', suggestedSets: '3 sets × 10–15 reps'
  },
  {
    id: 'chest-5', name: 'Dumbbell Fly', category: 'Chest', targetMuscle: 'Primary: Chest',
    description: 'Lie flat on a bench with dumbbells held above you. Lower them out to the sides in a wide arc, then bring them back together.',
    difficulty: 'Beginner', equipment: 'Dumbbells + Bench', image: '/exercises/dumbell_fly.png',
    tips: 'Keep a slight bend in your elbows throughout.', mistakes: 'Going too deep and straining the shoulders.', suggestedSets: '3 sets × 10–15 reps'
  },
  {
    id: 'chest-6', name: 'Cable Chest Fly', category: 'Chest', targetMuscle: 'Primary: Chest',
    description: 'Stand between two cable pulleys. Pull the handles forward and together, squeezing your chest at the peak contraction.',
    difficulty: 'Beginner', equipment: 'Cable Machine', image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?q=80&w=800',
    tips: 'Stagger your stance for better balance.', mistakes: 'Bending the elbows too much (pressing instead of flying).', suggestedSets: '3 sets × 12–15 reps'
  },
  
  // BACK
  {
    id: 'back-1', name: 'Lat Pulldown', category: 'Back', targetMuscle: 'Primary: Lats',
    description: 'Sit at the pulldown machine and grab the wide bar. Pull it down smoothly to your upper chest while squeezing your shoulder blades together.',
    difficulty: 'Beginner', equipment: 'Lat Pulldown Machine', image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=800',
    tips: 'Lean back slightly and pull with your back, not your arms.', mistakes: 'Pulling the bar behind the neck.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'back-2', name: 'Seated Cable Row', category: 'Back', targetMuscle: 'Primary: Mid Back',
    description: 'Sit with your feet on the platforms. Pull the handle toward your lower stomach, squeezing your back, then slowly release.',
    difficulty: 'Beginner', equipment: 'Cable Row Machine', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800',
    tips: 'Keep your chest up and back straight.', mistakes: 'Swaying back and forth to create momentum.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'back-3', name: 'Assisted Pull-Up', category: 'Back', targetMuscle: 'Primary: Lats',
    description: 'Kneel on the assist pad and grab the handles. Pull yourself up until your chin is over the bar, then slowly lower yourself.',
    difficulty: 'Beginner', equipment: 'Assisted Pull-Up Machine', image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=800',
    tips: 'Control the descent; don\'t just drop.', mistakes: 'Not using a full range of motion.', suggestedSets: '3 sets × 8–10 reps'
  },
  {
    id: 'back-4', name: 'One-Arm Dumbbell Row', category: 'Back', targetMuscle: 'Primary: Lats / Mid Back',
    description: 'Support one knee and hand on a bench. Pull a dumbbell up to your hip with the other hand, keeping your elbow close to your body.',
    difficulty: 'Beginner', equipment: 'Dumbbell + Bench', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
    tips: 'Keep your back flat, parallel to the floor.', mistakes: 'Twisting the torso while pulling.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'back-5', name: 'Chest-Supported Row', category: 'Back', targetMuscle: 'Primary: Mid Back',
    description: 'Lie face down on an incline bench. Pull two dumbbells upward, squeezing your back, then slowly lower them.',
    difficulty: 'Beginner', equipment: 'Dumbbells + Incline Bench', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    tips: 'Let your shoulder blades stretch at the bottom.', mistakes: 'Lifting the chest off the bench.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'back-6', name: 'Straight-Arm Pulldown', category: 'Back', targetMuscle: 'Primary: Lats',
    description: 'Stand facing a cable machine. With straight arms, push the bar down to your thighs, squeezing your lats.',
    difficulty: 'Beginner', equipment: 'Cable Machine', image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?q=80&w=800',
    tips: 'Keep a slight bend in your elbows and lock them in place.', mistakes: 'Bending the arms and turning it into a tricep pushdown.', suggestedSets: '3 sets × 12–15 reps'
  },

  // SHOULDERS
  {
    id: 'shoulders-1', name: 'Dumbbell Shoulder Press', category: 'Shoulders', targetMuscle: 'Primary: Shoulders',
    description: 'Sit on a bench with back support. Press the dumbbells overhead until your arms are straight, then lower them to ear level.',
    difficulty: 'Beginner', equipment: 'Dumbbells + Bench', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
    tips: 'Keep your elbows slightly in front of your body.', mistakes: 'Arching the lower back off the bench.', suggestedSets: '3 sets × 8–12 reps'
  },
  {
    id: 'shoulders-2', name: 'Machine Shoulder Press', category: 'Shoulders', targetMuscle: 'Primary: Shoulders',
    description: 'Sit in the machine, grab the handles, and push upward smoothly. Lower the weight under control without letting it drop.',
    difficulty: 'Beginner', equipment: 'Shoulder Press Machine', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    tips: 'Adjust the seat so handles are at shoulder height.', mistakes: 'Locking out the elbows violently at the top.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'shoulders-3', name: 'Dumbbell Lateral Raise', category: 'Shoulders', targetMuscle: 'Primary: Side Delts',
    description: 'Stand holding dumbbells at your sides. Raise your arms straight out to the sides until they reach shoulder height, then lower.',
    difficulty: 'Beginner', equipment: 'Dumbbells', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800',
    tips: 'Pour water from a pitcher at the top.', mistakes: 'Swinging the body to lift the weight.', suggestedSets: '3 sets × 12–15 reps'
  },
  {
    id: 'shoulders-4', name: 'Front Dumbbell Raise', category: 'Shoulders', targetMuscle: 'Primary: Front Delts',
    description: 'Hold dumbbells in front of your thighs. Raise them straight forward to shoulder level, then lower them slowly.',
    difficulty: 'Beginner', equipment: 'Dumbbells', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800',
    tips: 'Keep your torso perfectly still.', mistakes: 'Leaning back to lift the weight.', suggestedSets: '3 sets × 12–15 reps'
  },
  {
    id: 'shoulders-5', name: 'Reverse Pec Deck', category: 'Shoulders', targetMuscle: 'Primary: Rear Delts',
    description: 'Sit facing the machine. Grab the handles and pull them backward in a wide arc to target the back of your shoulders.',
    difficulty: 'Beginner', equipment: 'Pec Deck Machine', image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?q=80&w=800',
    tips: 'Keep your chest pressed against the pad.', mistakes: 'Squeezing the shoulder blades too much (targets back instead of rear delts).', suggestedSets: '3 sets × 12–15 reps'
  },
  {
    id: 'shoulders-6', name: 'Cable Lateral Raise', category: 'Shoulders', targetMuscle: 'Primary: Side Delts',
    description: 'Stand sideways to a cable machine. Pull the cable across your body and up to the side until your arm is parallel to the floor.',
    difficulty: 'Beginner', equipment: 'Cable Machine', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
    tips: 'Use constant tension provided by the cable.', mistakes: 'Pulling with the trap muscles instead of the shoulders.', suggestedSets: '3 sets × 12–15 reps'
  },

  // BICEPS
  {
    id: 'biceps-1', name: 'Dumbbell Bicep Curl', category: 'Biceps', targetMuscle: 'Primary: Biceps',
    description: 'Stand with dumbbells by your sides. Curl the weights up to your shoulders while keeping your elbows pinned to your sides.',
    difficulty: 'Beginner', equipment: 'Dumbbells', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
    tips: 'Twist your wrists outward slightly at the top (supination).', mistakes: 'Swinging the elbows forward.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'biceps-2', name: 'Hammer Curl', category: 'Biceps', targetMuscle: 'Primary: Brachialis / Biceps',
    description: 'Hold dumbbells with a neutral grip (palms facing each other). Curl the weight up toward your shoulders, maintaining the grip.',
    difficulty: 'Beginner', equipment: 'Dumbbells', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800',
    tips: 'Squeeze hard at the top of the movement.', mistakes: 'Using momentum from the hips.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'biceps-3', name: 'Barbell Curl', category: 'Biceps', targetMuscle: 'Primary: Biceps',
    description: 'Hold a barbell with an underhand grip. Curl the bar up to your chest, then slowly lower it until your arms are fully extended.',
    difficulty: 'Beginner', equipment: 'Barbell', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    tips: 'Keep your elbows glued to your ribs.', mistakes: 'Leaning back as the weight comes up.', suggestedSets: '3 sets × 8–12 reps'
  },
  {
    id: 'biceps-4', name: 'Cable Curl', category: 'Biceps', targetMuscle: 'Primary: Biceps',
    description: 'Attach a straight bar to a low cable. Stand up straight and curl the bar upward, feeling the constant tension from the cable.',
    difficulty: 'Beginner', equipment: 'Cable Machine', image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?q=80&w=800',
    tips: 'Control the negative (downward) portion.', mistakes: 'Standing too far back from the machine.', suggestedSets: '3 sets × 12–15 reps'
  },
  {
    id: 'biceps-5', name: 'Preacher Curl Machine', category: 'Biceps', targetMuscle: 'Primary: Biceps',
    description: 'Sit at the machine with your upper arms resting on the pad. Curl the handles toward you, then extend fully.',
    difficulty: 'Beginner', equipment: 'Preacher Curl Machine', image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=800',
    tips: 'Keep your armpits firmly against the top of the pad.', mistakes: 'Lifting your elbows off the pad.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'biceps-6', name: 'Incline Dumbbell Curl', category: 'Biceps', targetMuscle: 'Primary: Biceps (Long Head)',
    description: 'Sit on an incline bench and let your arms hang straight down. Curl the dumbbells up, keeping your elbows back.',
    difficulty: 'Beginner', equipment: 'Dumbbells + Incline Bench', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800',
    tips: 'Feel the deep stretch at the bottom of the movement.', mistakes: 'Bringing the elbows forward during the curl.', suggestedSets: '3 sets × 10–12 reps'
  },

  // TRICEPS
  {
    id: 'triceps-1', name: 'Cable Tricep Pushdown', category: 'Triceps', targetMuscle: 'Primary: Triceps',
    description: 'Attach a straight bar to a high cable. Push the bar down until your arms are straight, keeping your elbows at your sides.',
    difficulty: 'Beginner', equipment: 'Cable Machine', image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?q=80&w=800',
    tips: 'Lock your elbows at your sides.', mistakes: 'Letting the elbows flare out or travel upward.', suggestedSets: '3 sets × 12–15 reps'
  },
  {
    id: 'triceps-2', name: 'Overhead Dumbbell Extension', category: 'Triceps', targetMuscle: 'Primary: Triceps',
    description: 'Hold one dumbbell with both hands overhead. Lower it behind your head by bending your elbows, then press back up.',
    difficulty: 'Beginner', equipment: 'Dumbbell', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
    tips: 'Keep your elbows pointing straight up, not out to the sides.', mistakes: 'Arching the lower back.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'triceps-3', name: 'Assisted Dips', category: 'Triceps', targetMuscle: 'Primary: Triceps / Chest',
    description: 'Kneel on the assist pad and grip the handles. Lower your body by bending your elbows to 90 degrees, then press up.',
    difficulty: 'Beginner', equipment: 'Assisted Dip Machine', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800',
    tips: 'Keep your torso upright to target the triceps more.', mistakes: 'Going down too low and hurting the shoulders.', suggestedSets: '3 sets × 8–12 reps'
  },
  {
    id: 'triceps-4', name: 'Close-Grip Push-Ups', category: 'Triceps', targetMuscle: 'Primary: Triceps',
    description: 'Perform a push-up with your hands placed closer than shoulder-width apart, keeping elbows tucked close to your body.',
    difficulty: 'Beginner', equipment: 'Bodyweight', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
    tips: 'Keep your elbows brushing against your ribs.', mistakes: 'Flaring elbows outward.', suggestedSets: '3 sets × 10–15 reps'
  },
  {
    id: 'triceps-5', name: 'Rope Overhead Extension', category: 'Triceps', targetMuscle: 'Primary: Triceps',
    description: 'Attach a rope to a high cable and turn away from it. Pull the rope over your head until your arms are fully extended.',
    difficulty: 'Beginner', equipment: 'Cable Machine + Rope', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    tips: 'Spread the rope apart at full extension.', mistakes: 'Using too much weight and losing balance.', suggestedSets: '3 sets × 12–15 reps'
  },
  {
    id: 'triceps-6', name: 'Machine Tricep Extension', category: 'Triceps', targetMuscle: 'Primary: Triceps',
    description: 'Sit in the machine and place your elbows on the pad. Push the handles downward or forward to extend the arms.',
    difficulty: 'Beginner', equipment: 'Tricep Machine', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800',
    tips: 'Focus entirely on the triceps doing the pushing.', mistakes: 'Lifting off the seat to use body weight.', suggestedSets: '3 sets × 10–12 reps'
  },

  // LEGS
  {
    id: 'legs-1', name: 'Bodyweight Squat', category: 'Legs', targetMuscle: 'Primary: Quads / Glutes',
    description: 'Stand with feet shoulder-width apart. Push your hips back and bend your knees as if sitting in a chair, then stand back up.',
    difficulty: 'Beginner', equipment: 'Bodyweight', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=800',
    tips: 'Keep your chest up and your knees tracking over your toes.', mistakes: 'Letting the knees collapse inward.', suggestedSets: '3 sets × 15–20 reps'
  },
  {
    id: 'legs-2', name: 'Leg Press', category: 'Legs', targetMuscle: 'Primary: Quads',
    description: 'Sit in the machine and place your feet on the platform. Lower the weight smoothly, then press back up without locking your knees.',
    difficulty: 'Beginner', equipment: 'Leg Press Machine', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    tips: 'Place your feet lower for more quad focus, higher for glutes.', mistakes: 'Locking out the knees forcefully.', suggestedSets: '3 sets × 10–15 reps'
  },
  {
    id: 'legs-3', name: 'Goblet Squat', category: 'Legs', targetMuscle: 'Primary: Quads / Core',
    description: 'Hold a dumbbell or kettlebell vertically against your chest. Perform a squat while keeping your torso upright.',
    difficulty: 'Beginner', equipment: 'Dumbbell / Kettlebell', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
    tips: 'Keep the weight touching your chest at all times.', mistakes: 'Letting the upper back round forward.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'legs-4', name: 'Leg Extension', category: 'Legs', targetMuscle: 'Primary: Quads',
    description: 'Sit on the machine with the pad against your shins. Extend your legs fully, squeeze your quads, and slowly lower back down.',
    difficulty: 'Beginner', equipment: 'Leg Extension Machine', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
    tips: 'Hold the contraction at the top for one second.', mistakes: 'Swinging the weight up with momentum.', suggestedSets: '3 sets × 12–15 reps'
  },
  {
    id: 'legs-5', name: 'Leg Curl', category: 'Legs', targetMuscle: 'Primary: Hamstrings',
    description: 'Lie face down or sit on the machine. Curl the pad toward your glutes, squeezing your hamstrings, then control the release.',
    difficulty: 'Beginner', equipment: 'Leg Curl Machine', image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?q=80&w=800',
    tips: 'Keep your hips pressed firmly into the pad.', mistakes: 'Arching the lower back to pull the weight.', suggestedSets: '3 sets × 12–15 reps'
  },
  {
    id: 'legs-6', name: 'Romanian Deadlift', category: 'Legs', targetMuscle: 'Primary: Hamstrings / Glutes',
    description: 'Hold a barbell or dumbbells. Keep your legs mostly straight and push your hips backward until you feel a deep stretch in the hamstrings.',
    difficulty: 'Beginner', equipment: 'Barbell / Dumbbells', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800',
    tips: 'Keep the weights very close to your legs.', mistakes: 'Rounding the lower back.', suggestedSets: '3 sets × 10–12 reps'
  },

  // ABS / CORE
  {
    id: 'abs-1', name: 'Crunches', category: 'Abs / Core', targetMuscle: 'Primary: Upper Abs',
    description: 'Lie on your back with knees bent. Curl your shoulders off the floor, squeezing your abs, then lower slowly.',
    difficulty: 'Beginner', equipment: 'Bodyweight', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800',
    tips: 'Look at the ceiling to keep your neck straight.', mistakes: 'Pulling on your neck with your hands.', suggestedSets: '3 sets × 15–20 reps'
  },
  {
    id: 'abs-2', name: 'Plank', category: 'Abs / Core', targetMuscle: 'Primary: Core',
    description: 'Hold your body in a straight line supported by your forearms and toes. Brace your core tightly and hold the position.',
    difficulty: 'Beginner', equipment: 'Bodyweight', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800',
    tips: 'Squeeze your glutes to help maintain a straight line.', mistakes: 'Letting the hips sag toward the floor.', suggestedSets: '3 sets × 30–60 seconds'
  },
  {
    id: 'abs-3', name: 'Hanging Knee Raise', category: 'Abs / Core', targetMuscle: 'Primary: Lower Abs',
    description: 'Hang from a pull-up bar. Lift your knees toward your chest, using your abs to pull, then lower with control.',
    difficulty: 'Beginner', equipment: 'Pull-Up Bar', image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=800',
    tips: 'Roll your pelvis upward at the top of the movement.', mistakes: 'Swinging back and forth.', suggestedSets: '3 sets × 10–15 reps'
  },
  {
    id: 'abs-4', name: 'Bicycle Crunch', category: 'Abs / Core', targetMuscle: 'Primary: Obliques',
    description: 'Lie on your back. Bring one knee toward your chest while twisting your opposite elbow to meet it, alternating sides.',
    difficulty: 'Beginner', equipment: 'Bodyweight', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
    tips: 'Move slowly and focus on the twist.', mistakes: 'Rushing through the movement without twisting.', suggestedSets: '3 sets × 20 reps (total)'
  },
  {
    id: 'abs-5', name: 'Dead Bug', category: 'Abs / Core', targetMuscle: 'Primary: Core',
    description: 'Lie on your back with arms straight up and knees bent 90 degrees. Lower opposite arm and leg toward the floor, then return.',
    difficulty: 'Beginner', equipment: 'Bodyweight', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    tips: 'Press your lower back hard into the floor.', mistakes: 'Allowing the lower back to arch off the ground.', suggestedSets: '3 sets × 10–12 reps (each side)'
  },
  {
    id: 'abs-6', name: 'Cable Crunch', category: 'Abs / Core', targetMuscle: 'Primary: Upper Abs',
    description: 'Kneel facing a cable machine holding a rope behind your neck. Crunch downward, bringing your elbows toward your knees.',
    difficulty: 'Beginner', equipment: 'Cable Machine + Rope', image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?q=80&w=800',
    tips: 'Keep your hips locked in place; only bend your spine.', mistakes: 'Using the arms to pull the weight down.', suggestedSets: '3 sets × 12–15 reps'
  },

  // GLUTES
  {
    id: 'glutes-1', name: 'Glute Bridge', category: 'Glutes', targetMuscle: 'Primary: Glutes',
    description: 'Lie on your back with knees bent and feet flat. Push your hips toward the ceiling, squeezing your glutes at the top.',
    difficulty: 'Beginner', equipment: 'Bodyweight', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800',
    tips: 'Push through your heels.', mistakes: 'Hyperextending the lower back at the top.', suggestedSets: '3 sets × 15–20 reps'
  },
  {
    id: 'glutes-2', name: 'Hip Thrust', category: 'Glutes', targetMuscle: 'Primary: Glutes',
    description: 'Rest your upper back on a bench with a barbell across your hips. Thrust your hips upward until your body forms a straight line.',
    difficulty: 'Beginner', equipment: 'Barbell + Bench', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=800',
    tips: 'Tuck your chin slightly and look forward.', mistakes: 'Using the lower back instead of the glutes to lift.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'glutes-3', name: 'Goblet Squat', category: 'Glutes', targetMuscle: 'Primary: Glutes / Quads',
    description: 'Hold a weight against your chest and perform a deep squat, focusing on pushing your hips back to engage the glutes.',
    difficulty: 'Beginner', equipment: 'Dumbbell / Kettlebell', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
    tips: 'Go as deep as your mobility allows comfortably.', mistakes: 'Letting the chest fall forward.', suggestedSets: '3 sets × 10–15 reps'
  },
  {
    id: 'glutes-4', name: 'Bulgarian Split Squat', category: 'Glutes', targetMuscle: 'Primary: Glutes / Quads',
    description: 'Place one foot on a bench behind you. Lower your body until your front thigh is parallel to the floor, then push back up.',
    difficulty: 'Beginner', equipment: 'Dumbbells + Bench', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
    tips: 'Lean slightly forward to target the glutes more.', mistakes: 'Placing the front foot too close to the bench.', suggestedSets: '3 sets × 8–10 reps (each leg)'
  },
  {
    id: 'glutes-5', name: 'Cable Kickback', category: 'Glutes', targetMuscle: 'Primary: Glutes',
    description: 'Attach an ankle strap to a low cable. Lean forward slightly and kick your leg straight back, squeezing the glute.',
    difficulty: 'Beginner', equipment: 'Cable Machine + Ankle Strap', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800',
    tips: 'Keep your torso completely still.', mistakes: 'Swinging the leg and arching the back.', suggestedSets: '3 sets × 12–15 reps (each leg)'
  },
  {
    id: 'glutes-6', name: 'Step-Ups', category: 'Glutes', targetMuscle: 'Primary: Glutes / Quads',
    description: 'Stand in front of a box or bench. Step up with one foot, driving through the heel, then step back down slowly.',
    difficulty: 'Beginner', equipment: 'Box / Bench', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    tips: 'Control the descent rather than just dropping down.', mistakes: 'Using the trailing leg to push off the floor.', suggestedSets: '3 sets × 10–12 reps (each leg)'
  },

  // FULL BODY
  {
    id: 'fullbody-1', name: 'Bodyweight Squat', category: 'Full Body', targetMuscle: 'Primary: Quads / Core',
    description: 'Push your hips back and bend your knees as if sitting in a chair, keeping your core tight, then stand back up.',
    difficulty: 'Beginner', equipment: 'Bodyweight', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=800',
    tips: 'Keep your weight balanced across your whole foot.', mistakes: 'Lifting the heels off the ground.', suggestedSets: '3 sets × 15–20 reps'
  },
  {
    id: 'fullbody-2', name: 'Kettlebell Goblet Squat', category: 'Full Body', targetMuscle: 'Primary: Quads / Core / Upper Back',
    description: 'Hold a kettlebell at chest height. Perform a full squat while keeping your upper back engaged to support the weight.',
    difficulty: 'Beginner', equipment: 'Kettlebell', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
    tips: 'Keep the kettlebell close to your body.', mistakes: 'Holding the kettlebell too far away from the chest.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'fullbody-3', name: 'Kettlebell Deadlift', category: 'Full Body', targetMuscle: 'Primary: Hamstrings / Glutes / Back',
    description: 'Stand with a kettlebell between your feet. Hinge at the hips, grab the handle, and stand up straight, squeezing your glutes.',
    difficulty: 'Beginner', equipment: 'Kettlebell', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800',
    tips: 'Keep your chest up and back flat throughout.', mistakes: 'Squatting the weight instead of hinging at the hips.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'fullbody-4', name: 'Dumbbell Thruster', category: 'Full Body', targetMuscle: 'Primary: Legs / Shoulders',
    description: 'Hold dumbbells at shoulder height. Perform a full squat, and as you stand up, use the momentum to press the dumbbells overhead.',
    difficulty: 'Beginner', equipment: 'Dumbbells', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
    tips: 'Use the power from your legs to drive the dumbbells up.', mistakes: 'Pressing the weight before fully standing up.', suggestedSets: '3 sets × 10–12 reps'
  },
  {
    id: 'fullbody-5', name: 'Farmer\'s Walk', category: 'Full Body', targetMuscle: 'Primary: Core / Forearms / Traps',
    description: 'Hold a heavy dumbbell or kettlebell in each hand. Stand tall with your shoulders back and walk for a set distance or time.',
    difficulty: 'Beginner', equipment: 'Dumbbells / Kettlebells', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    tips: 'Walk with short, quick, controlled steps.', mistakes: 'Slouching forward as the grip tires.', suggestedSets: '3 sets × 30–45 seconds'
  },
  {
    id: 'fullbody-6', name: 'Burpee', category: 'Full Body', targetMuscle: 'Primary: Full Body / Cardio',
    description: 'Drop into a squat, kick your feet back to a plank, perform a push-up (optional for beginners), jump feet back in, and stand or jump up.',
    difficulty: 'Beginner', equipment: 'Bodyweight', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800',
    tips: 'Step your feet back instead of jumping if you are a true beginner.', mistakes: 'Letting the hips sag when entering the plank position.', suggestedSets: '3 sets × 8–10 reps'
  }
];
