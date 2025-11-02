import React from 'react';
import { UNIT_STATS } from '../game/constants';

const Unit = ({ unit, isSelected, onClick }) => {
  const stats = UNIT_STATS[unit.type];
  const hpPercentage = (unit.hp / stats.hp) * 100;

  return (
    <div
      onClick={onClick}
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
        cursor: 'pointer',
        position: 'relative',
        opacity: unit.hp <= 0 ? 0.3 : 1,
        transition: 'all 0.2s',
      }}
    >
      {/* Icon hoặc tên viết tắt */}
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 'bold', 
        color: 'white',
        textShadow: '1px 1px 2px black'
      }}>
        {unit.type.includes('TANK') ? '🚜' : '👾'}
      </div>

      {/* HP Bar */}
      <div style={{
        position: 'absolute',
        bottom: '4px',
        left: '4px',
        right: '4px',
        height: '6px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${hpPercentage}%`,
          height: '100%',
          backgroundColor: hpPercentage > 50 ? '#4CAF50' : hpPercentage > 25 ? '#FFC107' : '#F44336',
          transition: 'width 0.3s',
        }} />
      </div>

      {/* HP số */}
      <div style={{
        position: 'absolute',
        top: '2px',
        right: '4px',
        fontSize: '10px',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: '1px 4px',
        borderRadius: '3px',
        fontWeight: 'bold',
      }}>
        {unit.hp}
      </div>
    </div>
  );
};

export default Unit;
