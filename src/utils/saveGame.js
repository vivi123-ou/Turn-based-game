const SAVE_KEY = 'tankVsAlien_saveData';

// ============================================
// SAVE GAME
// ============================================

export const saveGame = (gameState) => {
  try {
    const saveData = {
      currentLevel: gameState.currentLevel || 1,
      completedLevels: gameState.completedLevels || [],
      units: gameState.units,
      currentTurn: gameState.currentTurn,
      combatLog: gameState.combatLog,
      timestamp: Date.now(),
      version: '1.0',
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    console.log('✅ Game saved successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to save game:', error);
    return false;
  }
};

// ============================================
// LOAD GAME
// ============================================

export const loadGame = () => {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    
    if (!savedData) {
      console.log('ℹ️ No saved game found');
      return null;
    }

    const gameState = JSON.parse(savedData);
    
    // Validate save data
    if (!gameState.version || !gameState.units) {
      console.warn('⚠️ Invalid save data');
      return null;
    }

    console.log('✅ Game loaded successfully');
    return gameState;
  } catch (error) {
    console.error('❌ Failed to load game:', error);
    return null;
  }
};

// ============================================
// CHECK IF SAVE EXISTS
// ============================================

export const hasSavedGame = () => {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    return savedData !== null;
  } catch (error) {
    return false;
  }
};

// ============================================
// DELETE SAVE
// ============================================

export const deleteSave = () => {
  try {
    localStorage.removeItem(SAVE_KEY);
    console.log('✅ Save deleted');
    return true;
  } catch (error) {
    console.error('❌ Failed to delete save:', error);
    return false;
  }
};

// ============================================
// SAVE PROGRESS (Completed Levels)
// ============================================

export const saveProgress = (completedLevels) => {
  try {
    const progressData = {
      completedLevels,
      timestamp: Date.now(),
    };
    localStorage.setItem('tankVsAlien_progress', JSON.stringify(progressData));
    return true;
  } catch (error) {
    console.error('❌ Failed to save progress:', error);
    return false;
  }
};

// ============================================
// LOAD PROGRESS
// ============================================

export const loadProgress = () => {
  try {
    const progressData = localStorage.getItem('tankVsAlien_progress');
    if (!progressData) return [];
    
    const data = JSON.parse(progressData);
    return data.completedLevels || [];
  } catch (error) {
    console.error('❌ Failed to load progress:', error);
    return [];
  }
};