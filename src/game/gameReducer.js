import { ACTIONS, GAME_STATUS, TEAMS, UNIT_TYPES, UNIT_STATS } from './constants';
import { 
  getUnitAtPosition, 
  calculateDamage, 
  checkGameOver,
} from './gameLogic';

// ============================================
// LEVEL CONFIGURATIONS - ENHANCED
// ============================================

export const getLevelConfig = (level) => {
  const configs = {
    1: { // Easy - Tutorial Level (2v2)
      playerUnits: [
        { id: 'tank1', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 2 } },
        { id: 'tank2', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 3 } },
      ],
      enemyUnits: [
        { id: 'alien1', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 2 } },
        { id: 'alien2', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 3 } },
      ],
    },
    2: { // Easy - First Real Battle (3v3)
      playerUnits: [
        { id: 'tank1', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 1 } },
        { id: 'tank2', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 2 } },
        { id: 'tank3', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 4 } },
      ],
      enemyUnits: [
        { id: 'alien1', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 0 } },
        { id: 'alien2', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 2 } },
        { id: 'alien3', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 5 } },
      ],
    },
    3: { // Medium - Urban Warfare (3v4)
      playerUnits: [
        { id: 'tank1', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 1 } },
        { id: 'tank2', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 2 } },
        { id: 'tank3', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 4 } },
      ],
      enemyUnits: [
        { id: 'alien1', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 0 } },
        { id: 'alien2', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 2 } },
        { id: 'alien3', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 3 } },
        { id: 'alien4', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 5, y: 5 } },
      ],
    },
    4: { // Hard - Desert Storm (4v5)
      playerUnits: [
        { id: 'tank1', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 0 } },
        { id: 'tank2', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 1, y: 2 } },
        { id: 'tank3', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 3 } },
        { id: 'tank4', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 5 } },
      ],
      enemyUnits: [
        { id: 'alien1', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 0 } },
        { id: 'alien2', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 4, y: 1 } },
        { id: 'alien3', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 2 } },
        { id: 'alien4', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 4, y: 4 } },
        { id: 'alien5', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 5 } },
      ],
    },
    5: { // Very Hard - Final Stand (4v6)
      playerUnits: [
        { id: 'tank1', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 0, y: 1 } },
        { id: 'tank2', type: UNIT_TYPES.TANK_ARTILLERY, position: { x: 1, y: 4 } },
        { id: 'tank3', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 2 } },
        { id: 'tank4', type: UNIT_TYPES.TANK_BRAWLER, position: { x: 0, y: 3 } },
      ],
      enemyUnits: [
        { id: 'alien1', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 0 } },
        { id: 'alien2', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 4, y: 1 } },
        { id: 'alien3', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 2 } },
        { id: 'alien4', type: UNIT_TYPES.ALIEN_LARGE, position: { x: 5, y: 3 } },
        { id: 'alien5', type: UNIT_TYPES.ALIEN_SMALL, position: { x: 4, y: 4 } },
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
    // SELECT UNIT - FIXED ✅
    // ----------------------------------------
    case ACTIONS.SELECT_UNIT: {
      const unit = state.units.find(u => u.id === action.unitId);

      // Kiểm tra unit tồn tại và còn sống
      if (!unit || unit.hp <= 0) {
        console.log('❌ Unit không tồn tại hoặc đã chết');
        return state;
      }

      // ✅ CHO PHÉP SELECT UNIT CỦA CURRENT TURN (bất kể hasActed)
      // Vì AI cần select unit để thực hiện hành động
      if (unit.team === state.currentTurn) {
        console.log(`✅ Selected ${unit.id} (hasActed: ${unit.hasActed})`);
        return {
          ...state,
          selectedUnit: unit,
        };
      }

      // Nếu PLAYER click vào ENEMY unit (để xem thông tin)
      if (state.currentTurn === TEAMS.PLAYER && unit.team === TEAMS.ENEMY) {
        console.log('ℹ️ Player clicked enemy unit (viewing only)');
        return state;
      }

      console.log('❌ Không thể select unit này');
      return state;
    }

    // ----------------------------------------
    // MOVE UNIT - FIXED ✅
    // ----------------------------------------
    case ACTIONS.MOVE_UNIT: {
      if (!state.selectedUnit) {
        console.log('❌ No unit selected for move');
        return state;
      }

      // ✅ Kiểm tra hasActed TRƯỚC KHI MOVE
      if (state.selectedUnit.hasActed) {
        console.log('❌ Unit đã hành động, không thể move');
        return state;
      }

      const updatedUnits = state.units.map(u =>
        u.id === state.selectedUnit.id
          ? { ...u, position: action.position }
          : u
      );

      console.log(`✅ ${state.selectedUnit.id} moved to (${action.position.x}, ${action.position.y})`);

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
    // ATTACK UNIT - FIXED ✅
    // ----------------------------------------
    case ACTIONS.ATTACK_UNIT: {
      if (!state.selectedUnit) {
        console.log('❌ No unit selected for attack');
        return state;
      }

      // ✅ Kiểm tra hasActed TRƯỚC KHI ATTACK
      if (state.selectedUnit.hasActed) {
        console.log('❌ Unit đã hành động, không thể attack');
        return state;
      }

      const attacker = state.selectedUnit;
      const defender = state.units.find(u => u.id === action.targetId);

      if (!defender) {
        console.log('❌ Defender not found');
        return state;
      }

      // Calculate damage
      const damageResult = calculateDamage(attacker, defender);
      const newHp = Math.max(0, defender.hp - damageResult.finalDamage);

      console.log(`⚔️ ${attacker.id} attacked ${defender.id} for ${damageResult.finalDamage} damage`);

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
      console.log(`🔄 Turn ended: ${state.currentTurn}`);
      
      // Reset hasActed cho tất cả units
      const updatedUnits = state.units.map(u => ({
        ...u,
        hasActed: false,
      }));

      // Switch turn
      const nextTurn = state.currentTurn === TEAMS.PLAYER 
        ? TEAMS.ENEMY 
        : TEAMS.PLAYER;

      console.log(`🔄 Next turn: ${nextTurn}`);

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
      console.log(`🔄 Game reset to level ${level}`);
      
      return {
        units: createInitialUnits(level),
        selectedUnit: null,
        currentTurn: TEAMS.PLAYER,
        gameStatus: GAME_STATUS.PLAYING,
        combatLog: [],
        currentLevel: level,
      };
    }

    // ----------------------------------------
    // RESTORE GAME
    // ----------------------------------------
    case ACTIONS.RESTORE_GAME: {
      const { gameState } = action;
      console.log('📂 Game restored from save');
      
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

export default gameReducer;