import React, { useReducer, useEffect, useState } from 'react';
import Board from './components/Board';
import StatsPanel from './components/StatsPanel';
import GameControls from './components/GameControls';
import MenuScreen from './components/MenuScreen';
import LevelSelect from './components/LevelSelect';
import StoryScreen from './components/StoryScreen';
import VictoryScreen from './components/VictoryScreen';
import TutorialScreen from './components/TutorialScreen';
import CreditsScreen from './components/CreditsScreen';
import { gameReducer, initialState } from './game/gameReducer';
import { ACTIONS, TEAMS, GAME_STATUS } from './game/constants';
import { executeAITurn } from './game/aiLogic';
import { saveGame, loadGame, hasSavedGame, saveProgress, loadProgress } from './utils/saveGame';
import { soundManager, playAttack, playHit, playDodge, playVictory, playDefeat, playTurnStart, playMove, playSelect } from './utils/soundEffects';
import './App.css';

const SCREENS = {
  MENU: 'MENU',
  TUTORIAL: 'TUTORIAL',
  CREDITS: 'CREDITS',
  LEVEL_SELECT: 'LEVEL_SELECT',
  STORY: 'STORY',
  GAME: 'GAME',
  VICTORY: 'VICTORY',
};

function App() {
  const [screen, setScreen] = useState(SCREENS.MENU);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // ============================================
  // LOAD PROGRESS ON MOUNT
  // ============================================

  useEffect(() => {
    const progress = loadProgress();
    if (progress.length > 0) {
      setCompletedLevels(progress);
    }
  }, []);

  // ============================================
  // AUTO-SAVE GAME STATE
  // ============================================

  useEffect(() => {
    if (screen === SCREENS.GAME && state.gameStatus === GAME_STATUS.PLAYING) {
      const gameState = {
        ...state,
        currentLevel,
        completedLevels,
      };
      saveGame(gameState);
    }
  }, [state, screen, currentLevel, completedLevels]);

  // ============================================
  // AI TURN HANDLER WITH SOUND
  // ============================================

  useEffect(() => {
    if (state.currentTurn === TEAMS.ENEMY && state.gameStatus === GAME_STATUS.PLAYING) {
      playTurnStart();

      const timer = setTimeout(() => {
        const aiActions = executeAITurn(state.units);
        
        aiActions.forEach((aiMove, index) => {
          setTimeout(() => {
            if (aiMove.action.type === 'MOVE') {
              dispatch({ type: ACTIONS.SELECT_UNIT, unitId: aiMove.unitId });
              setTimeout(() => {
                playMove();
                dispatch({ type: ACTIONS.MOVE_UNIT, position: aiMove.action.position });
              }, 300);
            } else if (aiMove.action.type === 'ATTACK') {
              dispatch({ type: ACTIONS.SELECT_UNIT, unitId: aiMove.unitId });
              setTimeout(() => {
                playAttack();
                dispatch({ type: ACTIONS.ATTACK_UNIT, targetId: aiMove.action.targetId });
              }, 300);
            }
          }, index * 1200); // Slightly longer delay for visibility
        });

        setTimeout(() => {
          dispatch({ type: ACTIONS.END_TURN });
        }, aiActions.length * 1200 + 500);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.currentTurn, state.gameStatus, state.units]);

  // ============================================
  // COMBAT LOG SOUND EFFECTS
  // ============================================

  useEffect(() => {
    if (state.combatLog.length > 0) {
      const lastLog = state.combatLog[state.combatLog.length - 1];
      if (lastLog.dodged) {
        playDodge();
      } else {
        setTimeout(() => playHit(), 100);
      }
    }
  }, [state.combatLog]);

  // ============================================
  // CHECK VICTORY WITH SOUND
  // ============================================

  useEffect(() => {
    if (state.gameStatus === GAME_STATUS.PLAYER_WIN) {
      playVictory();
      setTimeout(() => {
        if (!completedLevels.includes(currentLevel)) {
          const newCompleted = [...completedLevels, currentLevel];
          setCompletedLevels(newCompleted);
          saveProgress(newCompleted);
        }
        setScreen(SCREENS.VICTORY);
      }, 1500);
    } else if (state.gameStatus === GAME_STATUS.ENEMY_WIN) {
      playDefeat();
    }
  }, [state.gameStatus, currentLevel, completedLevels]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleSelectLevel = (level) => {
    setCurrentLevel(level);
    setScreen(SCREENS.STORY);
  };

  const handleStartLevel = () => {
    dispatch({ type: ACTIONS.RESET_GAME, level: currentLevel });
    setScreen(SCREENS.GAME);
    playTurnStart();
  };

  const handleNextLevel = () => {
    if (currentLevel < 5) {
      setCurrentLevel(currentLevel + 1);
      setScreen(SCREENS.STORY);
    } else {
      setScreen(SCREENS.MENU);
    }
  };

  const handleContinueGame = () => {
    const savedGame = loadGame();
    if (savedGame) {
      // Restore game state
      dispatch({ type: ACTIONS.RESTORE_GAME, gameState: savedGame });
      setCurrentLevel(savedGame.currentLevel || 1);
      setCompletedLevels(savedGame.completedLevels || []);
      setScreen(SCREENS.GAME);
      playTurnStart();
    }
  };

  const handleSelectUnit = (unitId) => {
    playSelect();
    dispatch({ type: ACTIONS.SELECT_UNIT, unitId });
  };

  const handleMove = (position) => {
    playMove();
    dispatch({ type: ACTIONS.MOVE_UNIT, position });
  };

  const handleAttack = (targetId) => {
    playAttack();
    dispatch({ type: ACTIONS.ATTACK_UNIT, targetId });
  };

  const handleEndTurn = () => {
    playTurnStart();
    dispatch({ type: ACTIONS.END_TURN });
  };

  const handleReset = () => {
    dispatch({ type: ACTIONS.RESET_GAME, level: currentLevel });
  };

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  };

  // ============================================
  // RENDER SCREENS
  // ============================================

  if (screen === SCREENS.MENU) {
    return (
      <MenuScreen
        onStartGame={() => setScreen(SCREENS.LEVEL_SELECT)}
        onContinue={hasSavedGame() ? handleContinueGame : null}
        onTutorial={() => setScreen(SCREENS.TUTORIAL)}
        onCredits={() => setScreen(SCREENS.CREDITS)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />
    );
  }

  if (screen === SCREENS.TUTORIAL) {
    return <TutorialScreen onClose={() => setScreen(SCREENS.MENU)} />;
  }

  if (screen === SCREENS.CREDITS) {
    return <CreditsScreen onClose={() => setScreen(SCREENS.MENU)} />;
  }

  if (screen === SCREENS.LEVEL_SELECT) {
    return (
      <LevelSelect
        onSelectLevel={handleSelectLevel}
        onBack={() => setScreen(SCREENS.MENU)}
        completedLevels={completedLevels}
      />
    );
  }

  if (screen === SCREENS.STORY) {
    return (
      <StoryScreen
        levelId={currentLevel}
        onComplete={handleStartLevel}
        onSkip={handleStartLevel}
      />
    );
  }

  if (screen === SCREENS.VICTORY) {
    return (
      <VictoryScreen
        level={currentLevel}
        onNextLevel={handleNextLevel}
        onBackToMenu={() => setScreen(SCREENS.LEVEL_SELECT)}
      />
    );
  }

  // ============================================
  // GAME SCREEN
  // ============================================

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚜 Tank vs Alien 👾 - Level {currentLevel}</h1>
        <p>Turn-based Strategy Game</p>
        <button
          onClick={toggleSound}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: soundEnabled ? '#4CAF50' : '#F44336',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF'}
        </button>
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