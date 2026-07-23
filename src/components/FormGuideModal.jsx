import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

const FORM_TIPS = {
  // Day 1
  'Pull-ups / lat pulldown (wide grip)': ['Start with a dead hang, scapula depressed', 'Pull elbows down and back', 'Chin over bar / bar to upper chest', 'Slow 3-sec negative'],
  'Barbell or dumbbell row':           ['Hinge at hips, keep back flat & parallel to floor', 'Pull elbows back to hip pocket', 'Squeeze lats & mid-back at the peak', 'Don\'t bounce or use momentum'],
  'Face pulls':                       ['Cable at eye level or above', 'Pull to forehead, elbows high & wide', 'External rotate at peak — show biceps', 'Key for rear delts and rotator cuff'],
  'Lateral raises':                   ['Lead with elbows, not wrists', 'Slight forward lean (10–15°)', 'Stop at shoulder height', 'Slow controlled descent'],
  'Hanging leg raise':                ['Dead hang: full arm extension', 'Raise legs using abs, not hip flexor momentum', 'Pause at top, slow descent', 'Control body swing'],
  
  // Day 2
  'Squat or leg press':               ['Squat: feet shoulder width, knees track toes', 'Keep chest high, brace core', 'Depth: hips parallel to knees or lower', 'Leg press: don\'t lock knees at top'],
  'Romanian deadlift':                ['Hinge at hips, soft knee bend', 'Bar stays close — drag down the shins', 'Neutral spine — no rounding', 'Feel deep hamstring stretch at bottom'],
  'Walking lunges(per leg)':          ['Step long enough for 90° knee bend', 'Front knee doesn\'t pass toes', 'Torso upright, core braced', 'Push through front heel to rise'],
  'Calf raises':                      ['Full range: deep stretch to full rise', 'Pause and squeeze at top', 'Slow controlled descent', 'Don\'t bounce at bottom'],

  // Day 3 & 6 (Cardio & Flexibility)
  'Incline treadmill walk':           ['Zone 2 active recovery walk', 'Incline: 8-12%, Speed: 5-5.5 km/h', 'Do not hold onto handrails', 'Engage glutes & calves with each step'],
  'Hip flexor stretch':               ['Kneeling lunge position', 'Squeeze glute of back leg, tuck pelvis', 'Lean forward slightly to feel hip stretch', 'Hold for 30s per side, do not bounce'],
  'Hamstring stretch':                ['Extend one leg forward, heel down, toes up', 'Hinge forward at hips with flat back', 'Keep chest high to target hamstrings', 'Hold for 30s per side'],
  'Pigeon pose or figure-4 stretch':  ['Figure-4: ankle on opposite knee, pull knee in', 'Pigeon: front shin parallel to front of mat', 'Keep hips square, lower torso forward', 'Feel deep stretch in outer glute'],
  'Standing quad stretch':            ['Stand tall, hold wall for balance', 'Pull heel toward glute, knees together', 'Push hips forward slightly to increase stretch', 'Hold for 30s per side'],
  'Doorway chest stretch':            ['Forearms on door frame, elbows at 90°', 'Step forward slowly until chest stretch felt', 'Keep shoulders relaxed down', 'Hold for 30s per side'],
  'Cross-body shoulder stretch':      ['Pull one arm straight across chest', 'Hook with other arm below elbow, pull in', 'Relax shoulder down away from ear', 'Hold for 30s per side'],
  'Thoracic spine rotation':          ['On hands & knees, one hand behind head', 'Rotate elbow up to ceiling, open chest', 'Follow elbow with eyes, return to start', '8-10 slow reps per side'],
  'Cat-cow':                          ['Hands under shoulders, knees under hips', 'Cow: drop belly, lift chest & tailbone', 'Cat: round back, tuck chin, push floor away', 'Move slowly, sync with breath (8-10 reps)'],
  'Child\'s pose':                     ['Knees wide, big toes touch, sit hips back', 'Extend arms forward, rest forehead on floor', 'Focus on deep belly breathing & relaxing', 'Hold for 45-60s, just breathe'],

  // Day 4
  'Overhead press':                   ['Bar starts at upper chest/clavicle', 'Drive head back as bar passes face', 'Lock out overhead — full extension', 'Core braced, no lower-back lean'],
  'Incline dumbbell press':           ['Set bench to 30–45°', 'Dumbbells at chest level, elbows at 75°', 'Press up and slightly inward', 'Control the descent — 2–3 sec'],
  'Plank':                            ['Forearms, shoulders directly over elbows', 'Hips level — no piking or sagging', 'Squeeze glutes & core tight', 'Breathe steadily throughout'],

  // Day 5
  'Deadlift':                         ['Feet hip-width, bar over mid-foot', 'Flat back, pull slack out of bar', 'Push floor away with legs to start', 'Lockout with glutes at top, don\'t lean back'],
  'Goblet squat':                     ['Hold dumbbell vertically at chest', 'Feet shoulder width, elbows inside knees', 'Keep chest up, brace abs', 'Squat deep, drive through heels'],
  'Farmer\'s carry':                  ['Hold heavy weights at sides, stand tall', 'Brace core, pack shoulders back', 'Walk in straight line, short controlled steps', 'Maintain perfect posture'],
  'Core':                             ['Focus on quality contraction', 'Control movement: slow and stable', 'Exhale completely at contraction peak'],

  // Day 7
  'Sleep 7–9 hrs':                    ['Muscle grows during sleep — prioritize this', 'Consistent sleep time matters most', 'Dark, cool room for deep sleep'],
  'Hydration (3L water)':             ['Spread throughout the day', 'Add electrolytes if sweating heavily', 'Monitor urine colour: pale yellow = good'],
};

