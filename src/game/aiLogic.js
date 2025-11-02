import { UNIT_TYPES, UNIT_STATS, TEAMS } from './constants';
import { getValidMoves, getValidTargets, getManhattanDistance } from './gameLogic';

// AI quyết định hành động cho 1 unit
export const getAIAction = (unit, allUnits) => {
  const playerUnits = allUnits.filter(u => u.team === TEAMS.PLAYER && u.hp > 0);
  
  if (playerUnits.length === 0) return null;

  // ƯU TIÊN 1: Kiểm tra có thể tấn công không
  const validTargets = getValidTargets(unit, allUnits);

  if (validTargets.length > 0) {
    const target = selectTarget(unit, validTargets, playerUnits);
    return {
      type: 'ATTACK',
      targetId: target.id,
    };
  }

  //  ƯU TIÊN 2: Nếu không tấn công được → di chuyển
  const validMoves = getValidMoves(unit, allUnits);
  
  if (validMoves.length > 0) {
    const targetEnemy = selectMoveTarget(unit, playerUnits);
    const bestMove = findBestMove(unit.position, validMoves, targetEnemy.position);
    
    return {
      type: 'MOVE',
      position: bestMove,
    };
  }

  // ⭐ Không làm gì được
  return null;
};

// Chọn mục tiêu để attack
const selectTarget = (attacker, validTargets, allPlayerUnits) => {
  if (attacker.type === UNIT_TYPES.ALIEN_LARGE) {
    // Alien lớn: ưu tiên HP thấp nhất
    return validTargets.reduce((lowest, target) => {
      return target.hp < lowest.hp ? target : lowest;
    });
  } else {
    // Alien nhỏ: 80% target gần nhất, 20% ưu tiên pháo
    const shouldTargetArtillery = Math.random() < 0.2;
    
    if (shouldTargetArtillery) {
      const artilleryTargets = validTargets.filter(t => t.type === UNIT_TYPES.TANK_ARTILLERY);
      if (artilleryTargets.length > 0) {
        return artilleryTargets[0];
      }
    }
    
    // Target gần nhất
    return validTargets.reduce((closest, target) => {
      const distTarget = getManhattanDistance(attacker.position, target.position);
      const distClosest = getManhattanDistance(attacker.position, closest.position);
      return distTarget < distClosest ? target : closest;
    });
  }
};

// Chọn mục tiêu để di chuyển đến
const selectMoveTarget = (unit, playerUnits) => {
  // Tìm player unit gần nhất
  return playerUnits.reduce((closest, target) => {
    const distTarget = getManhattanDistance(unit.position, target.position);
    const distClosest = getManhattanDistance(unit.position, closest.position);
    return distTarget < distClosest ? target : closest;
  });
};

// Tìm ô di chuyển tốt nhất (gần target nhất)
const findBestMove = (currentPos, validMoves, targetPos) => {
  return validMoves.reduce((best, move) => {
    const distMove = getManhattanDistance(move, targetPos);
    const distBest = getManhattanDistance(best, targetPos);
    return distMove < distBest ? move : best;
  });
};

// ⭐ THỰC HIỆN AI TURN - ĐÃ FIX
export const executeAITurn = (units) => {
  const enemyUnits = units.filter(u => 
    u.team === TEAMS.ENEMY && 
    u.hp > 0 && 
    !u.hasActed
  );
  
  const actions = [];

  enemyUnits.forEach(unit => {
    const action = getAIAction(unit, units);
    if (action) {
      actions.push({
        unitId: unit.id,
        action,
      });
    }
  });

  return actions;
};