import { ACTIONS, GAME_STATUS, TEAMS } from './constants';
import { 
  getUnitAtPosition, 
  calculateDamage, 
  checkGameOver,
  createInitialUnits 
} from './gameLogic';

export const initialState = {
  units: createInitialUnits(),
  selectedUnit: null,
  currentTurn: TEAMS.PLAYER,
  gameStatus: GAME_STATUS.PLAYING,
  combatLog: [],
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SELECT_UNIT: {
      const unit = state.units.find(u => u.id === action.unitId);
      if (!unit || unit.team !== TEAMS.PLAYER || unit.hasActed || unit.hp <= 0) {
        return state;
      }
      return { ...state, selectedUnit: unit };
    }

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
        selectedUnit: { ...state.selectedUnit, position: action.position },
      };
    }

    case ACTIONS.ATTACK_UNIT: {
      if (!state.selectedUnit) return state;

      const attacker = state.selectedUnit;
      const defender = state.units.find(u => u.id === action.targetId);

      if (!defender) return state;

      const damageResult = calculateDamage(attacker, defender);
      const newHp = Math.max(0, defender.hp - damageResult.finalDamage);

      const updatedUnits = state.units.map(u => {
        if (u.id === defender.id) {
          return { ...u, hp: newHp };
        }
        if (u.id === attacker.id) {
          return { ...u, hasActed: true };
        }
        return u;
      });

      const logEntry = {
        attacker: attacker.id,
        defender: defender.id,
        ...damageResult,
        remainingHp: newHp,
      };

      const newGameStatus = checkGameOver(updatedUnits);

      return {
        ...state,
        units: updatedUnits,
        selectedUnit: null,
        combatLog: [...state.combatLog, logEntry],
        gameStatus: newGameStatus,
      };
    }

    case ACTIONS.END_TURN: {
      // Reset hasActed cho units của team hiện tại
      const updatedUnits = state.units.map(u => ({
        ...u,
        hasActed: false,
      }));

      const nextTurn = state.currentTurn === TEAMS.PLAYER ? TEAMS.ENEMY : TEAMS.PLAYER;

      return {
        ...state,
        units: updatedUnits,
        currentTurn: nextTurn,
        selectedUnit: null,
      };
    }

    case ACTIONS.RESET_GAME: {
      return initialState;
    }

    default:
      return state;
  }
};
