import React from 'react';

const LevelSelect = ({ onSelectLevel, onBack, completedLevels = [] }) => {
  const levels = [
    { id: 1, name: 'Basic Training', difficulty: 'Easy', description: 'Learn the basics' },
    { id: 2, name: 'First Contact', difficulty: 'Easy', description: 'Face the enemy' },
    { id: 3, name: 'Urban Warfare', difficulty: 'Medium', description: 'City battle' },
    { id: 4, name: 'Desert Storm', difficulty: 'Hard', description: 'Tough challenge' },
    { id: 5, name: 'Final Stand', difficulty: 'Very Hard', description: 'Ultimate battle' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px',
      color: 'white',
    }}>
      <button
        onClick={onBack}
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
        ← Back to Menu
      </button>

      <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '48px' }}>
        SELECT LEVEL
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {levels.map(level => {
          const isCompleted = completedLevels.includes(level.id);
          const isLocked = level.id > 1 && !completedLevels.includes(level.id - 1);

          return (
            <LevelCard
              key={level.id}
              level={level}
              isCompleted={isCompleted}
              isLocked={isLocked}
              onClick={() => !isLocked && onSelectLevel(level.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

const LevelCard = ({ level, isCompleted, isLocked, onClick }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      case 'Very Hard': return '#9C27B0';
      default: return '#666';
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        color: '#333',
        padding: '30px',
        borderRadius: '16px',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? 0.5 : 1,
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        transition: 'all 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseOver={e => !isLocked && (e.currentTarget.style.transform = 'translateY(-10px)')}
      onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {isCompleted && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '32px',
        }}>
          ✅
        </div>
      )}

      {isLocked && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '64px',
        }}>
          🔒
        </div>
      )}

      <h2 style={{ marginBottom: '10px', fontSize: '24px' }}>
        Level {level.id}
      </h2>
      <h3 style={{ marginBottom: '15px', color: '#666' }}>
        {level.name}
      </h3>
      <div style={{
        padding: '8px 16px',
        backgroundColor: getDifficultyColor(level.difficulty),
        color: 'white',
        borderRadius: '20px',
        display: 'inline-block',
        marginBottom: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
      }}>
        {level.difficulty}
      </div>
      <p style={{ color: '#666', fontSize: '14px' }}>
        {level.description}
      </p>
    </div>
  );
};

export default LevelSelect;