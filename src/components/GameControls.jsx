import React from 'react';
import { TEAMS, GAME_STATUS } from '../game/constants';

const GameControls = ({ 
  currentTurn, 
  gameStatus, 
  onEndTurn, 
  onReset,
  selectedUnit 
}) => {
  const isPlayerTurn = currentTurn === TEAMS.PLAYER;
  const isGameOver = gameStatus !== GAME_STATUS.PLAYING;

  const getStatusMessage = () => {
    if (gameStatus === GAME_STATUS.PLAYER_WIN) {
      return '🎉 PLAYER WINS!';
    }
    if (gameStatus === GAME_STATUS.ENEMY_WIN) {
      return '💀 ENEMY WINS!';
    }
    return isPlayerTurn ? '🟢 Your Turn' : '🔴 Enemy Turn';
  };

  const getStatusColor = () => {
    if (gameStatus === GAME_STATUS.PLAYER_WIN) return '#4CAF50';
    if (gameStatus === GAME_STATUS.ENEMY_WIN) return '#F44336';
    return isPlayerTurn ? '#2E7D32' : '#C62828';
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      marginBottom: '20px',
    }}>
      {/* Status */}
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: getStatusColor(),
        marginBottom: '15px',
        textAlign: 'center',
      }}>
        {getStatusMessage()}
      </div>

      {/* Selected unit info */}
      {selectedUnit && !isGameOver && (
        <div style={{
          padding: '10px',
          backgroundColor: '#FFF9C4',
          borderRadius: '4px',
          marginBottom: '15px',
          textAlign: 'center',
        }}>
          <div style={{ fontWeight: 'bold' }}>
            Selected: {selectedUnit.id}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Click green cells to move, red units to attack
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
      }}>
        {!isGameOver && isPlayerTurn && (
          <button
            onClick={onEndTurn}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => e.target.style.backgroundColor = '#1976D2'}
            onMouseOut={e => e.target.style.backgroundColor = '#2196F3'}
          >
            End Turn
          </button>
        )}

        <button
          onClick={onReset}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: isGameOver ? '#4CAF50' : '#757575',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseOver={e => e.target.style.backgroundColor = isGameOver ? '#388E3C' : '#616161'}
          onMouseOut={e => e.target.style.backgroundColor = isGameOver ? '#4CAF50' : '#757575'}
        >
          {isGameOver ? 'Play Again' : 'Reset Game'}
        </button>
      </div>

      {/* Instructions */}
      {!isGameOver && isPlayerTurn && (
        <div style={{
          marginTop: '15px',
          fontSize: '12px',
          color: '#666',
          textAlign: 'center',
          lineHeight: '1.6',
        }}>
          <div>💡 <strong>How to play:</strong></div>
          <div>1. Click your unit to select</div>
          <div>2. Click green cells to move OR red enemy to attack</div>
          <div>3. Click "End Turn" when done</div>
        </div>
      )}
    </div>
  );
};

export default GameControls;
