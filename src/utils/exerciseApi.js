// ExerciseDB API integration
// Free tier: 500 requests/month — https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb

const CACHE_KEY = 'vinfit_gif_cache';
const API_KEY_STORAGE = 'vinfit_rapidapi_key';

// Maps our exercise names → ExerciseDB search terms that reliably return results
const EXERCISE_NAME_MAP = {
  // Push A
  'Flat Bench Press':                  'barbell bench press',
  'Incline Dumbbell Press':            'incline dumbbell press',
  'Chest Fly / Cable Fly':             'cable fly',
  'Cable Tricep Pushdown':             'cable triceps pushdown',
  'Dumbbell Lateral Raises':           'dumbbell lateral raise',
  'Push-ups':                          'push-up',

  // Pull A
  'Pull-ups or Lat Pulldown':          'lat pulldown',
  'Seated Cable / Mid Row':            'seated cable row',
  'T-Bar Row':                         't bar row',
  'Face Pulls':                        'cable face pull',
  'Cable / Barbell Bicep Curls':       'barbell curl',
  'Hammer Curls':                      'dumbbell hammer curl',

  // Cardio + Core
  'Incline Walk or Cycling':           'walking',
  'Plank':                             'plank',
  'Mountain Climbers':                 'mountain climber',
  'Hanging Leg Raises / Crunches':     'hanging leg raise',

  // Push B
  'Overhead Press':                    'barbell overhead press',
  'Shoulder Press Machine':            'machine shoulder press',
  'Reverse Pec Deck / Rear Delt Fly':  'rear delt fly',
  'Shrugs':                            'barbell shrug',
  'Overhead Cable Tricep Extension':   'cable overhead tricep extension',

  // Pull B
  'Romanian Deadlift / Rack Pull':     'romanian deadlift',
  'Wide-Grip Lat Pulldown':            'lat pulldown',
  'Chest-Supported Row':               'incline dumbbell row',
  'Face Pulls / Rear Delt Cable Fly':  'cable face pull',
  'EZ-Bar or Cable Curls':             'ez barbell curl',

  // Legs
  'Barbell Squats / Hack Squats':      'barbell squat',
  'Romanian Deadlifts':                'romanian deadlift',
  'Walking Lunges':                    'dumbbell walking lunge',
  'Leg Extensions':                    'leg extension',
  'Leg Curls':                         'leg curl',
  'Standing Calf Raises':              'standing calf raise',
  'Incline Walk / Sled Push':          'sled push',

  // Rest
  'Light Walk or Stretching':          'walking',
  'Foam Rolling':                      'foam rolling',
};

function getCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); }
  catch { return {}; }
}

function setCache(cache) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); }
  catch {}
}

export function getApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || '';
}

export function setApiKey(key) {
  localStorage.setItem(API_KEY_STORAGE, key.trim());
}

export function clearGifCache() {
  localStorage.removeItem(CACHE_KEY);
}

export async function fetchExerciseGif(exerciseName) {
  const key = getApiKey();
  if (!key) return null;

  // Use the explicit mapping, fall back to lowercased name
  const searchTerm = EXERCISE_NAME_MAP[exerciseName]
    || exerciseName.toLowerCase().replace(/\s*\/\s*/g, ' ').replace(/[()–]/g, '').trim();

  const cache = getCache();
  if (cache[searchTerm]) return cache[searchTerm]; // cache hit

  try {
    const res = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(searchTerm)}?limit=1&offset=0`,
      {
        headers: {
          'x-rapidapi-key': key,
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        },
      }
    );

    if (!res.ok) {
      console.warn(`ExerciseDB: HTTP ${res.status} for "${searchTerm}"`);
      return null;
    }

    const data = await res.json();
    const gifUrl = data?.[0]?.gifUrl || null;

    if (gifUrl) {
      cache[searchTerm] = gifUrl;
      setCache(cache);
    }
    return gifUrl;
  } catch (err) {
    console.warn('ExerciseDB fetch error:', err);
    return null;
  }
}
