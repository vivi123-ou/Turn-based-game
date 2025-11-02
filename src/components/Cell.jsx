import React from 'react';

const Cell = ({ 
  x, 
  y, 
  unit, 
  isValidMove, 
  isValidTarget, 
  isSelected,
  onClick 
}) => {
  const getCellStyle = () => {
    const baseStyle = {
      width: '80px',
      height: '80px',
      border: '1px solid #666',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      position: 'relative',
    };

    // Màu nền
    const isEven = (x + y) % 2 === 0;
    let backgroundColor = isEven ? '#8B7355' : '#D2B48C';

    if (isValidMove) backgroundColor = '#90EE90';
    if (isValidTarget) backgroundColor = '#FFB6C1';
    if (isSelected) backgroundColor = '#FFD700';

    return { ...baseStyle, backgroundColor };
  };

  return (
    <div 
      style={getCellStyle()} 
      onClick={onClick}
    >
      {/* Hiển thị tọa độ (debug) */}
      <div style={{
        position: 'absolute',
        top: '2px',
        left: '2px',
        fontSize: '8px',
        color: '#666',
        pointerEvents: 'none',
      }}>
        {x},{y}
      </div>

      {/* Hiển thị unit nếu có */}
      {unit && (
        <div style={{ width: '90%', height: '90%' }}>
          {unit}
        </div>
      )}

      {/* Icon cho valid moves */}
      {isValidMove && !unit && (
        <div style={{ 
          fontSize: '24px',
          opacity: 0.5,
        }}>
          ➜
        </div>
      )}

      {/* Icon cho valid targets */}
      {isValidTarget && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '32px',
          pointerEvents: 'none',
        }}>
          ⚔️
        </div>
      )}
    </div>
  );
};

export default Cell;