const EXERCISE_VIDEOS = {
  // Day 1
  'Pull-ups / lat pulldown (wide grip)': 'https://www.youtube.com/embed/HWGntttgJQw',
  'Barbell or dumbbell row': 'https://www.youtube.com/embed/19zj6UZwBNc',
  'Face pulls': 'https://www.youtube.com/embed/qEyoBOpvqR4',
  'Lateral raises': 'https://www.youtube.com/embed/apeimq7k7Ao',
  'Hanging leg raise': 'https://www.youtube.com/embed/k9bD_NyVBnQ',

  // Day 2
  'Squat or leg press': 'https://www.youtube.com/embed/Q-5a-UaX5Vc',
  'Romanian deadlift': 'https://www.youtube.com/embed/DMF-qDc2ga0',
  'Walking lunges(per leg)': 'https://www.youtube.com/embed/iVPbhvDYpcM',
  'Calf raises': 'https://www.youtube.com/embed/EIFJiIuoFbk',

  // Day 4
  'Overhead press': 'https://www.youtube.com/embed/0YYeELi896g',
  'Incline dumbbell press': 'https://www.youtube.com/embed/PGXDLiwBT1I',
  'Plank': 'https://www.youtube.com/embed/9vcUuZPUOQs',

  // Day 5
  'Deadlift': 'https://www.youtube.com/embed/ad8DpXbOXgk',
  'Goblet squat': 'https://www.youtube.com/embed/yGswPtbSlro?start=39',
  'Farmer\'s carry': 'https://www.instagram.com/reel/DTQ_joYjBAz/embed/',
  'Core': 'https://www.youtube.com/embed/C3Yd6NL9f20',

  // Flexibility
  'Hip flexor stretch': 'https://www.youtube.com/embed/tsGPYSQbZx4',
  'Hamstring stretch': 'https://www.youtube.com/embed/5P3E8Pec_L8',
  'Pigeon pose or figure-4 stretch': 'https://www.youtube.com/embed/wePPX_zzYKY',
  'Standing quad stretch': 'https://www.youtube.com/embed/kzAsm4WQqvQ',
  'Cross-body shoulder stretch': 'https://www.youtube.com/embed/-1K0m5ywRcY',
  'Thoracic spine rotation': 'https://www.youtube.com/embed/76TrGccD9r4',
  'Cat-cow': 'https://www.youtube.com/embed/XHuVZGt6I80',
  'Child\'s pose': 'https://www.youtube.com/embed/kH12QrSGedM'
};

export default function FormGuideModal({ exercise, onClose }) {
  if (!exercise) return null;

  const tips = FORM_TIPS[exercise.name] || ['Focus on controlled form', 'Full range of motion', 'Quality over quantity'];
  const videoUrl = EXERCISE_VIDEOS[exercise.name];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>

        {/* Header */}
        <div className="modal-header">
          <div style={{ flex: 1 }}>
            <h3 className="panel-title" style={{ fontSize: 'var(--text-lg)', margin: 0 }}>
              {exercise.name}
            </h3>
            <span style={{ display: 'block', fontSize: 'var(--text-xs)', marginTop: '4px', color: 'var(--text-sub)', fontFamily: 'var(--font-body)' }}>
              {exercise.sets} × {exercise.reps}
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Video Player & Form Cues */}
        <div className="modal-body">
          {videoUrl && (
            <div className="video-player-container" style={{ width: '100%', aspectRatio: '16/9', marginBottom: '16px', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border)', background: '#000' }}>
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title={exercise.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: '100%', height: '100%' }}
              ></iframe>
            </div>
          )}

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-sub)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
            Form Cues
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={14} strokeWidth={1.5} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)', color: 'var(--text)', lineHeight: '1.5' }}>
                  {tip}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>Got it</button>
        </div>
      </div>
    </div>
  );
}
