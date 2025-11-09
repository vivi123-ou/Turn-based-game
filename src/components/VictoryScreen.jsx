import React from 'react';

const VictoryScreen = ({ level, onNextLevel, onBackToMenu }) => {
  const isLastLevel = level === 5;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '40px',
    }}>
      <div style={{
        fontSize: '120px',
        marginBottom: '40px',
        animation: 'bounce 1s infinite',
      }}>
        {isLastLevel ? '🏆' : '🎉'}
      </div>

      <h1 style={{
        fontSize: '64px',
        marginBottom: '20px',
        textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
      }}>
        {isLastLevel ? 'GAME COMPLETE!' : 'VICTORY!'}
      </h1>

      <p style={{
        fontSize: '28px',
        marginBottom: '50px',
        textAlign: 'center',
      }}>
        {isLastLevel 
          ? 'You have saved Earth from the alien invasion!\nHumanity thanks you, Commander!' 
          : `Level ${level} Complete!`}
      </p>

      <div style={{ display: 'flex', gap: '20px' }}>
        {!isLastLevel && (
          <button
            onClick={onNextLevel}
            style={{
              padding: '20px 40px',
              fontSize: '24px',
              fontWeight: 'bold',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            }}
          >
            Next Level →
          </button>
        )}
        
        <button
          onClick={onBackToMenu}
          style={{
            padding: '20px 40px',
            fontSize: '24px',
            fontWeight: 'bold',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
          }}
        >
          Main Menu
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </div>
  );
};

export default VictoryScreen;