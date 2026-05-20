// VinFit Exercise Database — 7-Day PPL+ Split

export const exerciseData = {

  PushA: {
    subtitle: 'Chest + Triceps',
    description: 'Chest mass and definition combined with tricep isolation. Volume-focused push day targeting upper, mid, and lower chest.',
    estimatedCalories: 420,
    exercises: [
      { id: 'pa_1', name: 'Flat Bench Press',             sets: '4', reps: 'sets' },
      { id: 'pa_2', name: 'Incline Dumbbell Press',        sets: '3', reps: 'sets' },
      { id: 'pa_3', name: 'Chest Fly / Cable Fly',         sets: '3', reps: 'sets' },
      { id: 'pa_4', name: 'Cable Tricep Pushdown',         sets: '3', reps: 'sets' },
      { id: 'pa_5', name: 'Dumbbell Lateral Raises',       sets: '3', reps: 'sets' },
      { id: 'pa_6', name: 'Push-ups',                      sets: '2', reps: 'sets to failure' },
    ]
  },

  PullA: {
    subtitle: 'Back + Biceps',
    description: 'Width-focused back session. Lat pulldowns and rows to build the V-taper and combat rounded shoulders from desk work.',
    estimatedCalories: 380,
    exercises: [
      { id: 'pla_1', name: 'Pull-ups or Lat Pulldown',     sets: '4', reps: 'sets' },
      { id: 'pla_2', name: 'Seated Cable / Mid Row',       sets: '4', reps: 'sets' },
      { id: 'pla_3', name: 'T-Bar Row',                    sets: '3', reps: 'sets' },
      { id: 'pla_4', name: 'Face Pulls',                   sets: '3', reps: 'sets' },
      { id: 'pla_5', name: 'Cable / Barbell Bicep Curls',  sets: '3', reps: 'sets' },
      { id: 'pla_6', name: 'Hammer Curls',                 sets: '2', reps: 'sets' },
    ]
  },

  CardioCore: {
    subtitle: 'Cardio + Core',
    description: 'Active fat-burn session. Steady-state cardio combined with core stability work to tighten the midsection and improve posture.',
    estimatedCalories: 350,
    exercises: [
      { id: 'cc_1', name: 'Incline Walk or Cycling',       sets: '20–30', reps: 'mins' },
      { id: 'cc_2', name: 'Plank',                         sets: '3', reps: 'rounds' },
      { id: 'cc_3', name: 'Mountain Climbers',             sets: '3', reps: 'rounds' },
      { id: 'cc_4', name: 'Hanging Leg Raises / Crunches', sets: '3', reps: 'sets' },
    ]
  },

  PushB: {
    subtitle: 'Shoulders + Triceps',
    description: 'Shoulder width and cap development. Overhead pressing with lateral raise volume to build the V-taper from the top.',
    estimatedCalories: 400,
    exercises: [
      { id: 'pb_1', name: 'Overhead Press',                       sets: '4', reps: 'sets' },
      { id: 'pb_2', name: 'Shoulder Press Machine',               sets: '3', reps: 'sets' },
      { id: 'pb_3', name: 'Dumbbell Lateral Raises',              sets: '4', reps: 'sets' },
      { id: 'pb_4', name: 'Reverse Pec Deck / Rear Delt Fly',     sets: '3', reps: 'sets' },
      { id: 'pb_5', name: 'Shrugs',                               sets: '3', reps: 'sets' },
      { id: 'pb_6', name: 'Overhead Cable Tricep Extension',      sets: '3', reps: 'sets' },
    ]
  },

  PullB: {
    subtitle: 'Back Thickness + Rear Delts',
    description: 'Thickness-focused pulling day. Heavy deadlift patterns and rowing movements to build a dense, powerful back.',
    estimatedCalories: 430,
    exercises: [
      { id: 'plb_1', name: 'Romanian Deadlift / Rack Pull',       sets: '4', reps: 'sets' },
      { id: 'plb_2', name: 'Wide-Grip Lat Pulldown',              sets: '3', reps: 'sets' },
      { id: 'plb_3', name: 'Chest-Supported Row',                 sets: '3', reps: 'sets' },
      { id: 'plb_4', name: 'Face Pulls / Rear Delt Cable Fly',    sets: '3', reps: 'sets' },
      { id: 'plb_5', name: 'EZ-Bar or Cable Curls',               sets: '3', reps: 'sets' },
    ]
  },

  Legs: {
    subtitle: 'Legs + Conditioning',
    description: 'Full lower-body session. Squats and deadlifts for mass, isolation for detail, and optional conditioning for extra calorie burn.',
    estimatedCalories: 500,
    exercises: [
      { id: 'lg_1', name: 'Barbell Squats / Hack Squats',         sets: '4', reps: 'sets' },
      { id: 'lg_2', name: 'Romanian Deadlifts',                   sets: '4', reps: 'sets' },
      { id: 'lg_3', name: 'Walking Lunges',                       sets: '3', reps: 'sets' },
      { id: 'lg_4', name: 'Leg Extensions',                       sets: '3', reps: 'sets' },
      { id: 'lg_5', name: 'Leg Curls',                            sets: '3', reps: 'sets' },
      { id: 'lg_6', name: 'Standing Calf Raises',                 sets: '4', reps: 'sets' },
      { id: 'lg_7', name: 'Incline Walk / Sled Push',             sets: '10', reps: 'mins (optional)' },
    ]
  },

  Rest: {
    subtitle: 'Rest & Recovery',
    description: 'Active recovery day. Let your muscles repair, eat at maintenance, stay hydrated, and get 7–9 hours of sleep.',
    estimatedCalories: 0,
    exercises: [
      { id: 'rest_1', name: 'Light Walk or Stretching',           sets: '20', reps: 'mins (optional)' },
      { id: 'rest_2', name: 'Foam Rolling',                       sets: '10', reps: 'mins (optional)' },
      { id: 'rest_3', name: 'Sleep 7–9 hrs',                      sets: '—',  reps: 'priority' },
      { id: 'rest_4', name: 'Hydration (3L water)',               sets: '—',  reps: 'priority' },
    ]
  },

};
