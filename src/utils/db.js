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

    // Auto mark attendance for this workout date
    this.setAttendance(newLog.date, true);

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
  // Cycle: Day1 → Day2 → Day3 → Day4 → Day5 → Day6 → Day7 → repeat
  getRecommendation() {
    const logs = this.getWorkoutLogs();
    if (logs.length === 0) {
      return 'Day1'; // Start with Day 1
    }

    // Sort logs descending, find most recent
    const sorted = [...logs].sort((a, b) => b.timestamp - a.timestamp);
    const lastCompleted = sorted[0].muscleGroup;

    const cycle = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'];
    const lastIndex = cycle.indexOf(lastCompleted);

    if (lastIndex === -1) {
      return 'Day1'; // Fallback
    }

    const nextIndex = (lastIndex + 1) % cycle.length;
    return cycle[nextIndex];
  },

  // Attendance management helpers
  getAttendance() {
    const raw = localStorage.getItem('vinfit_attendance');
    return raw ? JSON.parse(raw) : {};
  },

  saveAttendance(attendance) {
    localStorage.setItem('vinfit_attendance', JSON.stringify(attendance));
  },

  setAttendance(dateStr, status) {
    const att = this.getAttendance();
    if (status) {
      att[dateStr] = true;
    } else {
      delete att[dateStr];
    }
    this.saveAttendance(att);
  },

  toggleAttendance(dateStr) {
    const att = this.getAttendance();
    if (att[dateStr]) {
      delete att[dateStr];
    } else {
      att[dateStr] = true;
    }
    this.saveAttendance(att);
    return att;
  },

};

