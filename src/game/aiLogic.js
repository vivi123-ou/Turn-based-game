import { UNIT_TYPES, UNIT_STATS, TEAMS } from './constants';
import { getValidMoves, getValidTargets, getManhattanDistance } from './gameLogic';

// ============================================
// AI DECISION MAKING FOR ONE UNIT
// ============================================

export const getAIAction = (unit, allUnits) => {
  const playerUnits = allUnits.filter(u => u.team === TEAMS.PLAYER && u.hp > 0);
  
  if (playerUnits.length === 0) return null;

  // ✅ PRIORITY 1: CHECK IF CAN ATTACK
  const validTargets = getValidTargets(unit, allUnits);

  if (validTargets.length > 0) {
    const target = selectTarget(unit, validTargets, playerUnits);
    return {
      type: 'ATTACK',
      targetId: target.id,
    };
  }

  // ✅ PRIORITY 2: MOVE CLOSER TO ENEMY
  const validMoves = getValidMoves(unit, allUnits);
  
  if (validMoves.length > 0) {
    const targetEnemy = selectMoveTarget(unit, playerUnits);
    const bestMove = findBestMove(unit.position, validMoves, targetEnemy.position);
    
    return {
      type: 'MOVE',
      position: bestMove,
    };
  }

  // ⭐ NO ACTION AVAILABLE
  return null;
};

// ============================================
// SELECT ATTACK TARGET
// ============================================

const selectTarget = (attacker, validTargets, allPlayerUnits) => {
  if (attacker.type === UNIT_TYPES.ALIEN_LARGE) {
    // Large Alien: Target lowest HP
    return validTargets.reduce((lowest, target) => {
      return target.hp < lowest.hp ? target : lowest;
    });
  } else {
    // Small Alien: 80% nearest, 20% prioritize artillery
    const shouldTargetArtillery = Math.random() < 0.2;
    
    if (shouldTargetArtillery) {
      const artilleryTargets = validTargets.filter(t => t.type === UNIT_TYPES.TANK_ARTILLERY);
      if (artilleryTargets.length > 0) {
        return artilleryTargets[0];
      }
    }
    
    // Target nearest unit
    return validTargets.reduce((closest, target) => {
      const distTarget = getManhattanDistance(attacker.position, target.position);
      const distClosest = getManhattanDistance(attacker.position, closest.position);
      return distTarget < distClosest ? target : closest;
    });
  }
};

// ============================================
// SELECT MOVE TARGET
// ============================================

const selectMoveTarget = (unit, playerUnits) => {
  // Find nearest player unit
  return playerUnits.reduce((closest, target) => {
    const distTarget = getManhattanDistance(unit.position, target.position);
    const distClosest = getManhattanDistance(unit.position, closest.position);
    return distTarget < distClosest ? target : closest;
  });
};

// ============================================
// FIND BEST MOVE POSITION
// ============================================

const findBestMove = (currentPos, validMoves, targetPos) => {
  return validMoves.reduce((best, move) => {
    const distMove = getManhattanDistance(move, targetPos);
    const distBest = getManhattanDistance(best, targetPos);
    return distMove < distBest ? move : best;
  });
};

// ============================================
// ✅ EXECUTE AI TURN - FIXED TO COUNTER ATTACK
// ============================================

export const executeAITurn = (units) => {
  // Get all alive enemy units that haven't acted
  const enemyUnits = units.filter(u => 
    u.team === TEAMS.ENEMY && 
    u.hp > 0 && 
    !u.hasActed // Important: check hasActed
  );
  
  const actions = [];

  // Each enemy unit decides action
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