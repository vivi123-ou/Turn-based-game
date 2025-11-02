// Kích thước board
export const BOARD_SIZE = 6;

// Loại unit
export const UNIT_TYPES = {
  TANK_ARTILLERY: 'TANK_ARTILLERY',
  TANK_BRAWLER: 'TANK_BRAWLER',
  ALIEN_LARGE: 'ALIEN_LARGE',
  ALIEN_SMALL: 'ALIEN_SMALL',
};

// Team
export const TEAMS = {
  PLAYER: 'PLAYER',
  ENEMY: 'ENEMY',
};

// Thông số unit
export const UNIT_STATS = {
  [UNIT_TYPES.TANK_ARTILLERY]: {
    name: 'Xe Tăng Pháo',
    hp: 1200,
    armor: 450,
    baseDamage: 400,
    minRange: 2,
    maxRange: 4,
    moveRange: 1,
    dodgeRate: 0.25,
    color: '#2E7D32',
    team: TEAMS.PLAYER,
  },
  [UNIT_TYPES.TANK_BRAWLER]: {
    name: 'Xe Tăng Cận Chiến',
    hp: 1500,
    armor: 500,
    baseDamage: 450,
    minRange: 1,
    maxRange: 2,
    moveRange: 2,
    dodgeRate: 0.25,
    color: '#1976D2',
    team: TEAMS.PLAYER,
  },
  [UNIT_TYPES.ALIEN_LARGE]: {
    name: 'Alien Lớn',
    hp: 1400,
    armor: 300,
    baseDamage: 450,
    minRange: 1,
    maxRange: 3,
    moveRange: 2,
    dodgeRate: 0.40,
    color: '#C62828',
    team: TEAMS.ENEMY,
  },
  [UNIT_TYPES.ALIEN_SMALL]: {
    name: 'Alien Nhỏ',
    hp: 800,
    armor: 150,
    baseDamage: 350,
    minRange: 1,
    maxRange: 2,
    moveRange: 3,
    dodgeRate: 0.40,
    color: '#E64A19',
    team: TEAMS.ENEMY,
  },
};

// Game actions
export const ACTIONS = {
  SELECT_UNIT: 'SELECT_UNIT',
  MOVE_UNIT: 'MOVE_UNIT',
  ATTACK_UNIT: 'ATTACK_UNIT',
  END_TURN: 'END_TURN',
  RESET_GAME: 'RESET_GAME',
};

// Game states
export const GAME_STATUS = {
  PLAYING: 'PLAYING',
  PLAYER_WIN: 'PLAYER_WIN',
  ENEMY_WIN: 'ENEMY_WIN',
};