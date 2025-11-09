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
// SELECT ATTACK TARGET - IMPROVED STRATEGY
// ============================================

const selectTarget = (attacker, validTargets, allPlayerUnits) => {
  // Strategy cho từng loại unit
  if (attacker.type === UNIT_TYPES.ALIEN_LARGE) {
    // Large Alien: Ưu tiên Artillery (30%), sau đó lowest HP (70%)
    const shouldTargetArtillery = Math.random() < 0.3;
    
    if (shouldTargetArtillery) {
      const artilleryTargets = validTargets.filter(t => t.type === UNIT_TYPES.TANK_ARTILLERY);
      if (artilleryTargets.length > 0) {
        // Target artillery with lowest HP
        return artilleryTargets.reduce((lowest, target) => {
          return target.hp < lowest.hp ? target : lowest;
        });
      }
    }
    
    // Target lowest HP
    return validTargets.reduce((lowest, target) => {
      return target.hp < lowest.hp ? target : lowest;
    });
    
  } else if (attacker.type === UNIT_TYPES.ALIEN_SMALL) {
    // Small Alien: Aggressive - 50% artillery, 50% nearest
    const shouldTargetArtillery = Math.random() < 0.5;
    
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

  // Default: target nearest
  return validTargets.reduce((closest, target) => {
    const distTarget = getManhattanDistance(attacker.position, target.position);
    const distClosest = getManhattanDistance(attacker.position, closest.position);
    return distTarget < distClosest ? target : closest;
  });
};

// ============================================
// SELECT MOVE TARGET - IMPROVED
// ============================================

const selectMoveTarget = (unit, playerUnits) => {
  // Large Alien: Prefer artillery
  if (unit.type === UNIT_TYPES.ALIEN_LARGE) {
    const artilleryUnits = playerUnits.filter(u => u.type === UNIT_TYPES.TANK_ARTILLERY);
    if (artilleryUnits.length > 0) {
      // Find nearest artillery
      return artilleryUnits.reduce((closest, target) => {
        const distTarget = getManhattanDistance(unit.position, target.position);
        const distClosest = getManhattanDistance(unit.position, closest.position);
        return distTarget < distClosest ? target : closest;
      });
    }
  }

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
// EXECUTE AI TURN - PROPER IMPLEMENTATION
// ============================================

export const executeAITurn = (units) => {
  // Get all alive enemy units that haven't acted
  const enemyUnits = units.filter(u => 
    u.team === TEAMS.ENEMY && 
    u.hp > 0 && 
    !u.hasActed
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

  console.log('🤖 AI Turn:', actions.length, 'actions planned');
  
  return actions;
};