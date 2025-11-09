import { ACTIONS, GAME_STATUS, TEAMS, UNIT_TYPES, UNIT_STATS } from './constants';
import { 
  getUnitAtPosition, 
  calculateDamage, 
  checkGameOver,
} from './gameLogic';

// ============================================
// LEVEL CONFIGURATIONS
// ============================================

export const getLevelConfig = (level) => {
  const configs = {
    1: { // Easy - Tutorial Level
      playerUnits: [
        { id: 'tank1', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 2 } },
        { id: 'tank2', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 3 } },
      ],
      enemyUnits: [
        { id: 'alien1', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 2 } },
        { id: 'alien2', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 3 } },
      ],
    },
    2: { // Easy - First Real Battle
      playerUnits: [
        { id: 'tank1', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 1 } },
        { id: 'tank2', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 3 } },
        { id: 'tank3', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 4 } },
      ],
      enemyUnits: [
        { id: 'alien1', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 1 } },
        { id: 'alien2', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 3 } },
        { id: 'alien3', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 4 } },
      ],
    },
    3: { // Medium - Urban Warfare
      playerUnits: [
        { id: 'tank1', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 1 } },
        { id: 'tank2', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 2 } },
        { id: 'tank3', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 4 } },
      ],
      enemyUnits: [
        { id: 'alien1', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 1 } },
        { id: 'alien2', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 2 } },
        { id: 'alien3', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 3 } },
        { id: 'alien4', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 4 } },
      ],
    },
    4: { // Hard - Desert Storm
      playerUnits: [
        { id: 'tank1', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 0 } },
        { id: 'tank2', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 2 } },
        { id: 'tank3', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 3 } },
        { id: 'tank4', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 5 } },
      ],
      enemyUnits: [
        { id: 'alien1', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 0 } },
        { id: 'alien2', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 1 } },
        { id: 'alien3', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 2 } },
        { id: 'alien4', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 4 } },
        { id: 'alien5', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 5 } },
      ],
    },
    5: { // Very Hard - Final Stand
      playerUnits: [
        { id: 'tank1', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 1 } },
        { id: 'tank2', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 4 } },
        { id: 'tank3', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 2 } },
        { id: 'tank4', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 3 } },
      ],
      enemyUnits: [
        { id: 'alien1', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 0 } },
        { id: 'alien2', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 1 } },
        { id: 'alien3', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 2 } },
        { id: 'alien4', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 3 } },
        { id: 'alien5', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 4 } },
        { id: 'alien6', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 5 } },
      ],
    },
  };

  return configs[level] || configs[1];
};

// ============================================
// CREATE INITIAL UNITS FOR LEVEL
// ============================================

export const createInitialUnits = (level = 1) => {
  const config = getLevelConfig(level);
  const units = [];

  // Create player units
  config.playerUnits.forEach(unitConfig => {
    const stats = UNIT_STATS[unitConfig.type];
    units.push({
      id: unitConfig.id,
      type: unitConfig.type,
      team: TEAMS.PLAYER,
      position: unitConfig.position,
      hp: stats.hp,
      hasActed: false,
    });
  });

  // Create enemy units
  config.enemyUnits.forEach(unitConfig => {
    const stats = UNIT_STATS[unitConfig.type];
    units.push({
      id: unitConfig.id,
      type: unitConfig.type,
      team: TEAMS.ENEMY,
      position: unitConfig.position,
      hp: stats.hp,
      hasActed: false,
    });
  });

  return units;
};

// ============================================
// INITIAL STATE
// ============================================

export const initialState = {
  units: createInitialUnits(1),
  selectedUnit: null,
  currentTurn: TEAMS.PLAYER,
  gameStatus: GAME_STATUS.PLAYING,
  combatLog: [],
  currentLevel: 1,
};

// ============================================
// GAME REDUCER
// ============================================

