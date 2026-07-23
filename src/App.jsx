import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Utensils, Flame, X } from 'lucide-react';

import { db, getCalorieTargets, getLocalDateString } from './utils/db';
import WorkoutCard from './components/WorkoutCard';
import CalorieTracker from './components/CalorieTracker';
import HistoryPanel from './components/HistoryPanel';
import AttendanceTracker from './components/AttendanceTracker';

export default function App() {
  const [profile, setProfile] = useState(() => db.getProfile());
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    // Clear old mock seeding if present to reset data cleanly
    if (localStorage.getItem('vinfit_first_seed') !== 'cleared') {
      localStorage.removeItem('vinfit_workout_logs');
      localStorage.removeItem('vinfit_calorie_logs');
      localStorage.setItem('vinfit_first_seed', 'cleared');
    }
    return db.getWorkoutLogs();
  });
  const [calorieLogs, setCalorieLogs] = useState(() => db.getCalorieLogs());
  const [attendance, setAttendance] = useState(() => db.getAttendance());
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'history'

  const [recommendedMuscleGroup, setRecommendedMuscleGroup] = useState(() => db.getRecommendation());
  const [activeMuscleGroup, setActiveMuscleGroup] = useState(recommendedMuscleGroup);

  // Calorie logging states
  const [showLogModal, setShowLogModal] = useState(false);
  const [logType, setLogType] = useState('food'); // 'food' or 'extra'
  const [caloriesAmount, setCaloriesAmount] = useState('');

  // Recalculate recommendation when workout logs change
  useEffect(() => {
    const rec = db.getRecommendation();
    setRecommendedMuscleGroup(rec);
    setActiveMuscleGroup(rec);
  }, [workoutLogs]);

  // Derived metrics
  const targets = getCalorieTargets(profile);
  const weeklyStats = db.getWeeklyDeficitStats();

  // Today's calorie logs
  const todayStr = new Date().toISOString().split('T')[0];
  const todayStats = calorieLogs[todayStr] || { food: 0, extra: 0, items: [] };

  const handleLogCalorie = ({ date, type, amount, note }) => {
    db.addCalorieLog(date, type, amount, note);
    setCalorieLogs(db.getCalorieLogs());
  };

  const handleOpenLog = (type) => {
    setLogType(type);
    setCaloriesAmount('');
    setShowLogModal(true);
  };

  const handleLogSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(caloriesAmount) || 0;
    if (amount <= 0) return;

    handleLogCalorie({
      date: getLocalDateString(),
      type: logType,
      amount,
      note: logType === 'food' ? 'Food Intake' : 'Activity Burn'
    });

    setShowLogModal(false);
  };

  const handleToggleAttendance = (dateStr) => {
    const updated = db.toggleAttendance(dateStr);
    setAttendance(updated);
  };

  const handleCompleteWorkout = (workoutData) => {
    db.addWorkoutLog(workoutData);

    // Update state to force recalculations
    setWorkoutLogs(db.getWorkoutLogs());
    setCalorieLogs(db.getCalorieLogs());
    setAttendance(db.getAttendance());

    // Automatically switch to history tab so they see it logged
    setActiveTab('history');
  };

  return (
    <div className="app-container">
      {/* App Header */}
      <header className="app-header">
        <div className="brand-section">
          <h1 className="brand-title">VINFIT</h1>
        </div>

        <div className="header-nav-container">
          {/* Quick Action Buttons */}
          <div className="header-actions">
            <button
              className="btn btn-ghost"
              onClick={() => handleOpenLog('food')}
              style={{ padding: '6px 10px', fontSize: '11px' }}
            >
              <Utensils size={14} strokeWidth={1.5} />
              Log Food
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => handleOpenLog('extra')}
              style={{ padding: '6px 10px', fontSize: '11px' }}
            >
              <Flame size={14} strokeWidth={1.5} />
              Log Activity
            </button>
          </div>
        </div>
      </header>

      {/* Main Tabs Router */}
      <main>
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            {/* Daily Active Workout Panel */}
            <WorkoutCard
              recommendedMuscleGroup={recommendedMuscleGroup}
              activeMuscleGroup={activeMuscleGroup}
              setActiveMuscleGroup={setActiveMuscleGroup}
              onCompleteWorkout={handleCompleteWorkout}
            />

            <div style={{ height: '32px' }} />

            {/* Attendance & Consistency Tracker */}
            <AttendanceTracker
              workoutLogs={workoutLogs}
              attendance={attendance}
              onToggleAttendance={handleToggleAttendance}
            />

            <div style={{ height: '32px' }} />

            {/* Calorie Progress Ring & Goal Bar */}
            <CalorieTracker
              profile={profile}
              targets={targets}
              weeklyStats={weeklyStats}
              todayStats={todayStats}
            />
          </div>
        )}

        {activeTab === 'history' && (
          <HistoryPanel
            workoutLogs={workoutLogs}
            calorieLogs={calorieLogs}
            targets={targets}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <button
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Sparkles size={24} strokeWidth={1.5} />
          <span>Dashboard</span>
        </button>
        <button
          className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Calendar size={24} strokeWidth={1.5} />
          <span>History</span>
        </button>
      </nav>

      {/* Logging Modal overlay */}
      {showLogModal && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="panel-title">
                {logType === 'food' ? (
                  <>
                    <Utensils size={18} strokeWidth={1.5} style={{ marginRight: '8px' }} />
                    <span>Calories Eaten</span>
                  </>
                ) : (
                  <>
                    <Flame size={18} strokeWidth={1.5} style={{ marginRight: '8px' }} />
                    <span>Calories Burnt</span>
                  </>
                )}
              </h3>
              <button className="close-btn" onClick={() => setShowLogModal(false)}>
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleLogSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Calorie Amount (kcal)</label>
                  <input
                    type="number"
                    className="input-control"
                    placeholder="e.g. 500"
                    value={caloriesAmount}
                    onChange={(e) => setCaloriesAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    required
                    min="1"
                    autoFocus
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setShowLogModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
