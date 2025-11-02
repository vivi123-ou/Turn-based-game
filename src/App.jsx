import React, { useReducer, useEffect } from 'react';
import Board from './components/Board';
import StatsPanel from './components/StatsPanel';
import GameControls from './components/GameControls';
import { gameReducer, initialState } from './game/gameReducer';
import { ACTIONS, TEAMS, GAME_STATUS } from './game/constants';
import { executeAITurn } from './game/aiLogic';
import { calculateDamage } from './game/gameLogic';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // AI Turn handler
  useEffect(() => {
    if (state.currentTurn === TEAMS.ENEMY && state.gameStatus === GAME_STATUS.PLAYING) {
      // Delay để người chơi thấy rõ
      const timer = setTimeout(() => {
        const aiActions = executeAITurn(state.units);
        
        // Thực hiện từng action với delay
        aiActions.forEach((aiMove, index) => {
          setTimeout(() => {
            const unit = state.units.find(u => u.id === aiMove.unitId);
            
            if (aiMove.action.type === 'MOVE') {
              dispatch({
                type: ACTIONS.SELECT_UNIT,
                unitId: aiMove.unitId,
              });
              setTimeout(() => {
                dispatch({
                  type: ACTIONS.MOVE_UNIT,
                  position: aiMove.action.position,
                });
              }, 300);
            } else if (aiMove.action.type === 'ATTACK') {
              dispatch({
                type: ACTIONS.SELECT_UNIT,
                unitId: aiMove.unitId,
              });
              setTimeout(() => {
                dispatch({
                  type: ACTIONS.ATTACK_UNIT,
                  targetId: aiMove.action.targetId,
                });
              }, 300);
            }
          }, index * 1000);
        });

        // End AI turn sau khi tất cả actions xong
        setTimeout(() => {
          dispatch({ type: ACTIONS.END_TURN });
        }, aiActions.length * 1000 + 500);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.currentTurn, state.gameStatus]);

  const handleSelectUnit = (unitId) => {
    dispatch({ type: ACTIONS.SELECT_UNIT, unitId });
  };

  const handleMove = (position) => {
    dispatch({ type: ACTIONS.MOVE_UNIT, position });
  };

  const handleAttack = (targetId) => {
    dispatch({ type: ACTIONS.ATTACK_UNIT, targetId });
  };

  const handleEndTurn = () => {
    dispatch({ type: ACTIONS.END_TURN });
  };

  const handleReset = () => {
    dispatch({ type: ACTIONS.RESET_GAME });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚜 Tank vs Alien 👾</h1>
        <p>Turn-based Strategy Game</p>
      </header>

      <div className="game-container">
        <div className="left-panel">
          <GameControls
            currentTurn={state.currentTurn}
            gameStatus={state.gameStatus}
            onEndTurn={handleEndTurn}
            onReset={handleReset}
            selectedUnit={state.selectedUnit}
          />
          <Board
            units={state.units}
            selectedUnit={state.selectedUnit}
            onSelectUnit={handleSelectUnit}
            onMove={handleMove}
            onAttack={handleAttack}
          />
        </div>

        <div className="right-panel">
          <StatsPanel
            units={state.units}
            selectedUnit={state.selectedUnit}
            combatLog={state.combatLog}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
