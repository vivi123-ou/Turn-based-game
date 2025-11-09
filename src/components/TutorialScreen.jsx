import React from 'react';

const TutorialScreen = ({ onClose }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px',
      color: 'white',
      overflowY: 'auto',
    }}>
      <button
        onClick={onClose}
        style={{
          padding: '12px 24px',
          fontSize: '18px',
          backgroundColor: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '30px',
        }}
      >
        ← Back
      </button>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: '40px',
        borderRadius: '16px',
      }}>
        <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>
          📖 How to Play
        </h1>

        <Section title="🎯 Objective">
          <p>Eliminate all enemy units to win the level!</p>
        </Section>

        <Section title="🎮 Controls">
          <ul style={{ lineHeight: '2' }}>
            <li>Click on your unit to select it</li>
            <li>Green cells = valid movement positions</li>
            <li>Red enemy units = valid attack targets</li>
            <li>Click "End Turn" when finished</li>
          </ul>
        </Section>

        <Section title="🚜 Your Units">
          <UnitInfo
            name="Tank Artillery"
            icon="🚜"
            stats="Long range (2-4), Low mobility"
            tip="Use for back-line support"
          />
          <UnitInfo
            name="Tank Brawler"
            icon="🚜"
            stats="Close range (1-2), High mobility"
            tip="Use for front-line combat"
          />
        </Section>

        <Section title="👾 Enemy Units">
          <UnitInfo
            name="Alien Large"
            icon="👾"
            stats="High HP, Medium range"
            tip="Dangerous but slow"
          />
          <UnitInfo
            name="Alien Small"
            icon="👾"
            stats="Fast, Low HP"
            tip="Quick and evasive"
          />
        </Section>

        <Section title="💡 Tips">
          <ul style={{ lineHeight: '2' }}>
            <li>Armor reduces incoming damage</li>
            <li>Dodge rate = chance to avoid attacks</li>
            <li>Position carefully - range matters!</li>
            <li>Protect your Artillery units</li>
          </ul>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '30px' }}>
    <h2 style={{ marginBottom: '15px', fontSize: '28px' }}>{title}</h2>
    {children}
  </div>
);

const UnitInfo = ({ name, icon, stats, tip }) => (
  <div style={{
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
  }}>
    <div style={{ fontSize: '24px', marginBottom: '5px' }}>
      {icon} <strong>{name}</strong>
    </div>
    <div style={{ fontSize: '14px', opacity: 0.9 }}>{stats}</div>
    <div style={{ fontSize: '14px', opacity: 0.8, fontStyle: 'italic' }}>
      💡 {tip}
    </div>
  </div>
);

export default TutorialScreen;