export const gameReducer = (state, action) => {
  switch (action.type) {
    // ----------------------------------------
    // SELECT UNIT
    // ----------------------------------------
    case ACTIONS.SELECT_UNIT: {
      const unit = state.units.find(u => u.id === action.unitId);
      
      // Không cho select nếu:
      // - Unit không tồn tại
      // - Không phải team player
      // - Unit đã hành động
      // - Unit đã chết
      // - Không phải lượt player
      if (
        !unit || 
        unit.team !== TEAMS.PLAYER || 
        unit.hasActed || 
        unit.hp <= 0 ||
        state.currentTurn !== TEAMS.PLAYER
      ) {
        return state;
      }

      return { 
        ...state, 
        selectedUnit: unit 
      };
    }

    // ----------------------------------------
    // MOVE UNIT
    // ----------------------------------------
    case ACTIONS.MOVE_UNIT: {
      if (!state.selectedUnit) return state;

      const updatedUnits = state.units.map(u =>
        u.id === state.selectedUnit.id
          ? { ...u, position: action.position }
          : u
      );

      return {
        ...state,
        units: updatedUnits,
        selectedUnit: { 
          ...state.selectedUnit, 
          position: action.position 
        },
      };
    }

    // ----------------------------------------
    // ATTACK UNIT
    // ----------------------------------------
    case ACTIONS.ATTACK_UNIT: {
      if (!state.selectedUnit) return state;

      const attacker = state.selectedUnit;
      const defender = state.units.find(u => u.id === action.targetId);

      if (!defender) return state;

      // Calculate damage
      const damageResult = calculateDamage(attacker, defender);
      const newHp = Math.max(0, defender.hp - damageResult.finalDamage);

      // Update units
      const updatedUnits = state.units.map(u => {
        if (u.id === defender.id) {
          return { ...u, hp: newHp };
        }
        if (u.id === attacker.id) {
          return { ...u, hasActed: true };
        }
        return u;
      });

      // Create combat log entry
      const logEntry = {
        attacker: attacker.id,
        defender: defender.id,
        ...damageResult,
        remainingHp: newHp,
        timestamp: Date.now(),
      };

      // Check game over
      const newGameStatus = checkGameOver(updatedUnits);

      return {
        ...state,
        units: updatedUnits,
        selectedUnit: null,
        combatLog: [...state.combatLog, logEntry],
        gameStatus: newGameStatus,
      };
    }

    // ----------------------------------------
    // END TURN
    // ----------------------------------------
    case ACTIONS.END_TURN: {
      // Reset hasActed cho tất cả units
      const updatedUnits = state.units.map(u => ({
        ...u,
        hasActed: false,
      }));

      // Switch turn
      const nextTurn = state.currentTurn === TEAMS.PLAYER 
        ? TEAMS.ENEMY 
        : TEAMS.PLAYER;

      return {
        ...state,
        units: updatedUnits,
        currentTurn: nextTurn,
        selectedUnit: null,
      };
    }

    // ----------------------------------------
    // RESET GAME
    // ----------------------------------------
    case ACTIONS.RESET_GAME: {
      const level = action.level || state.currentLevel || 1;
      
      return {
        units: createInitialUnits(level),
        selectedUnit: null,
        currentTurn: TEAMS.PLAYER,
        gameStatus: GAME_STATUS.PLAYING,
        combatLog: [],
        currentLevel: level,
      };
    }
    case ACTIONS.RESTORE_GAME: {
  const { gameState } = action;
  return {
    units: gameState.units || createInitialUnits(1),
    selectedUnit: null,
    currentTurn: gameState.currentTurn || TEAMS.PLAYER,
    gameStatus: GAME_STATUS.PLAYING,
    combatLog: gameState.combatLog || [],
    currentLevel: gameState.currentLevel || 1,
  };
}
    // ----------------------------------------
    // DEFAULT
    // ----------------------------------------
    default:
      return state;
  }
};

// ============================================
// EXPORT
// ============================================

export default gameReducer;