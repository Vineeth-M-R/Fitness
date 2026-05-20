import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle2, Sparkles, X, ChevronDown } from 'lucide-react';
import { exerciseData } from '../utils/exerciseData';
import FormGuideModal from './FormGuideModal';

export default function WorkoutCard({
  recommendedMuscleGroup,
  activeMuscleGroup,
  setActiveMuscleGroup,
  onCompleteWorkout
}) {
  const workout = exerciseData[activeMuscleGroup];
  const [checkedItems, setCheckedItems] = useState({});
  const [showLogModal, setShowLogModal] = useState(false);
  const [caloriesBurnt, setCaloriesBurnt] = useState(workout.estimatedCalories);
  const [selectedExerciseForGuide, setSelectedExerciseForGuide] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleOutsideClick = () => setIsDropdownOpen(false);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isDropdownOpen]);

  // Reset checkboxes when switching muscle groups
  useEffect(() => {
    setCheckedItems({});
    setCaloriesBurnt(workout.estimatedCalories);
  }, [activeMuscleGroup, workout.estimatedCalories]);

  const handleCheckChange = (exerciseId) => {
    setCheckedItems(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const isAnyChecked = Object.values(checkedItems).some(Boolean);
  const totalExercisesCount = workout.exercises.length;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  const handleSubmitCompletion = (e) => {
    e.preventDefault();
    const completedExercises = workout.exercises
      .filter(ex => checkedItems[ex.id])
      .map(ex => ({ name: ex.name, reps: ex.reps }));

    onCompleteWorkout({
      muscleGroup: activeMuscleGroup,
      caloriesBurnt: parseInt(caloriesBurnt) || 0,
      exercises: completedExercises
    });

    setShowLogModal(false);
    setCheckedItems({});
  };

  return (
    <div className="glass-panel workout-card">
      {/* Panel Header */}
      <div className="panel-header" style={{ marginBottom: '16px' }}>
        <h2 className="panel-title" style={{ marginBottom: 0 }}>
          <Sparkles size={20} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
          Today's Workout
        </h2>

        {/* Muscle Selector */}
        <div className="custom-select-container">
          <button
            type="button"
            className="custom-select-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <span>
              {activeMuscleGroup === 'Mobility' ? 'CARDIO' : activeMuscleGroup.toUpperCase()}
            </span>
            <ChevronDown size={14} strokeWidth={1.5} style={{ color: 'var(--text-sub)' }} />
          </button>

          {isDropdownOpen && (
            <div className="custom-select-options">
              {[
                { value: 'Pull', label: 'PULL' },
                { value: 'Push', label: 'PUSH' },
                { value: 'Legs', label: 'LEGS' },
                { value: 'Core', label: 'CORE' },
                { value: 'Mobility', label: 'CARDIO' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`custom-select-option ${activeMuscleGroup === opt.value ? 'active' : ''}`}
                  onClick={() => {
                    setActiveMuscleGroup(opt.value);
                    setIsDropdownOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Muscle Banner */}
      <div className="workout-banner">
        <div className="workout-banner-header">
          <div>
            <h3 style={{ marginTop: '4px', fontSize: 'var(--text-lg)', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
              {workout.subtitle}
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 'var(--text-lg)', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              {workout.estimatedCalories} KCAL
            </p>
          </div>
        </div>
      </div>

      {/* Checklist Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ fontSize: 'var(--text-xs)', color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>
          Exercise Checklist ({completedCount}/{totalExercisesCount})
        </h4>

        <div className="exercise-list">
          {workout.exercises.map((ex) => (
            <div
              key={ex.id}
              className={`exercise-item ${checkedItems[ex.id] ? 'completed' : ''}`}
              onClick={() => handleCheckChange(ex.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="exercise-left">
                {/* Visual checkbox — purely decorative, click handled by parent row */}
                <span className={`chk-box ${checkedItems[ex.id] ? 'chk-checked' : ''}`} />

                <div className="exercise-details">
                  <span className="exercise-name">{ex.name}</span>
                  <div className="exercise-meta">
                    <span style={{ fontFamily: 'var(--font-body)' }}>{ex.sets} × {ex.reps}</span>
                  </div>
                </div>
              </div>

              {/* View Form Guide Button */}
              <button
                className="btn-icon-only"
                onClick={(e) => { e.stopPropagation(); setSelectedExerciseForGuide(ex); }}
                title="View form guide"
              >
                <Eye size={16} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom Button */}
      <button
        className={`btn btn-primary ${!isAnyChecked ? 'disabled' : ''}`}
        disabled={!isAnyChecked}
        onClick={() => setShowLogModal(true)}
        style={{ width: '100%', marginTop: '16px' }}
      >
        <CheckCircle2 size={18} strokeWidth={1.5} />
        Complete & Log Workout
      </button>

      {/* Form Guide Modal overlay */}
      {selectedExerciseForGuide && (
        <FormGuideModal
          exercise={selectedExerciseForGuide}
          onClose={() => setSelectedExerciseForGuide(null)}
        />
      )}

      {/* Completion Modal overlay */}
      {showLogModal && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="panel-title" style={{ margin: 0 }}>Log Your Progress</h3>
              <button className="close-btn" onClick={() => setShowLogModal(false)}>
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleSubmitCompletion}>
              <div className="modal-body">
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-sub)', lineHeight: '1.5', marginBottom: '16px' }}>
                  Awesome job completing the routine! Input your final calories burnt.
                </p>

                <div className="form-group">
                  <label className="form-label">Calories Burnt (kcal)</label>
                  <input
                    type="number"
                    className="input-control"
                    value={caloriesBurnt}
                    onChange={(e) => setCaloriesBurnt(Math.max(0, parseInt(e.target.value) || 0))}
                    required
                    min="0"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setShowLogModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Log Workout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
