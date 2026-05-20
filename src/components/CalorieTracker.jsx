import React from 'react';
import { Flame } from 'lucide-react';

export default function CalorieTracker({
  profile,
  targets,
  weeklyStats,
  todayStats
}) {
  // Daily math calculations
  const tdee = targets.tdee;
  const foodIn = todayStats.food || 0;
  const extraOut = todayStats.extra || 0;
  const totalOut = tdee + extraOut;
  const currentDeficit = foodIn > 0 ? (totalOut - foodIn) : extraOut;
  const dailyDeficitTarget = targets.dailyDeficitTarget;

  // Circle coordinates
  const radius = 60;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  // If currentDeficit is negative (surplus), offset is full circumference
  const dashOffset = currentDeficit > 0
    ? circumference - (Math.min(currentDeficit, dailyDeficitTarget) / dailyDeficitTarget) * circumference
    : circumference;

  return (
    <div className="glass-panel calorie-overview">
      <h2 className="panel-title" style={{ margin: 0 }}>
        <Flame size={20} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
        Calorie Counter
      </h2>

      {/* Daily Progress Circular Ring */}
      <div className="calorie-circle-container">
        <svg width="150" height="150" className="calorie-svg-ring">
          <circle
            cx="75"
            cy="75"
            r={radius}
            strokeWidth={strokeWidth}
            className="calorie-circle-bg"
          />
          <circle
            cx="75"
            cy="75"
            r={radius}
            strokeWidth={strokeWidth}
            className="calorie-circle-progress"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>

        <div className="calorie-circle-text">
          <span className="calorie-val" style={{ color: 'var(--accent)' }}>
            {currentDeficit}
          </span>
        </div>
      </div>

      {/* Weekly Deficit Fat Loss Progress Bar */}
      <div className="weekly-progress-card">
        <div className="weekly-header">
          <span className="weekly-target-lbl">Weekly Deficit</span>
          <span className="weekly-percent">{weeklyStats.percentage}%</span>
        </div>

        <div className="weekly-bar-container">
          <div
            className="weekly-bar-fill"
            style={{
              width: `${weeklyStats.percentage}%`
            }}
          />
        </div>

        <div className="weekly-footer">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)' }}>
            <strong>{weeklyStats.totalDeficit}</strong> / {weeklyStats.weeklyTarget} KCAL
          </span>
          <span className="fat-lost-badge" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)' }}>
            {weeklyStats.projectedFatLoss} / {profile.weeklyFatLossGoal} KG LOST
          </span>
        </div>
      </div>
    </div>
  );
}
