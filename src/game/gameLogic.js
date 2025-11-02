import { BOARD_SIZE, UNIT_STATS, TEAMS } from './constants';

// Tính khoảng cách Manhattan
export const getManhattanDistance = (pos1, pos2) => {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
};

// Kiểm tra vị trí hợp lệ
export const isValidPosition = (x, y) => {
  return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
};

// Lấy các ô có thể di chuyển
export const getValidMoves = (unit, units) => {
  const validMoves = [];
  const { x, y } = unit.position;
  const moveRange = UNIT_STATS[unit.type].moveRange;

  for (let dx = -moveRange; dx <= moveRange; dx++) {
    for (let dy = -moveRange; dy <= moveRange; dy++) {
      const newX = x + dx;
      const newY = y + dy;
      const distance = Math.abs(dx) + Math.abs(dy);

      if (
        distance > 0 &&
        distance <= moveRange &&
        isValidPosition(newX, newY) &&
        !isPositionOccupied(newX, newY, units)
      ) {
        validMoves.push({ x: newX, y: newY });
      }
    }
  }

  return validMoves;
};

// Kiểm tra vị trí có unit không
export const isPositionOccupied = (x, y, units) => {
  return units.some(u => u.position.x === x && u.position.y === y);
};

// Lấy unit tại vị trí
export const getUnitAtPosition = (x, y, units) => {
  return units.find(u => u.position.x === x && u.position.y === y);
};

// Lấy các mục tiêu có thể tấn công
export const getValidTargets = (attacker, units) => {
  const stats = UNIT_STATS[attacker.type];
  const validTargets = [];

  units.forEach(unit => {
    if (unit.team !== attacker.team && unit.hp > 0) {
      const distance = getManhattanDistance(attacker.position, unit.position);
      if (distance >= stats.minRange && distance <= stats.maxRange) {
        validTargets.push(unit);
      }
    }
  });

  return validTargets;
};

// Tính damage với random và armor
export const calculateDamage = (attacker, defender) => {
  const attackerStats = UNIT_STATS[attacker.type];
  const defenderStats = UNIT_STATS[defender.type];

  // Random damage từ baseDamage đến baseDamage * 1.5
  const randomMultiplier = 1 + Math.random() * 0.5;
  const rawDamage = Math.floor(attackerStats.baseDamage * randomMultiplier);

  // Tính damage sau armor
  const finalDamage = Math.max(0, rawDamage - defenderStats.armor);

  // Kiểm tra dodge
  const dodged = Math.random() < defenderStats.dodgeRate;

  return {
    rawDamage,
    finalDamage: dodged ? 0 : finalDamage,
    dodged,
    armorBlocked: rawDamage - finalDamage,
  };
};

// Kiểm tra game kết thúc
export const checkGameOver = (units) => {
  const playerAlive = units.some(u => u.team === TEAMS.PLAYER && u.hp > 0);
  const enemyAlive = units.some(u => u.team === TEAMS.ENEMY && u.hp > 0);

  if (!playerAlive) return 'ENEMY_WIN';
  if (!enemyAlive) return 'PLAYER_WIN';
  return 'PLAYING';
};

// Tạo initial units
export const createInitialUnits = () => {
  return [
    // Player units
    {
      id: 'tank1',
      type: 'TANK_ARTILLERY',
      team: TEAMS.PLAYER,
      position: { x: 0, y: 2 },
      hp: UNIT_STATS.TANK_ARTILLERY.hp,
      hasActed: false,
    },
    {
      id: 'tank2',
      type: 'TANK_BRAWLER',
      team: TEAMS.PLAYER,
      position: { x: 0, y: 3 },
      hp: UNIT_STATS.TANK_BRAWLER.hp,
      hasActed: false,
    },
    // Enemy units
    {
      id: 'alien1',
      type: 'ALIEN_LARGE',
      team: TEAMS.ENEMY,
      position: { x: 5, y: 1 },
      hp: UNIT_STATS.ALIEN_LARGE.hp,
      hasActed: false,
    },
    {
      id: 'alien2',
      type: 'ALIEN_SMALL',
      team: TEAMS.ENEMY,
      position: { x: 5, y: 3 },
      hp: UNIT_STATS.ALIEN_SMALL.hp,
      hasActed: false,
    },
    {
      id: 'alien3',
      type: 'ALIEN_SMALL',
      team: TEAMS.ENEMY,
      position: { x: 5, y: 4 },
      hp: UNIT_STATS.ALIEN_SMALL.hp,
      hasActed: false,
    },
  ];
};
