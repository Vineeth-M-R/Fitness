import React, { useState } from 'react';
import { Flame, Utensils, Award, BookOpen, AlertCircle } from 'lucide-react';

export default function HistoryPanel({ workoutLogs, calorieLogs, targets }) {
  const [activeSubTab, setActiveSubTab] = useState('workouts');

  const sortedWorkoutLogs = [...workoutLogs].sort((a, b) => b.timestamp - a.timestamp);

  // Group calorie items by date descending
  const calorieDates = Object.keys(calorieLogs).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="glass-panel">
      {/* Panel Header */}
      <div className="panel-header" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Sub-Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn ${activeSubTab === 'workouts' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveSubTab('workouts')}
            style={{ padding: '6px 12px', fontSize: '11px' }}
          >
            Workouts
          </button>
          <button
            className={`btn ${activeSubTab === 'calories' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveSubTab('calories')}
            style={{ padding: '6px 12px', fontSize: '11px' }}
          >
            Calories
          </button>
        </div>
      </div>

      {/* Workout Logs List */}
      {activeSubTab === 'workouts' && (
        <div className="history-list" style={{ maxHeight: '420px', overflowY: 'auto' }}>
          {sortedWorkoutLogs.length === 0 ? (
            <div className="empty-state">
              <AlertCircle size={24} strokeWidth={1.5} />
              <span>NO WORKOUTS RECORDED YET.</span>
            </div>
          ) : (
            sortedWorkoutLogs.map((log) => (
              <div key={log.id} className="history-item">
                <div className="history-left">
                  <span className="history-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={14} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
                    {log.muscleGroup} SPLIT COMPLETED
                  </span>
                  <span className="history-date">
                    {new Date(log.timestamp).toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                <div className="history-right">
                  <span className="history-badge">
                    -{log.caloriesBurnt} KCAL
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Calorie Logs List */}
      {activeSubTab === 'calories' && (
        <div className="history-list" style={{ maxHeight: '420px', overflowY: 'auto' }}>
          {calorieDates.length === 0 ? (
            <div className="empty-state">
              <AlertCircle size={24} strokeWidth={1.5} />
              <span>NO CALORIES LOGGED YET.</span>
            </div>
          ) : (
            calorieDates.map((dateStr) => {
              const dayLog = calorieLogs[dateStr];
              const netDeficit = dayLog.food > 0 ? (targets.tdee + dayLog.extra) - dayLog.food : dayLog.extra;

              return (
                <div key={dateStr} className="history-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                    <span className="history-date" style={{ fontWeight: '600', color: 'var(--text)' }}>
                      {new Date(dateStr).toLocaleDateString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>

                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: '600',
                        color: netDeficit >= targets.dailyDeficitTarget ? 'var(--success)' : 'var(--accent)',
                        background: 'transparent',
                        padding: 0
                      }}
                    >
                      {netDeficit > 0 ? `DEFICIT: ${netDeficit} KCAL` : `SURPLUS: ${Math.abs(netDeficit)} KCAL`}
                    </span>
                  </div>

                  {/* Calories In and Burnt Summary */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-sub)'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Utensils size={14} strokeWidth={1.5} style={{ color: 'var(--danger)' }} />
                        <span>Calories In</span>
                      </span>
                      <span style={{ fontWeight: '600', color: 'var(--text)' }}>
                        {dayLog.food} kcal
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-sub)'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Flame size={14} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
                        <span>Calories Burnt</span>
                      </span>
                      <span style={{ fontWeight: '600', color: 'var(--text)' }}>
                        {targets.tdee + dayLog.extra} kcal
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
