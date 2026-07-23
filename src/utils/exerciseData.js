// VinFit Exercise Database — 7-Day Split

export const exerciseData = {

  Day1: {
    subtitle: 'Upper (Pull-focus)',
    description: 'Pull-focused upper body session to build back width, thickness, and arm size.',
    estimatedCalories: 380,
    exercises: [
      { id: 'd1_1', name: 'Pull-ups / lat pulldown (wide grip)', sets: '4', reps: '10' },
      { id: 'd1_2', name: 'Barbell or dumbbell row',             sets: '3', reps: '10' },
      { id: 'd1_3', name: 'Face pulls',                         sets: '3', reps: '15' },
      { id: 'd1_4', name: 'Lateral raises',                     sets: '3', reps: '15' },
      { id: 'd1_5', name: 'Hanging leg raise',                  sets: '3', reps: '12' },
    ]
  },

  Day2: {
    subtitle: 'Lower',
    description: 'Quad, hamstring, and calf development focusing on heavy strength and hypertrophy.',
    estimatedCalories: 450,
    exercises: [
      { id: 'd2_1', name: 'Squat or leg press',                 sets: '4', reps: '10' },
      { id: 'd2_2', name: 'Romanian deadlift',                  sets: '3', reps: '8' },
      { id: 'd2_3', name: 'Walking lunges(per leg)',            sets: '3', reps: '12' },
      { id: 'd2_4', name: 'Calf raises',                        sets: '3', reps: '15' },
    ]
  },

  Day3: {
    subtitle: 'Cardio + flexibility',
    description: 'Incline treadmill walk combined with a comprehensive upper/lower flexibility routine for active recovery.',
    estimatedCalories: 250,
    exercises: [
      { id: 'd3_1', name: 'Incline treadmill walk',             sets: '25 min', reps: 'Speed: 5-5.5 km/h, Incline: 8-12%' },
      // Lower body
      { id: 'd3_2', name: 'Hip flexor stretch',                 sets: '1 set', reps: '30s/side' },
      { id: 'd3_3', name: 'Hamstring stretch',                  sets: '1 set', reps: '30s/side' },
      { id: 'd3_4', name: 'Pigeon pose or figure-4 stretch',    sets: '1 set', reps: '30s/side' },
      { id: 'd3_5', name: 'Standing quad stretch',              sets: '1 set', reps: '30s/side' },
      // Upper body
      { id: 'd3_6', name: 'Cross-body shoulder stretch',        sets: '1 set', reps: '30s/side' },
      { id: 'd3_7', name: 'Thoracic spine rotation',            sets: '1 set', reps: '8-10 reps/side' },
      // Cool-down
      { id: 'd3_8', name: 'Cat-cow',                            sets: '1 set', reps: '8-10 reps, slow' },
      { id: 'd3_9', name: 'Child\'s pose',                     sets: '1 set', reps: '45-60s' },
    ]
  },

  Day4: {
    subtitle: 'Upper (Push-focus)',
    description: 'Push-focused upper body session to build shoulders, chest, triceps and core strength.',
    estimatedCalories: 380,
    exercises: [
      { id: 'd4_1', name: 'Overhead press',                     sets: '3', reps: '8' },
      { id: 'd4_2', name: 'Incline dumbbell press',             sets: '3', reps: '10' },
      { id: 'd4_3', name: 'Lateral raises',                     sets: '3', reps: '15' },
      { id: 'd4_4', name: 'Face pulls',                         sets: '3', reps: '15' },
      { id: 'd4_5', name: 'Plank',                              sets: '3', reps: '40s' },
    ]
  },

  Day5: {
    subtitle: 'Lower/Full-body light',
    description: 'Posterior chain focus, full-body light accessories, and core stabilizer training.',
    estimatedCalories: 350,
    exercises: [
      { id: 'd5_1', name: 'Deadlift',                           sets: '3', reps: '6' },
      { id: 'd5_2', name: 'Goblet squat',                       sets: '3', reps: '12' },
      { id: 'd5_3', name: 'Farmer\'s carry',                    sets: '3', reps: '10 (rounds)' },
      { id: 'd5_4', name: 'Core',                               sets: '3', reps: 'sets' },
    ]
  },

  Day6: {
    subtitle: 'Cardio + flexibility',
    description: 'Incline treadmill walk combined with a comprehensive upper/lower flexibility routine for active recovery.',
    estimatedCalories: 250,
    exercises: [
      { id: 'd6_1', name: 'Incline treadmill walk',             sets: '25 min', reps: 'Speed: 5-5.5 km/h, Incline: 8-12%' },
      // Lower body
      { id: 'd6_2', name: 'Hip flexor stretch',                 sets: '1 set', reps: '30s/side' },
      { id: 'd6_3', name: 'Hamstring stretch',                  sets: '1 set', reps: '30s/side' },
      { id: 'd6_4', name: 'Pigeon pose or figure-4 stretch',    sets: '1 set', reps: '30s/side' },
      { id: 'd6_5', name: 'Standing quad stretch',              sets: '1 set', reps: '30s/side' },
      // Upper body
      { id: 'd6_6', name: 'Cross-body shoulder stretch',        sets: '1 set', reps: '30s/side' },
      { id: 'd6_7', name: 'Thoracic spine rotation',            sets: '1 set', reps: '8-10 reps/side' },
      // Cool-down
      { id: 'd6_8', name: 'Cat-cow',                            sets: '1 set', reps: '8-10 reps, slow' },
      { id: 'd6_9', name: 'Child\'s pose',                     sets: '1 set', reps: '45-60s' },
    ]
  },

  Day7: {
    subtitle: 'Full rest',
    description: 'Complete recovery day. Prioritize nutrition, hydration, and quality sleep to repair muscle tissue.',
    estimatedCalories: 0,
    exercises: [
      { id: 'd7_1', name: 'Sleep 7–9 hrs',                      sets: '—', reps: 'priority' },
      { id: 'd7_2', name: 'Hydration (3L water)',               sets: '—', reps: 'priority' },
    ]
  },

};
