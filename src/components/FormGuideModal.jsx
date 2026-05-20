import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Key, Loader } from 'lucide-react';
import { fetchExerciseGif, getApiKey, setApiKey, clearGifCache } from '../utils/exerciseApi';

const FORM_TIPS = {
  'Flat Bench Press':                  ['Retract shoulder blades before unracking', 'Bar path: slight arc to lower chest', 'Keep wrists stacked over elbows', 'Feet flat on floor, arch natural'],
  'Incline Dumbbell Press':            ['Set bench to 30–45°', 'Dumbbells at chest level, elbows at 75°', 'Press up and slightly inward', 'Control the descent — 2–3 sec'],
  'Chest Fly / Cable Fly':             ['Slight bend in elbows throughout', 'Stretch fully at bottom, squeeze hard at top', 'Lead with elbows, not wrists', 'Keep core braced, no arching'],
  'Cable Tricep Pushdown':             ['Elbows pinned to sides — they don\'t move', 'Full extension at bottom, squeeze', 'Keep torso slightly leaned forward', 'Don\'t use body momentum'],
  'Dumbbell Lateral Raises':           ['Lead with elbows, not wrists', 'Slight forward lean (10–15°)', 'Stop at shoulder height', 'Slow controlled descent'],
  'Push-ups':                          ['Body is a straight plank', 'Elbows track at ~45° from torso', 'Full chest-to-floor depth', 'Don\'t let hips sag or rise'],
  'Pull-ups or Lat Pulldown':          ['Start with a dead hang, scapula depressed', 'Pull elbows down and back', 'Chin over bar / bar to upper chest', 'Slow 3-sec negative'],
  'Seated Cable / Mid Row':            ['Chest up, slight arch in lower back', 'Pull handle to lower sternum', 'Squeeze shoulder blades together at peak', 'Full stretch on return'],
  'T-Bar Row':                         ['Hip-hinge: hips back, neutral spine', 'Elbows close to body', 'Pull to lower chest / upper abs', 'No jerking — controlled pull'],
  'Face Pulls':                        ['Cable at eye level or above', 'Pull to forehead, elbows high', 'External rotate at peak — show biceps', 'Key for rear delt and rotator cuff health'],
  'Cable / Barbell Bicep Curls':       ['Elbows stay pinned to sides', 'Full ROM: full extension to full peak', 'Squeeze hard at top', 'Don\'t swing the torso'],
  'Hammer Curls':                      ['Neutral grip (palms facing each other)', 'Slow controlled curl', 'Targets brachialis and forearm', 'Keep upper arms still'],
  'Incline Walk or Cycling':           ['Moderate pace: conversational but breathing elevated', 'Zone 2 cardio — fat burning range', 'No holding handrails on treadmill', 'Incline: 10–15° for max glute activation'],
  'Plank':                             ['Forearms or hands, shoulders over wrists', 'Hips level — no piking or sagging', 'Squeeze glutes and abs', 'Breathe steadily throughout'],
  'Mountain Climbers':                 ['Hips stay level, don\'t bounce', 'Drive knee toward chest, alternate fast', 'Keep core braced throughout', 'Shoulders over wrists'],
  'Hanging Leg Raises / Crunches':     ['Dead hang: full arm extension', 'Raise legs using hip flexors, not momentum', 'Pause at top, slow descent', 'For crunches: exhale on the curl-up'],
  'Overhead Press':                    ['Bar starts at upper chest/clavicle', 'Drive head back as bar passes face', 'Lock out overhead — full extension', 'Core braced, no lower-back lean'],
  'Shoulder Press Machine':            ['Adjust seat so handles align with shoulders', 'Full press to lockout', 'Controlled return to ear level', 'Don\'t shrug — keep traps relaxed'],
  'Reverse Pec Deck / Rear Delt Fly':  ['Set arms at shoulder height', 'Keep slight bend in elbows', 'Drive elbows back and apart', 'Squeeze rear delts at peak — hold 1 sec'],
  'Shrugs':                            ['Heavy weight, straight arms', 'Shrug vertically — no rolling', 'Hold at top for 1 sec', 'Full depression at the bottom'],
  'Overhead Cable Tricep Extension':   ['Cable overhead: face away from stack', 'Hinge at elbow only', 'Full extension — lockout firmly', 'Keep elbows close to head'],
  'Romanian Deadlift / Rack Pull':     ['Hinge at hips, soft knee bend', 'Bar stays close — drags down the shins', 'Neutral spine — no rounding', 'Feel deep hamstring stretch at bottom'],
  'Wide-Grip Lat Pulldown':            ['Wide overhand grip, slightly wider than shoulder', 'Lean back 5–10°, pull to upper chest', 'Lead with elbows, not hands', 'Squeeze lats hard at bottom'],
  'Chest-Supported Row':               ['Chest firm on pad throughout', 'Pull elbows back and up', 'Eliminates lower back involvement', 'Full stretch at bottom, squeeze at top'],
  'Face Pulls / Rear Delt Cable Fly':  ['Cable at eye level or above', 'Pull to forehead, elbows high and wide', 'Key for shoulder health and posture'],
  'EZ-Bar or Cable Curls':            ['EZ-bar reduces wrist strain', 'Elbows stay pinned to sides', 'Full ROM both directions', 'Slow eccentric (3 sec down)'],
  'Barbell Squats / Hack Squats':      ['Bar on mid-trap, not neck', 'Brace core before descent', 'Knees track over toes', 'Depth: parallel or below'],
  'Romanian Deadlifts':                ['Hinge at hips, bar stays close', 'Soft knee bend throughout', 'Feel deep hamstring stretch', 'Drive hips forward to stand'],
  'Walking Lunges':                    ['Step long enough for 90° knee bend', 'Front knee doesn\'t pass toes', 'Torso upright, core braced', 'Push through front heel to rise'],
  'Leg Extensions':                    ['Full extension — squeeze quad at top', 'Slow 3-sec return', 'Don\'t swing or use momentum', 'Adjust pad to sit on ankles'],
  'Leg Curls':                         ['Hips pressed down on pad', 'Curl fully — hamstring contracts', 'Slow eccentric return', 'Don\'t arch lower back'],
  'Standing Calf Raises':              ['Full range: deep stretch to full rise', 'Pause and squeeze at top', 'Slow controlled descent', 'One or both legs'],
  'Incline Walk / Sled Push':          ['Optional finisher — low intensity', 'Keeps heart rate elevated for extra burn', 'Great for active recovery from squats'],
  'Light Walk or Stretching':          ['Keep it easy — this is recovery', 'Focus on mobility and blood flow', 'No intensity today'],
  'Foam Rolling':                      ['Roll slowly — pause on tight spots', 'Focus on glutes, quads, upper back', 'Breathe into the tension'],
  'Sleep 7–9 hrs':                     ['Muscle grows during sleep — prioritize this', 'Consistent sleep time matters most', 'Dark, cool room for deep sleep'],
  'Hydration (3L water)':              ['Spread throughout the day', 'Add electrolytes if sweating heavily', 'Monitor urine colour: pale yellow = good'],
};

