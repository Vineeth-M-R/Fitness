// LocalStorage database management for VinFit

const KEYS = {
  PROFILE: 'vinfit_profile',
  WORKOUT_LOGS: 'vinfit_workout_logs',
  CALORIE_LOGS: 'vinfit_calorie_logs'
};

const DEFAULT_PROFILE = {
  weight: 86,       // kg
  height: 178,      // cm
  age: 28,          // years
  gender: 'male',
  activityLevel: 1, // Moderately active: IT Desk Job + 4-5 weekly gym visits
  weeklyFatLossGoal: 0.75, // kg per week
};

// Calculate BMR using Mifflin-St Jeor Equation
export function calculateBMR(weight, height, age, gender = 'male') {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

// Calculate TDEE
export function calculateTDEE(profile) {
  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
  return Math.round(bmr * profile.activityLevel);
}

// Calculate targets
export function getCalorieTargets(profile) {
  const tdee = calculateTDEE(profile);
  // 1 kg of fat is ~7700 calories.
  const weeklyDeficitTarget = Math.round(profile.weeklyFatLossGoal * 7700);
  const dailyDeficitTarget = Math.round(weeklyDeficitTarget / 7);
  const dailyIntakeTarget = Math.round(tdee - dailyDeficitTarget);

  return {
    tdee,
    weeklyDeficitTarget,
    dailyDeficitTarget,
    dailyIntakeTarget
  };
}

// Helper to get formatted date string (YYYY-MM-DD)
export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Get helper to retrieve Monday of the current date's week
export function getMondayOfCurrentWeek(d = new Date()) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

// Core DB operations
export const db = {
  getProfile() {
    const raw = localStorage.getItem(KEYS.PROFILE);
    if (!raw) {
      this.saveProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    return JSON.parse(raw);
  },

  saveProfile(profile) {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },

  getWorkoutLogs() {
    const raw = localStorage.getItem(KEYS.WORKOUT_LOGS);
    return raw ? JSON.parse(raw) : [];
  },

  saveWorkoutLogs(logs) {
    localStorage.setItem(KEYS.WORKOUT_LOGS, JSON.stringify(logs));
  },

  addWorkoutLog(workout) {
    const logs = this.getWorkoutLogs();
    const newLog = {
      id: 'w_' + Date.now(),
      date: getLocalDateString(),
      timestamp: Date.now(),
      ...workout
    };
    logs.push(newLog);
    this.saveWorkoutLogs(logs);

    // Auto add workout calories to calorie logs
    if (workout.caloriesBurnt > 0) {
      this.addCalorieLog(newLog.date, 'extra', workout.caloriesBurnt, `Workout: ${workout.muscleGroup}`);
    }
    return newLog;
  },

  getCalorieLogs() {
    const raw = localStorage.getItem(KEYS.CALORIE_LOGS);
    return raw ? JSON.parse(raw) : {};
  },

  saveCalorieLogs(logs) {
    localStorage.setItem(KEYS.CALORIE_LOGS, JSON.stringify(logs));
  },

  resetTodayCalories(dateStr = getLocalDateString()) {
    const logs = this.getCalorieLogs();
    logs[dateStr] = { food: 0, extra: 0, items: [] };
    this.saveCalorieLogs(logs);
    return logs[dateStr];
  },

  addCalorieLog(dateStr, type, amount, note = '') {
    const logs = this.getCalorieLogs();
    if (!logs[dateStr]) {
      logs[dateStr] = { food: 0, extra: 0, items: [] };
    }

    amount = Math.max(0, parseInt(amount) || 0);

    if (type === 'food') {
      logs[dateStr].food += amount;
    } else if (type === 'extra') {
      logs[dateStr].extra += amount;
    }

    logs[dateStr].items.push({
      id: 'c_' + Date.now() + Math.random().toString(36).substr(2, 4),
      timestamp: Date.now(),
      type,
      amount,
      note
    });

    this.saveCalorieLogs(logs);
    return logs[dateStr];
  },

  // Calculate weekly stats
  getWeeklyDeficitStats(targetWeekMonday = getMondayOfCurrentWeek()) {
    const profile = this.getProfile();
    const tdee = calculateTDEE(profile);
    const calorieLogs = this.getCalorieLogs();

    let totalDeficit = 0;
    const daysData = [];

    // Loop Monday to Sunday (7 days)
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(targetWeekMonday);
      currentDay.setDate(targetWeekMonday.getDate() + i);
      const dateStr = getLocalDateString(currentDay);

      const log = calorieLogs[dateStr] || { food: 0, extra: 0 };
      const foodIn = log.food || 0;
      const extraOut = log.extra || 0;
      const totalOut = tdee + extraOut;

      // Deficit = Out - In
      // If no log exists for a future day, default deficit to 0 to prevent artificial success.
      const isTodayOrPast = currentDay <= new Date() || dateStr === getLocalDateString();
      const deficit = isTodayOrPast ? (foodIn > 0 ? (totalOut - foodIn) : extraOut) : 0;

      totalDeficit += deficit;

      daysData.push({
        date: dateStr,
        dayName: currentDay.toLocaleDateString('en-US', { weekday: 'short' }),
        foodIn,
        extraOut,
        tdee,
        totalOut,
        deficit
      });
    }

    const targets = getCalorieTargets(profile);

    return {
      days: daysData,
      totalDeficit,
      weeklyTarget: targets.weeklyDeficitTarget,
      percentage: Math.min(100, Math.max(0, Math.round((totalDeficit / targets.weeklyDeficitTarget) * 100))),
      projectedFatLoss: parseFloat((totalDeficit / 7700).toFixed(2))
    };
  },

  // Suggest next workout in sequence
  // Loop cycle: Pull (Back/Biceps) -> Push (Chest/Shoulders/Triceps) -> Legs (Glutes/Hamstrings) -> Core/Shoulders -> Full Body/Mobility
  getRecommendation() {
    const logs = this.getWorkoutLogs();
    if (logs.length === 0) {
      return 'Pull'; // Start with Pull to immediately target upper back alignment
    }

    // Get the most recent completed muscle group
    // Sort logs descending
    const sorted = [...logs].sort((a, b) => b.timestamp - a.timestamp);
    const lastCompleted = sorted[0].muscleGroup;

    const cycle = ['Pull', 'Push', 'Legs', 'Core', 'Mobility'];
    const lastIndex = cycle.indexOf(lastCompleted);

    if (lastIndex === -1) {
      return 'Pull'; // Fallback
    }

    const nextIndex = (lastIndex + 1) % cycle.length;
    return cycle[nextIndex];
  },

  // Clear data
  clearAll() {
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.WORKOUT_LOGS);
    localStorage.removeItem(KEYS.CALORIE_LOGS);
  },

  // Seed mock data
  seedMockData() {
    this.clearAll();
    this.saveProfile(DEFAULT_PROFILE);

    const monday = getMondayOfCurrentWeek();
    const mondayStr = getLocalDateString(monday);

    const tuesday = new Date(monday);
    tuesday.setDate(monday.getDate() + 1);
    const tuesdayStr = getLocalDateString(tuesday);

    const wednesday = new Date(monday);
    wednesday.setDate(monday.getDate() + 2);
    const wednesdayStr = getLocalDateString(wednesday);

    // Seed Monday: Workout (Pull) completed, logged food & extra active calories
    this.addWorkoutLog({
      date: mondayStr,
      timestamp: monday.getTime() + 18 * 60 * 60 * 1000, // 6 PM
      muscleGroup: 'Pull',
      caloriesBurnt: 380,
      exercises: [
        { name: 'Single-Arm Dumbbell Rows', setsCompleted: 3, reps: '10-12' },
        { name: 'Lat Pulldowns', setsCompleted: 3, reps: '10-12' },
        { name: 'Face Pulls', setsCompleted: 3, reps: '15' },
        { name: 'Bicep Hammer Curls', setsCompleted: 3, reps: '12' }
      ]
    });
    // Add Monday calories (2000 kcal eaten, 100 kcal extra steps + 380 kcal workout is auto-added)
    this.addCalorieLog(mondayStr, 'food', 2020, 'Healthy meals & protein shake');
    this.addCalorieLog(mondayStr, 'extra', 120, '10k daily steps');

    // Seed Tuesday: Workout (Push) completed, logged food
    this.addWorkoutLog({
      date: tuesdayStr,
      timestamp: tuesday.getTime() + 18.5 * 60 * 60 * 1000, // 6:30 PM
      muscleGroup: 'Push',
      caloriesBurnt: 420,
      exercises: [
        { name: 'Incline Dumbbell Chest Press', setsCompleted: 3, reps: '10-12' },
        { name: 'Dumbbell Shoulder Press', setsCompleted: 3, reps: '10' },
        { name: 'Dumbbell Lateral Raises', setsCompleted: 3, reps: '12-15' },
        { name: 'Tricep Overhead Extension', setsCompleted: 3, reps: '12' }
      ]
    });
    // Add Tuesday calories (1950 kcal eaten, 80 kcal steps + 420 kcal workout is auto-added)
    this.addCalorieLog(tuesdayStr, 'food', 1980, 'Low carb chicken rice & fruits');
    this.addCalorieLog(tuesdayStr, 'extra', 90, 'Walked to meetings');

    // Seed Wednesday (Today): Eaten so far (e.g. 1100 kcal)
    this.addCalorieLog(wednesdayStr, 'food', 1150, 'Breakfast and light lunch');
    this.addCalorieLog(wednesdayStr, 'extra', 50, 'Morning walk');
  }
};
