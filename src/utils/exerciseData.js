// Workout splits and exercises database optimized for IT professionals
// Focuses on posture correction (reversing desk-job slouch), chest-shaping (reducing gyno projection), and building a lean, shredded aesthetic.

export const exerciseData = {
  Pull: {
    subtitle: 'Back & Biceps',
    description: 'Combats rounded shoulders by strengthening the rhomboids, latissimus dorsi, and rear deltoids to pull your shoulder blades back into natural alignment.',
    colorClass: 'pull-theme',
    estimatedCalories: 380,
    exercises: [
      {
        id: 'pull_1',
        name: 'Single-Arm Dumbbell Rows',
        sets: '3 sets',
        reps: '10-12 reps / side',
        target: 'Upper Back & Lats',
        tag: 'Postural Base',
        description: 'Improves back width and unilateral stability. Pulling with one arm helps prevent muscular imbalances common from mouse/keyboard work.',
        formNotes: {
          setup: 'Place your left knee and left hand flat on a flat bench. Keep your right foot firmly on the floor. Your spine must remain flat, parallel to the bench, and your core braced.',
          grip: 'Hold the dumbbell in your right hand. Use a neutral grip (palm facing the bench). Let the weight hang straight down, keeping your neck neutral (look slightly forward, not down).',
          execution: 'Pull the dumbbell upward and backward toward your hip, not your chest. Keep your elbow tucked close to your torso. Squeeze your shoulder blade hard at the peak for 1 second.',
          safety: 'Avoid twisting your torso to "swing" the weight up. If your shoulder rotates upward or your chest turns, the weight is too heavy.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Grid Background -->
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Bench -->
          <line x1="40" y1="90" x2="160" y2="90" stroke="rgba(255,255,255,0.2)" stroke-width="4" />
          <line x1="50" y1="90" x2="50" y2="110" stroke="rgba(255,255,255,0.2)" stroke-width="4" />
          <line x1="150" y1="90" x2="150" y2="110" stroke="rgba(255,255,255,0.2)" stroke-width="4" />
          
          <!-- Silhouette / Spine (Neutral) -->
          <!-- Support Leg on Bench -->
          <path d="M 60,90 L 80,75 L 100,75" fill="none" stroke="#6b7280" stroke-width="4" stroke-linecap="round" />
          <!-- Floor Foot/Leg -->
          <path d="M 120,110 L 110,85 L 100,75" fill="none" stroke="#6b7280" stroke-width="4" stroke-linecap="round" stroke-dasharray="2,2"/>
          <!-- Flat Spine -->
          <line x1="100" y1="75" x2="150" y2="75" stroke="#10b981" stroke-width="5" stroke-linecap="round" />
          <!-- Head -->
          <circle cx="160" cy="73" r="7" fill="#6b7280" />
          
          <!-- Support Hand -->
          <line x1="140" y1="75" x2="140" y2="90" stroke="#6b7280" stroke-width="4" />
          
          <!-- Working Arm (Active Pull) -->
          <!-- Starting Position (Dotted) -->
          <path d="M 115,75 L 115,95" fill="none" stroke="rgba(255, 255, 255, 0.2)" stroke-width="3" stroke-linecap="round" stroke-dasharray="2,2" />
          <circle cx="115" cy="98" r="4" fill="rgba(255,255,255,0.2)" />
          
          <!-- Pulling Position (Solid Cyan) -->
          <path d="M 115,75 L 110,65 L 125,70" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round" />
          <circle cx="125" cy="70" r="5" fill="#38bdf8" />
          
          <!-- Motion Arrow -->
          <path d="M 115,90 Q 125,85 125,75" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" marker-end="url(#arrow)" />
          
          <!-- Safety Marker -->
          <text x="140" y="25" fill="#10b981" font-size="8" font-family="Inter" font-weight="bold">✓ Flat Spine (Neutral)</text>
          <text x="40" y="25" fill="#06b6d4" font-size="8" font-family="Inter" font-weight="bold">Pull to Hip</text>
        </svg>`
      },
      {
        id: 'pull_2',
        name: 'Lat Pulldowns',
        sets: '3 sets',
        reps: '10-12 reps',
        target: 'Latissimus Dorsi (Lats)',
        tag: 'V-Taper Builder',
        description: 'Builds width in the upper back. A wider upper back creates the visual illusion of a smaller, leaner waistline, helping you look shredded.',
        formNotes: {
          setup: 'Adjust the knee pad of the machine so your thighs are locked down. Sit tall and plant your feet flat on the floor.',
          grip: 'Grip the pulldown bar with an overhand grip (palms facing away), slightly wider than shoulder-width. Arms should be fully extended.',
          execution: 'Leap back slightly (10-15 degrees). Pull the bar down to your collarbone by driving your elbows down and back, squeezing your shoulder blades. Avoid using momentum.',
          safety: 'Do not pull the bar behind your neck. This causes severe shoulder joint stress and neck strain.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Seat/Frame -->
          <line x1="85" y1="85" x2="115" y2="85" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
          <line x1="100" y1="85" x2="100" y2="115" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
          <line x1="100" y1="15" x2="100" y2="35" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
          
          <!-- Lifter Skeleton -->
          <!-- Spine (Slight Lean Back) -->
          <path d="M 97,85 L 94,60 L 98,42" fill="none" stroke="#10b981" stroke-width="4" stroke-linecap="round"/>
          <circle cx="100" cy="35" r="7" fill="#6b7280" />
          
          <!-- Thigh Pad -->
          <circle cx="95" cy="73" r="4" fill="rgba(255,255,255,0.4)" />
          
          <!-- Arms pulling down -->
          <!-- Pulling Position (Solid Cyan) -->
          <path d="M 98,42 L 80,48 L 75,38" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round" />
          <path d="M 98,42 L 118,48 L 123,38" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round" />
          
          <!-- Pulldown Bar -->
          <line x1="70" y1="36" x2="128" y2="36" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
          
          <!-- Motion Arrows -->
          <path d="M 75,20 L 75,32" fill="none" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round" />
          <path d="M 123,20 L 123,32" fill="none" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round" />
          
          <text x="35" y="110" fill="#10b981" font-size="8" font-family="Inter">✓ Slight 15° Lean</text>
          <text x="125" y="110" fill="#fbbf24" font-size="8" font-family="Inter">Bar to Chest</text>
        </svg>`
      },
      {
        id: 'pull_3',
        name: 'Face Pulls',
        sets: '3 sets',
        reps: '15 reps',
        target: 'Rear Deltoids & Rotator Cuff',
        tag: 'Posture Corrector',
        description: 'Crucial for correcting "tech neck" and rounded shoulders. Strengthens the external rotators of the shoulder to pull the chest open.',
        formNotes: {
          setup: 'Attach a double-rope to a high cable pulley (or anchor a resistance band at forehead height). Step back until your arms are fully extended.',
          grip: 'Hold the rope with an overhand grip (thumbs pointing backward toward you) so your knuckles face each other.',
          execution: 'Pull the center of the rope straight toward your nose. As you pull back, flare your elbows out and pull your hands apart. Squeeze your rear delts and rotator cuffs at the end.',
          safety: 'Do not pull the weight with your lower back. Keep your knees slightly bent and core tight to remain stable.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Cable Machine / Anchor -->
          <line x1="30" y1="10" x2="30" y2="110" stroke="rgba(255,255,255,0.2)" stroke-width="3" />
          <!-- Pulley -->
          <circle cx="30" cy="40" r="5" fill="rgba(255,255,255,0.4)" />
          
          <!-- Cable line -->
          <line x1="30" y1="40" x2="115" y2="45" stroke="rgba(255,255,255,0.2)" stroke-dasharray="2,2" />
          <!-- Pulled Cable -->
          <line x1="30" y1="40" x2="135" y2="42" stroke="#06b6d4" stroke-width="2" />
          
          <!-- Lifter Skeleton (Staggered Stance) -->
          <!-- Legs -->
          <path d="M 140,110 L 145,85 L 140,65" fill="none" stroke="#6b7280" stroke-width="4" stroke-linecap="round" />
          <path d="M 160,110 L 155,85 L 145,85" fill="none" stroke="#6b7280" stroke-width="4" stroke-linecap="round" stroke-dasharray="2,2"/>
          <!-- Spine (Upright / Braced) -->
          <line x1="140" y1="65" x2="140" y2="42" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
          <circle cx="140" cy="33" r="6" fill="#6b7280" />
          
          <!-- Pulled Arm Position (Elbows High) -->
          <path d="M 140,42 L 150,38 L 132,42" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
          
          <!-- Cue Arrows -->
          <path d="M 148,34 Q 155,30 148,26" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"/>
          
          <text x="35" y="105" fill="#06b6d4" font-size="8" font-family="Inter">Hands to Ears / Flare Elbows</text>
          <text x="125" y="20" fill="#10b981" font-size="8" font-family="Inter">✓ Upright Torso</text>
        </svg>`
      },
      {
        id: 'pull_4',
        name: 'Bicep Hammer Curls',
        sets: '3 sets',
        reps: '12 reps / arm',
        target: 'Brachialis & Biceps',
        tag: 'Lean Muscle Tone',
        description: 'Develops thick, defined forearms and biceps. The hammer grip recruits the brachialis muscle, adding thick lean muscle that makes the arms look athletic.',
        formNotes: {
          setup: 'Stand tall with feet shoulder-width apart, holding a dumbbell in each hand. Keep your shoulders rolled back (chest out) and core braced.',
          grip: 'Hold dumbbells with a neutral grip (palms facing each other, thumb up like a hammer). Keep your wrists straight.',
          execution: 'Keeping your elbows pinned to your ribs, curl the dumbbells upward. Do not let your elbows flare forward or out. Squeeze at the top, then lower under control.',
          safety: 'Do not swing your hips or arch your back to swing the weights up. Keep your body completely static.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Lifter Body -->
          <!-- Legs -->
          <line x1="100" y1="85" x2="100" y2="115" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/>
          <!-- Spine (Upright) -->
          <line x1="100" y1="45" x2="100" y2="85" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
          <circle cx="100" cy="35" r="7" fill="#6b7280" />
          
          <!-- Upper Arm pinned to side -->
          <line x1="100" y1="48" x2="100" y2="70" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/>
          
          <!-- Forearm (Curled) -->
          <line x1="100" y1="70" x2="118" y2="55" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
          <circle cx="118" cy="55" r="5" fill="#38bdf8" /> <!-- Dumbbell -->
          
          <!-- Dotted Lowered Arm -->
          <line x1="100" y1="70" x2="100" y2="92" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-dasharray="2,2"/>
          <circle cx="100" cy="92" r="4" fill="rgba(255,255,255,0.2)" />
          
          <!-- Motion Curve -->
          <path d="M 103,88 A 18,18 0 0,0 115,62" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" />
          
          <text x="25" y="25" fill="#10b981" font-size="8" font-family="Inter">✓ Elbow Pinned to Ribs</text>
          <text x="25" y="38" fill="#f43f5e" font-size="8" font-family="Inter">✗ No Hip Swinging</text>
        </svg>`
      }
    ]
  },
  Push: {
    subtitle: 'Chest & Shoulders',
    description: 'Specifically targets the upper and middle chest to firm up the chest contour (reducing gyno/chest fat projections) and widens the shoulders to build an aesthetic V-taper.',
    colorClass: 'push-theme',
    estimatedCalories: 420,
    exercises: [
      {
        id: 'push_1',
        name: 'Incline Dumbbell Chest Press',
        sets: '3 sets',
        reps: '10-12 reps',
        target: 'Upper Pecs (Clavicular Head)',
        tag: 'Gyno Counter-Shape',
        description: 'Crucial for shaping the chest. Building the upper chest fibers "lifts" the pectoral area, creating a flat, firm chest that minimizes the visual protrusion of gyno/chest fat.',
        formNotes: {
          setup: 'Set an adjustable bench to a 30 to 45 degree incline. Lie back, pressing your shoulder blades firmly into the bench. Place feet flat on the floor.',
          grip: 'Hold dumbbells at your shoulders. Rotate your hands so your wrists are at a 45-degree angle (neutral/pronated hybrid), which is much safer for the shoulder joints.',
          execution: 'Press the dumbbells straight up over your upper chest, squeezing your pecs at the top. Lower the weights slowly until they are near the outer chest, keeping your elbows tucked at a 45-degree angle.',
          safety: 'Do not flare your elbows out to 90 degrees (forming a T-shape). This places intense pressure on the rotator cuff and anterior shoulders, leading to injury.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Incline Bench -->
          <line x1="50" y1="95" x2="150" y2="45" stroke="rgba(255,255,255,0.3)" stroke-width="5" stroke-linecap="round"/>
          <line x1="70" y1="85" x2="70" y2="110" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
          <line x1="120" y1="60" x2="120" y2="110" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
          
          <!-- Lifter Spine (Flat on Bench) -->
          <path d="M 70,85 L 110,65 L 130,55" fill="none" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
          <circle cx="135" cy="50" r="7" fill="#6b7280" />
          
          <!-- Active Pressing Arm (Extended Up) -->
          <!-- Shoulder is at 110, 65 -->
          <path d="M 110,65 L 118,40 L 110,20" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round" />
          <circle cx="110" cy="20" r="5" fill="#38bdf8" /> <!-- Dumbbell -->
          
          <!-- Lowered Position (Dotted) -->
          <path d="M 110,65 L 100,68 L 92,54" fill="none" stroke="rgba(255, 255, 255, 0.2)" stroke-width="3" stroke-dasharray="2,2" stroke-linecap="round" />
          <circle cx="92" cy="54" r="4" fill="rgba(255,255,255,0.2)" />
          
          <!-- Motion Line -->
          <path d="M 94,48 L 107,25" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" />
          
          <text x="25" y="25" fill="#06b6d4" font-size="8" font-family="Inter" font-weight="bold">Target Upper Pecs</text>
          <text x="125" y="105" fill="#10b981" font-size="8" font-family="Inter">✓ Elbows 45° Inward</text>
        </svg>`
      },
      {
        id: 'push_2',
        name: 'Decline Pushups',
        sets: '3 sets',
        reps: '10-15 reps',
        target: 'Lower Pecs & Core',
        tag: 'Chest Definition',
        description: 'Targets the lower pectoral boundary. Strengthening the lower chest creates a sharp muscular margin, separating the chest from the torso and flattening fatty tissue.',
        formNotes: {
          setup: 'Place your feet on a bench or chair, and your hands flat on the floor slightly wider than shoulder-width. Your body must form a completely straight line from heels to head.',
          grip: 'Spread your fingers wide on the floor to distribute the weight. Wrists should be under your shoulders when in the starting position.',
          execution: 'Lower your chest toward the floor, keeping your elbows tucked back (at 45 degrees, not flared). Push through your palms to return to the starting position, squeezing your chest.',
          safety: 'Do not let your hips sag toward the floor. Keep your core and glutes squeezed hard throughout the movement to protect your lower back.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Bench (Elevation) -->
          <rect x="35" y="70" width="30" height="40" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="3"/>
          
          <!-- Lifter Body (Decline angle) -->
          <!-- Feet on bench -->
          <!-- Spine / Body Line (Straight!) -->
          <path d="M 50,70 L 105,82 L 140,90" fill="none" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
          <circle cx="148" cy="92" r="6" fill="#6b7280"/>
          
          <!-- Working Arm (Pushing up) -->
          <path d="M 125,86 L 125,102 L 125,110" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round" />
          
          <!-- Lowered Position (Dotted body) -->
          <path d="M 50,70 L 105,94 L 140,105" fill="none" stroke="rgba(255, 255, 255, 0.15)" stroke-width="3" stroke-dasharray="2,2"/>
          
          <text x="75" y="30" fill="#10b981" font-size="8" font-family="Inter">✓ Core Engaged & Flat Spine</text>
          <text x="75" y="43" fill="#06b6d4" font-size="8" font-family="Inter">Focus Lower Chest Outline</text>
        </svg>`
      },
      {
        id: 'push_3',
        name: 'Dumbbell Lateral Raises',
        sets: '3 sets',
        reps: '12-15 reps',
        target: 'Lateral Deltoids (Side Shoulders)',
        tag: 'V-Taper & Broad Shoulders',
        description: 'Crucial for IT professionals. Building the side shoulders widens your upper body silhouette, creating a V-taper that visually slims your waist for a shredded look.',
        formNotes: {
          setup: 'Stand tall with feet shoulder-width, holding dumbbells at your sides, palms facing inward. Hinge forward very slightly at the hips (5 degrees).',
          grip: 'Grip dumbbells with a relaxed grip to avoid over-recruiting your forearms. Keep your wrists straight.',
          execution: 'Raise the dumbbells out to your sides in a wide arc. Keep a slight bend in your elbows. Lift until your arms are parallel to the floor, with your pinkies tilted slightly higher than your thumbs.',
          safety: 'Do not swing your torso or shrug your shoulders (recruiting the traps). If you feel this in your neck, lower the weight and focus on lifting with the elbows.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Lifter Front View -->
          <!-- Legs -->
          <line x1="90" y1="85" x2="90" y2="115" stroke="#6b7280" stroke-width="3"/>
          <line x1="110" y1="85" x2="110" y2="115" stroke="#6b7280" stroke-width="3"/>
          <!-- Torso -->
          <path d="M 90,85 L 85,50 L 115,50 L 110,85 Z" fill="rgba(255,255,255,0.05)" stroke="#10b981" stroke-width="3"/>
          <circle cx="100" cy="38" r="7" fill="#6b7280" />
          
          <!-- Active Raised Arm (Cyan) -->
          <path d="M 85,50 L 55,50 L 40,50" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
          <circle cx="40" cy="50" r="4" fill="#38bdf8" />
          
          <path d="M 115,50 L 145,50 L 160,50" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
          <circle cx="160" cy="50" r="4" fill="#38bdf8" />
          
          <!-- Lowered Position (Dotted) -->
          <path d="M 85,50 L 82,75 L 82,90" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-dasharray="2,2"/>
          <path d="M 115,50 L 118,75 L 118,90" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-dasharray="2,2"/>
          
          <!-- Motion Curves -->
          <path d="M 80,80 A 30,30 0 0,1 55,56" fill="none" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round" />
          <path d="M 120,80 A 30,30 0 0,0 145,56" fill="none" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round" />
          
          <text x="15" y="22" fill="#10b981" font-size="8" font-family="Inter">✓ Keep Shoulders Down</text>
          <text x="125" y="22" fill="#38bdf8" font-size="8" font-family="Inter">Lead with Elbows</text>
        </svg>`
      },
      {
        id: 'push_4',
        name: 'Tricep Overhead Extension',
        sets: '3 sets',
        reps: '12 reps',
        target: 'Triceps (Long Head)',
        tag: 'Arm Definition',
        description: 'Targets the long head of the tricep which is located on the back of the arm. Training this muscle creates a lean, muscular, athletic sweep to your upper arms.',
        formNotes: {
          setup: 'Stand tall with feet shoulder-width. Hold one dumbbell with both hands vertically overhead, cupping the inner plate with both palms.',
          grip: 'Form a diamond shape with your thumbs and index fingers, cupping the top handle of the dumbbell. Lock your wrists.',
          execution: 'Keeping your elbows pointing straight forward (close to your ears), slowly lower the dumbbell behind your head by bending only your elbows. Press the weight back up to full extension, squeezing your triceps.',
          safety: 'Do not flare your elbows out to the sides, as this shifts the load away from the triceps and onto the shoulder joint. Keep your core tight to avoid arching your lower back.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Lifter Skeleton -->
          <!-- Legs -->
          <line x1="100" y1="85" x2="100" y2="115" stroke="#6b7280" stroke-width="3"/>
          <!-- Spine (Upright, Core Braced) -->
          <line x1="100" y1="48" x2="100" y2="85" stroke="#10b981" stroke-width="4"/>
          <circle cx="100" cy="40" r="6" fill="#6b7280" />
          
          <!-- Active Arm (Solid Cyan - Elbow Bent behind head) -->
          <path d="M 100,48 L 105,25 L 94,30" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="94" cy="30" r="4.5" fill="#38bdf8"/> <!-- Dumbbell -->
          
          <!-- Extended Arm (Dotted) -->
          <path d="M 100,48 L 102,25 L 102,5" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-dasharray="2,2"/>
          <circle cx="102" cy="5" r="4.5" fill="rgba(255,255,255,0.2)"/>
          
          <text x="15" y="25" fill="#10b981" font-size="8" font-family="Inter">✓ Keep Core Braced</text>
          <text x="115" y="25" fill="#06b6d4" font-size="8" font-family="Inter">Elbows Pointing Forward</text>
        </svg>`
      }
    ]
  },
  Legs: {
    subtitle: 'Glutes & Hips',
    description: 'Slightly alters traditional leg days by focusing heavily on activating the glutes (which lie dormant from sitting all day) and stretching out tight, short hip flexors.',
    colorClass: 'legs-theme',
    estimatedCalories: 450,
    exercises: [
      {
        id: 'legs_1',
        name: 'Goblet Squats',
        sets: '3 sets',
        reps: '10-12 reps',
        target: 'Quads & Glutes',
        tag: 'Hip Opener',
        description: 'Builds lower body strength and mobility. Holding the weight in front allows a deeper squat with a vertical chest, opening the hips and building leg shape.',
        formNotes: {
          setup: 'Stand with feet slightly wider than shoulder-width, toes flared outward about 15 degrees. Hold a dumbbell vertically by one end against your chest ("goblet").',
          grip: 'Cup your palms under the top plate of the dumbbell, keeping it touching your sternum throughout. Keep your elbows tucked in pointing down.',
          execution: 'Sit your hips back and down like sitting in a low chair. Keep your chest tall and upper back tight. Descend until your thighs are parallel to the floor, pushing your knees outward. Press through your heels to stand.',
          safety: 'Do not let your knees cave inward (valgus collapse) or your lower back round at the bottom ("butt wink"). Keep your chest upright.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Lifter in Deep Squat -->
          <!-- Lower Leg -->
          <line x1="95" y1="110" x2="90" y2="85" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/>
          <!-- Thigh (Parallel to Floor) -->
          <line x1="90" y1="85" x2="120" y2="85" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
          <!-- Spine (Tilted forward but straight) -->
          <line x1="120" y1="85" x2="115" y2="52" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
          <circle cx="112" cy="45" r="6" fill="#6b7280" />
          
          <!-- Goblet Dumbbell at Chest -->
          <circle cx="122" cy="60" r="4.5" fill="#38bdf8"/>
          
          <!-- Motion Vector (Upward) -->
          <path d="M 125,82 L 125,65" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" />
          
          <text x="25" y="25" fill="#10b981" font-size="8" font-family="Inter">✓ Upright Chest</text>
          <text x="25" y="38" fill="#06b6d4" font-size="8" font-family="Inter">Thighs Parallel to Floor</text>
        </svg>`
      },
      {
        id: 'legs_2',
        name: 'Romanian Deadlifts (RDL)',
        sets: '3 sets',
        reps: '10-12 reps',
        target: 'Hamstrings & Glutes',
        tag: 'Posterior Chain',
        description: 'Targets the hamstrings and glutes while strengthening the lower back. Excellent for developing the back of your legs and correcting sitting pelvic tilts.',
        formNotes: {
          setup: 'Stand tall with feet hip-width, holding dumbbells in front of your thighs. Keep a very slight bend in your knees (do not lock them).',
          grip: 'Overhand grip (palms facing your thighs). Keep your arms straight and relaxed like cables.',
          execution: 'Hinge at your hips by pushing your butt backward. Keep the dumbbells sliding close down your legs. Lower until you feel a deep stretch in your hamstrings, then squeeze your glutes to stand.',
          safety: 'Do not round your lower back. Your back must remain flat like a tabletop. The movement comes from pushing your hips back, not bending your waist.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Hinging Lifter -->
          <!-- Legs (Almost straight) -->
          <path d="M 100,110 L 105,80" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/>
          <!-- Flat Spine (Hinged at 60 deg) -->
          <path d="M 105,80 L 138,62" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
          <circle cx="144" cy="58" r="6" fill="#6b7280" />
          
          <!-- Hanging Arms & Dumbbell -->
          <line x1="130" y1="65" x2="130" y2="85" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
          <circle cx="130" cy="85" r="4.5" fill="#38bdf8" />
          
          <!-- Hip Thrust direction arrow -->
          <path d="M 95,85 Q 98,75 105,80" fill="none" stroke="#8b5cf6" stroke-width="1.5" />
          
          <text x="25" y="25" fill="#10b981" font-size="8" font-family="Inter">✓ Flat Back (No Rounding)</text>
          <text x="25" y="38" fill="#fbbf24" font-size="8" font-family="Inter">Push Hips Backwards</text>
        </svg>`
      },
      {
        id: 'legs_3',
        name: 'Weighted Glute Bridges',
        sets: '3 sets',
        reps: '15 reps',
        target: 'Glutes (Gluteus Maximus)',
        tag: 'Dormant Glute Trigger',
        description: 'Specifically activates the glutes which undergo "gluteal amnesia" (deactivation) from sitting on them all day. Prevents lower back fatigue.',
        formNotes: {
          setup: 'Lie flat on your back with knees bent, feet flat on the floor, hip-width apart, and heels pulled close to your butt. Place a dumbbell across your hips.',
          grip: 'Hold the dumbbell with both hands to stabilize it on your hips during the lift.',
          execution: 'Drive through your heels to lift your hips off the floor until your body forms a straight line from your knees to your shoulders. Squeeze your glutes hard at the top for 2 seconds.',
          safety: 'Do not over-arch your lower back at the top. The lift should be driven by glute contraction, not lower back extension. Keep your ribs tucked.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Bridge Lifter -->
          <!-- Floor -->
          <line x1="30" y1="105" x2="170" y2="105" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
          
          <!-- Body forming bridge line -->
          <!-- Feet/Calf -->
          <line x1="60" y1="105" x2="70" y2="80" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/>
          <!-- Straight Line (Knee to Shoulder) -->
          <line x1="70" y1="80" x2="145" y2="100" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
          <!-- Head on floor -->
          <circle cx="152" cy="101" r="5" fill="#6b7280" />
          
          <!-- Weight on Hips (at 100, 88) -->
          <circle cx="100" cy="88" r="4.5" fill="#06b6d4" />
          
          <!-- Motion Indicator -->
          <path d="M 98,98 L 98,82" fill="none" stroke="#8b5cf6" stroke-width="2" marker-end="url(#arrow)"/>
          
          <text x="25" y="25" fill="#10b981" font-size="8" font-family="Inter">✓ Straight Line (Knee-Hip-Shoulder)</text>
          <text x="25" y="38" fill="#38bdf8" font-size="8" font-family="Inter">Squeeze Glutes at Top</text>
        </svg>`
      }
    ]
  },
  Core: {
    subtitle: 'Core & Spine',
    description: 'Stabilizes the lumbar spine and pelvis to prevent lower back pain from sitting, while building a tight, defined midsection.',
    colorClass: 'core-theme',
    estimatedCalories: 320,
    exercises: [
      {
        id: 'core_1',
        name: 'Dead Bugs',
        sets: '3 sets',
        reps: '10 reps / side',
        target: 'Transverse Abdominis (Deep Core)',
        tag: 'Anti-Extension',
        description: 'Recruits the deep abdominal wall. Teaches you to stabilize your spine using your core while moving your arms/legs, correcting lower back arches.',
        formNotes: {
          setup: 'Lie on your back. Raise your arms pointing straight at the ceiling, and bend your knees and hips to 90 degrees (shin parallel to floor).',
          grip: 'Hands free, fingers pointing up. Keep your wrists relaxed.',
          execution: 'Squeeze your abs and press your lower back flat into the floor. Slowly lower your right arm behind your head and your left leg straight out toward the floor. Hover 1 inch above floor, return, and alternate.',
          safety: 'Your lower back must not lift off the floor at any point. If it does, you are losing core tension and placing load on your spine. Do not extend the leg as low.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Lifter on Back -->
          <!-- Floor -->
          <line x1="30" y1="90" x2="170" y2="90" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
          
          <!-- Flat Back (Pressed to floor) -->
          <line x1="90" y1="90" x2="140" y2="90" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
          <circle cx="146" cy="86" r="5" fill="#6b7280"/>
          
          <!-- Raised Legs/Arms (Starting: 90 deg) -->
          <!-- Left Leg Extended (Cyan) -->
          <path d="M 90,90 L 70,90 L 45,90" fill="none" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
          <!-- Right Knee bent (Dotted) -->
          <path d="M 90,90 L 105,75 L 120,75" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-dasharray="2,2"/>
          
          <!-- Right Arm Extended behind (Cyan) -->
          <line x1="140" y1="90" x2="165" y2="90" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
          <!-- Left Arm pointing up (Dotted) -->
          <line x1="140" y1="90" x2="140" y2="65" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-dasharray="2,2"/>
          
          <text x="25" y="25" fill="#10b981" font-size="8" font-family="Inter">✓ Press Lower Back Flat into Floor</text>
          <text x="25" y="38" fill="#f43f5e" font-size="8" font-family="Inter">✗ No Arching Lower Back</text>
        </svg>`
      },
      {
        id: 'core_2',
        name: 'Plank (Forearms)',
        sets: '3 sets',
        reps: '30-45 second hold',
        target: 'Entire Core & Shoulder Stabilizers',
        tag: 'Anti-Rotation',
        description: 'Improves endurance of the core and shoulder girdles, critical for sitting endurance and maintaining an upright posture.',
        formNotes: {
          setup: 'Place your forearms on the floor, elbows directly under your shoulders. Extend your legs straight back, toes on floor.',
          grip: 'Clasp hands together or lay palms flat. Keep wrists neutral.',
          execution: 'Raise your hips so your body forms a straight line from heels to head. Squeeze your glutes, quads, and pull your belly button into your spine. Hold this static position.',
          safety: 'Do not let your hips sag down (hurts lower back) or push your butt up in the air. Keep your neck neutral looking down at your hands.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Floor -->
          <line x1="30" y1="100" x2="170" y2="100" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
          
          <!-- Forearm support -->
          <line x1="130" y1="100" x2="135" y2="85" stroke="#6b7280" stroke-width="4"/>
          
          <!-- Plank line -->
          <!-- Foot to Shoulder -->
          <line x1="50" y1="95" x2="135" y2="85" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
          <circle cx="142" cy="83" r="5" fill="#6b7280"/>
          
          <text x="25" y="25" fill="#10b981" font-size="8" font-family="Inter">✓ Straight Line (Head to Heels)</text>
          <text x="25" y="38" fill="#f43f5e" font-size="8" font-family="Inter">✗ Do Not Sag Hips</text>
        </svg>`
      }
    ]
  },
  Mobility: {
    subtitle: 'Cardio',
    description: 'A conditioning workout utilizing functional, multi-joint movements to burn active calories, grease joints, and release muscle tension.',
    colorClass: 'mobility-theme',
    estimatedCalories: 350,
    exercises: [
      {
        id: 'mobility_1',
        name: 'Dumbbell Thrusters',
        sets: '3 sets',
        reps: '10-12 reps',
        target: 'Full Body (Legs, Shoulders, Core)',
        tag: 'Aesthetic Conditioning',
        description: 'Combines a front squat with an overhead press. Highly metabolic movement that burns fat while shaping the lower body and shoulders.',
        formNotes: {
          setup: 'Stand with feet shoulder-width. Hold dumbbells at your shoulders, palms facing each other (neutral grip).',
          grip: 'Hold dumbbells securely with wrists stacked over elbows.',
          execution: 'Perform a squat. As you stand up, drive aggressively through your legs and use that momentum to press the dumbbells overhead. Lower weights back to shoulders as you descend.',
          safety: 'Ensure your knees track in line with your toes. Do not let your chest collapse forward in the squat.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Thruster Mid-Push Skeleton -->
          <!-- Legs (Knees bent slightly pushing up) -->
          <path d="M 100,110 L 95,95 L 105,82" stroke="#6b7280" stroke-width="4" stroke-linecap="round" fill="none"/>
          <!-- Spine -->
          <line x1="105" y1="82" x2="105" y2="50" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
          <circle cx="105" cy="42" r="6" fill="#6b7280"/>
          
          <!-- Pressing Arms (Halfway extended) -->
          <path d="M 105,50 L 90,45 L 85,30" stroke="#06b6d4" stroke-width="4" stroke-linecap="round" fill="none"/>
          <circle cx="85" cy="30" r="4" fill="#38bdf8"/>
          
          <path d="M 105,50 L 120,45 L 125,30" stroke="#06b6d4" stroke-width="4" stroke-linecap="round" fill="none"/>
          <circle cx="125" cy="30" r="4" fill="#38bdf8"/>
          
          <text x="25" y="25" fill="#10b981" font-size="8" font-family="Inter">✓ Move in One Fluid Motion</text>
        </svg>`
      },
      {
        id: 'mobility_2',
        name: 'Kettlebell Swings',
        sets: '3 sets',
        reps: '15 reps',
        target: 'Posterior Chain (Glutes, Hamstrings, Core)',
        tag: 'Fat Loss Catalyst',
        description: 'An explosive hip hinge. Activates the glutes and hamstrings while driving up your heart rate for massive calorie burning.',
        formNotes: {
          setup: 'Stand with feet wider than shoulder-width, a kettlebell on the floor in front of you. Hinge at your hips to grab the handle.',
          grip: 'Use a firm double-overhand grip on the handle. Keep your arms loose like ropes.',
          execution: 'Hike the kettlebell back between your thighs. Snap your hips forward explosively, squeezing your glutes to swing the bell to chest height. Let it fall back down naturally into the hinge.',
          safety: 'Do not squat the weight or lift it with your shoulders. The power must come entirely from your hips.'
        },
        svg: `<svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" fill="url(#grid)" rx="8" />
          
          <!-- Swinger Hinge -->
          <path d="M 80,110 L 85,80 L 115,65" stroke="#6b7280" stroke-width="4" stroke-linecap="round" fill="none"/>
          <circle cx="120" cy="60" r="6" fill="#6b7280" />
          
          <!-- Swung Weight & Arms -->
          <line x1="110" y1="68" x2="140" y2="68" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
          <circle cx="140" cy="68" r="6.5" fill="#38bdf8"/> <!-- KB -->
          
          <!-- Arrow showing swing arc -->
          <path d="M 115,90 Q 140,85 140,75" fill="none" stroke="#8b5cf6" stroke-width="2"/>
          
          <text x="25" y="25" fill="#10b981" font-size="8" font-family="Inter">✓ Snap Hips to Stand</text>
        </svg>`
      }
    ]
  }
};