export default function FormGuideModal({ exercise, onClose }) {
  const [gifUrl, setGifUrl] = useState(null);
  const [gifLoading, setGifLoading] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyDraft, setKeyDraft] = useState('');
  const [hasKey, setHasKey] = useState(!!getApiKey());

  const tips = FORM_TIPS[exercise?.name] || ['Focus on controlled form', 'Full range of motion', 'Quality over quantity'];

  useEffect(() => {
    if (!exercise || !hasKey) return;
    setGifLoading(true);
    setGifUrl(null);
    fetchExerciseGif(exercise.name).then(url => {
      setGifUrl(url);
      setGifLoading(false);
    });
  }, [exercise?.name, hasKey]);

  if (!exercise) return null;

  const handleSaveKey = () => {
    if (!keyDraft.trim()) return;
    clearGifCache(); // wipe stale results so new key re-fetches with correct mappings
    setApiKey(keyDraft);
    setHasKey(true);
    setShowKeyInput(false);
  };

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
              {exercise.sets} {exercise.reps}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              className="btn-icon-only"
              title={hasKey ? 'Change API key' : 'Add API key for exercise GIFs'}
              onClick={() => setShowKeyInput(!showKeyInput)}
              style={{ color: hasKey ? 'var(--accent)' : 'var(--text-sub)' }}
            >
              <Key size={16} strokeWidth={1.5} />
            </button>
            <button className="close-btn" onClick={onClose}>
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* API Key Input */}
        {showKeyInput && (
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg)', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="input-control"
              placeholder="Paste RapidAPI key…"
              value={keyDraft}
              onChange={e => setKeyDraft(e.target.value)}
              style={{ flex: 1, fontSize: 'var(--text-xs)', padding: '6px 10px' }}
              autoFocus
            />
            <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 'var(--text-xs)' }} onClick={handleSaveKey}>
              Save
            </button>
          </div>
        )}

        {/* GIF Area */}
        <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!hasKey ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-sub)' }}>
              <Key size={28} strokeWidth={1} style={{ marginBottom: '12px', color: 'var(--muted)' }} />
              <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>
                Add a free <strong style={{ color: 'var(--text)' }}>RapidAPI key</strong> to unlock exercise GIFs.
                <br />
                <a
                  href="https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--accent)', textDecoration: 'none' }}
                >
                  Get free key →
                </a>
              </p>
              <button
                className="btn btn-ghost"
                style={{ marginTop: '12px', padding: '6px 14px', fontSize: 'var(--text-xs)' }}
                onClick={() => setShowKeyInput(true)}
              >
                + Add Key
              </button>
            </div>
          ) : gifLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: 'var(--text-sub)' }}>
              <Loader size={24} strokeWidth={1.5} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)' }}>Loading GIF…</span>
            </div>
          ) : gifUrl ? (
            <img
              src={gifUrl}
              alt={exercise.name}
              style={{ width: '100%', maxHeight: '260px', objectFit: 'contain', display: 'block' }}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-sub)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)' }}>
              GIF not found — check form cues below.
            </div>
          )}
        </div>

        {/* Form Cues */}
        <div className="modal-body">
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
