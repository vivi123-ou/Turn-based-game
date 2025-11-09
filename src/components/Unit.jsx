import React from 'react';
import { UNIT_STATS } from '../game/constants';

const Unit = ({ unit, isSelected, onClick, isAnimating }) => {
  const stats = UNIT_STATS[unit.type];
  const hpPercentage = (unit.hp / stats.hp) * 100;
  const isDead = unit.hp <= 0;

  // Determine animation class
  let animationClass = '';
  if (isSelected) animationClass = 'unit-selected';
  if (isAnimating === 'moving') animationClass = 'unit-moving';
  if (isAnimating === 'attacking') animationClass = 'unit-attacking';
  if (isAnimating === 'hit') animationClass = 'unit-hit';

  return (
    <div
      onClick={onClick}
      className={animationClass}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: stats.color,
        border: isSelected ? '4px solid yellow' : '2px solid black',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: isDead ? 'not-allowed' : 'pointer',
        position: 'relative',
        opacity: isDead ? 0.3 : 1,
        transition: 'all 0.2s',
        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isSelected 
          ? '0 0 20px rgba(255, 215, 0, 0.8)' 
          : '0 2px 4px rgba(0,0,0,0.2)',
      }}
    >
      {/* Icon */}
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: 'white',
        textShadow: '2px 2px 4px black',
        animation: isDead ? 'none' : 'bounce 2s infinite',
      }}>
        {unit.type.includes('TANK') ? '🚜' : '👾'}
      </div>

      {/* HP Bar */}
      <div style={{
        position: 'absolute',
        bottom: '4px',
        left: '4px',
        right: '4px',
        height: '8px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.3)',
      }}>
        <div style={{
          width: `${hpPercentage}%`,
          height: '100%',
          backgroundColor: hpPercentage > 50 
            ? '#4CAF50' 
            : hpPercentage > 25 
            ? '#FFC107' 
            : '#F44336',
          transition: 'width 0.3s ease, background-color 0.3s ease',
          boxShadow: '0 0 5px rgba(255,255,255,0.5)',
        }} />
      </div>

      {/* HP Number */}
      <div style={{
        position: 'absolute',
        top: '2px',
        right: '4px',
        fontSize: '11px',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '2px 5px',
        borderRadius: '3px',
        fontWeight: 'bold',
        border: '1px solid rgba(255,255,255,0.3)',
      }}>
        {unit.hp}
      </div>

      {/* Dead indicator */}
      {isDead && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '32px',
          opacity: 0.8,
        }}>
          💀
        </div>
      )}

      {/* Has Acted indicator */}
      {unit.hasActed && !isDead && (
        <div style={{
          position: 'absolute',
          top: '2px',
          left: '4px',
          fontSize: '10px',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '2px 4px',
          borderRadius: '3px',
        }}>
          ✓
        </div>
      )}
    </div>
  );
};

export default Unit;