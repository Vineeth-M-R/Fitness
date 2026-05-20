import React, { useState } from 'react';
import { X, ShieldAlert, Award, Hand, Compass } from 'lucide-react';

export default function FormGuideModal({ exercise, onClose }) {
  const [activeTab, setActiveTab] = useState('setup');

  if (!exercise) return null;

  const tabs = [
    { id: 'setup', label: 'Setup', icon: Compass },
    { id: 'grip', label: 'Grip', icon: Hand },
    { id: 'execution', label: 'Action', icon: Award },
    { id: 'safety', label: 'Safety', icon: ShieldAlert },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="panel-title" style={{ fontSize: 'var(--text-lg)', margin: 0 }}>
              {exercise.name}
            </h3>
            <span className="exercise-meta" style={{ display: 'block', fontSize: 'var(--text-xs)', marginTop: '4px', color: 'var(--text-sub)' }}>
              TARGET: <strong style={{ color: 'var(--accent)' }}>{exercise.target.toUpperCase()}</strong>
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Visual SVG Diagram */}
          {exercise.svg && (
            <div className="svg-illustration-container">
              <div 
                style={{ width: '100%', height: '100%' }} 
                dangerouslySetInnerHTML={{ __html: exercise.svg }} 
              />
            </div>
          )}

          {/* Form Tabs */}
          <div className="form-guide-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`form-guide-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div style={{ minHeight: '80px', padding: '4px 0' }}>
            {activeTab === 'setup' && (
              <div className="form-text">
                <p style={{ color: 'var(--text)', fontWeight: '600', marginBottom: '6px' }}>INITIAL SETUP:</p>
                {exercise.formNotes.setup}
              </div>
            )}
            {activeTab === 'grip' && (
              <div className="form-text">
                <p style={{ color: 'var(--text)', fontWeight: '600', marginBottom: '6px' }}>HAND GRIPPING:</p>
                {exercise.formNotes.grip}
              </div>
            )}
            {activeTab === 'execution' && (
              <div className="form-text">
                <p style={{ color: 'var(--text)', fontWeight: '600', marginBottom: '6px' }}>CORRECT MOTION PATH:</p>
                {exercise.formNotes.execution}
              </div>
            )}
            {activeTab === 'safety' && (
              <div className="form-text" style={{ color: 'var(--danger)' }}>
                <p style={{ color: 'var(--danger)', fontWeight: '600', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldAlert size={14} strokeWidth={1.5} /> WARNING:
                </p>
                {exercise.formNotes.safety}
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose} style={{ minWidth: '100px' }}>
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
}
