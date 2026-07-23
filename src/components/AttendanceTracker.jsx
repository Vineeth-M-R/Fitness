import React, { useEffect, useRef } from 'react';
import { CalendarCheck2, Award, Zap } from 'lucide-react';
import { getLocalDateString } from '../utils/db';

export default function AttendanceTracker({ workoutLogs, attendance, onToggleAttendance }) {
  const scrollRef = useRef(null);

  // Auto scroll to the end (most recent days) on load
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  // Pre-index workout dates for fast lookups
  const workoutDates = new Set(workoutLogs.map(log => log.date));

  // Generate last 7 days list
  const getLast7Days = () => {
    const list = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      list.push(d);
    }
    return list;
  };

  const formatDateLabel = (date) => {
    const todayStr = getLocalDateString(new Date());
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);
    const dateStr = getLocalDateString(date);

    if (dateStr === todayStr) {
      return 'Today';
    } else if (dateStr === yesterdayStr) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  // Calculate Streak & Totals
  const getStreakAndCount = () => {
    const todayStr = getLocalDateString(new Date());
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);

    let streak = 0;
    let checkDate = new Date(); // Start today

    const isTodayAttended = !!attendance[todayStr] || workoutDates.has(todayStr);
    const isYesterdayAttended = !!attendance[yesterdayStr] || workoutDates.has(yesterdayStr);

    if (isTodayAttended) {
      while (true) {
        const dateStr = getLocalDateString(checkDate);
        if (attendance[dateStr] || workoutDates.has(dateStr)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    } else if (isYesterdayAttended) {
      checkDate.setDate(checkDate.getDate() - 1);
      while (true) {
        const dateStr = getLocalDateString(checkDate);
        if (attendance[dateStr] || workoutDates.has(dateStr)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    const allDays = new Set([...Object.keys(attendance), ...workoutLogs.map(l => l.date)]);
    return { streak, totalGymDays: allDays.size };
  };

  const { streak, totalGymDays } = getStreakAndCount();

  // Generate heatmap days (53 weeks * 7 days = 371 days)
  const generateHeatmapDays = () => {
    const today = new Date();
    const days = [];
    
    // Go back 52 weeks and align to Sunday
    const startDate = new Date();
    startDate.setDate(today.getDate() - 364);
    const startDayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDayOfWeek);

    const totalDays = 53 * 7;
    for (let i = 0; i < totalDays; i++) {
      const current = new Date(startDate);
      current.setDate(startDate.getDate() + i);
      days.push(current);
    }
    return days;
  };

  const heatmapDays = generateHeatmapDays();

  const handleCheckClick = (dateStr, hasWorkout) => {
    if (hasWorkout) {
      alert("Workout is logged for this day. To delete, go to the History panel.");
    } else {
      onToggleAttendance(dateStr);
    }
  };

  return (
    <div className="glass-panel attendance-tracker-card">
      <div className="panel-header" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h2 className="panel-title" style={{ margin: 0 }}>
          <CalendarCheck2 size={20} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
          Consistency Tracker
        </h2>
        
        {/* Streak & Metrics Badge */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="streak-badge">
            <Zap size={12} fill="var(--accent)" strokeWidth={0} />
            <span>{streak} DAY STREAK</span>
          </div>
          <div className="streak-badge" style={{ borderColor: 'var(--border)', color: 'var(--text-sub)' }}>
            <Award size={12} strokeWidth={1.5} />
            <span>{totalGymDays} VISITS</span>
          </div>
        </div>
      </div>

      {/* GitHub-style Commit Heatmap */}
      <div className="heatmap-section" style={{ marginBottom: '20px' }}>
        <div className="heatmap-container">
          {/* Y-axis labels */}
          <div className="heatmap-y-labels">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          {/* Scrollable Heatmap Scrollbox */}
          <div className="heatmap-scrollbox" ref={scrollRef}>
            <div className="heatmap-grid">
              {heatmapDays.map((dayDate, idx) => {
                const dateStr = getLocalDateString(dayDate);
                const hasWorkout = workoutDates.has(dateStr);
                const hasAttendance = attendance[dateStr];
                
                let level = 0;
                let statusLabel = 'No Gym';
                if (hasWorkout) {
                  level = 2;
                  statusLabel = 'Workout Completed';
                } else if (hasAttendance) {
                  level = 1;
                  statusLabel = 'Attended Gym (Manual)';
                }

                const tooltip = `${dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}: ${statusLabel}`;

                return (
                  <div
                    key={idx}
                    className={`heatmap-cell level-${level}`}
                    title={tooltip}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="heatmap-legend" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '10px', color: 'var(--text-sub)' }}>
          <span>Less</span>
          <div className="heatmap-cell level-0" style={{ width: '8px', height: '8px', margin: 0 }} />
          <div className="heatmap-cell level-1" style={{ width: '8px', height: '8px', margin: 0 }} />
          <div className="heatmap-cell level-2" style={{ width: '8px', height: '8px', margin: 0 }} />
          <span>More</span>
        </div>
      </div>

      {/* Quick Checklist for last 7 days */}
      <div className="attendance-checklist-section">
        <h4 style={{ fontSize: 'var(--text-xs)', color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', marginBottom: '8px' }}>
          Mark Attendance (Last 7 Days)
        </h4>
        
        <div className="attendance-list" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {getLast7Days().map((dayDate) => {
            const dateStr = getLocalDateString(dayDate);
            const hasWorkout = workoutDates.has(dateStr);
            const isChecked = !!attendance[dateStr] || hasWorkout;
            const label = formatDateLabel(dayDate);

            return (
              <div
                key={dateStr}
                className="attendance-item"
                onClick={() => handleCheckClick(dateStr, hasWorkout)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className={`chk-box ${isChecked ? 'chk-checked' : ''} ${hasWorkout ? 'chk-disabled' : ''}`} />
                  <span className={`attendance-date-label ${isChecked ? 'completed' : ''}`}>
                    {label}
                  </span>
                </div>

                <div className="attendance-status-label">
                  {hasWorkout ? (
                    <span className="attendance-tag tag-workout">Gym Workout</span>
                  ) : isChecked ? (
                    <span className="attendance-tag tag-manual">Attended</span>
                  ) : (
                    <span className="attendance-tag tag-none">No Gym</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
