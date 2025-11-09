import React from 'react';

const MenuScreen = ({ onStartGame, onContinue, onTutorial, onCredits, soundEnabled, onToggleSound }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      position: 'relative',
    }}>
      {/* Sound Toggle */}
      <button
        onClick={onToggleSound}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: soundEnabled ? '#4CAF50' : '#F44336',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        }}
      >
        {soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF'}
      </button>

      <h1 style={{
        fontSize: '72px',
        marginBottom: '20px',
        textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
        animation: 'pulse 2s infinite',
      }}>
        🚜 Tank vs Alien 👾
      </h1>
      <p style={{
        fontSize: '24px',
        marginBottom: '50px',
        opacity: 0.9,
      }}>
        Turn-based Strategy Game
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <MenuButton onClick={onStartGame} text="🎮 NEW GAME" color="#4CAF50" />
        
        {onContinue && (
          <MenuButton onClick={onContinue} text="▶️ CONTINUE" color="#2196F3" />
        )}
        
        <MenuButton onClick={onTutorial} text="📖 TUTORIAL" color="#FF9800" />
        <MenuButton onClick={onCredits} text="⭐ CREDITS" color="#9C27B0" />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

const MenuButton = ({ onClick, text, color }) => (
  <button
    onClick={onClick}
    style={{
      padding: '20px 60px',
      fontSize: '24px',
      fontWeight: 'bold',
      backgroundColor: color,
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
      transition: 'all 0.3s',
      minWidth: '300px',
    }}
    onMouseOver={e => {
      e.target.style.transform = 'scale(1.1)';
      e.target.style.boxShadow = '0 12px 24px rgba(0,0,0,0.4)';
    }}
    onMouseOut={e => {
      e.target.style.transform = 'scale(1)';
      e.target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
    }}
  >
    {text}
  </button>
);

export default MenuScreen;