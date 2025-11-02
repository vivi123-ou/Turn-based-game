import React from 'react';
import { UNIT_STATS, TEAMS } from '../game/constants';

const StatsPanel = ({ units, selectedUnit, combatLog }) => {
  const playerUnits = units.filter(u => u.team === TEAMS.PLAYER);
  const enemyUnits = units.filter(u => u.team === TEAMS.ENEMY);

  const renderUnitList = (unitList, title) => (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ 
        margin: '0 0 10px 0',
        color: title.includes('Player') ? '#2E7D32' : '#C62828'
      }}>
        {title}
      </h3>
      {unitList.map(unit => {
        const stats = UNIT_STATS[unit.type];
        const hpPercent = (unit.hp / stats.hp * 100).toFixed(0);
        const isAlive = unit.hp > 0;
        
        return (
          <div
            key={unit.id}
            style={{
              padding: '8px',
              marginBottom: '6px',
              backgroundColor: unit.id === selectedUnit?.id ? '#FFF9C4' : '#f5f5f5',
              border: `2px solid ${isAlive ? stats.color : '#999'}`,
              borderRadius: '4px',
              opacity: isAlive ? 1 : 0.5,
            }}
          >
            <div style={{ 
              fontWeight: 'bold',
              marginBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span>{stats.name}</span>
              <span style={{ color: isAlive ? 'green' : 'red' }}>
                {isAlive ? '✓' : '✗'}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              HP: {unit.hp} / {stats.hp} ({hpPercent}%)
            </div>
            <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
              Armor: {stats.armor} | Dmg: {stats.baseDamage} | Dodge: {(stats.dodgeRate * 100).toFixed(0)}%
            </div>
            <div style={{ fontSize: '11px', color: '#888' }}>
              Range: {stats.minRange}-{stats.maxRange} | Move: {stats.moveRange}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderCombatLog = () => {
    if (combatLog.length === 0) return null;

    const recentLogs = combatLog.slice(-5).reverse();

    return (
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Combat Log</h3>
        <div style={{
          maxHeight: '200px',
          overflowY: 'auto',
          backgroundColor: '#1a1a1a',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: 'monospace',
        }}>
          {recentLogs.map((log, index) => (
            <div
              key={index}
              style={{
                marginBottom: '8px',
                paddingBottom: '8px',
                borderBottom: '1px solid #333',
                color: log.dodged ? '#FFC107' : '#4CAF50',
              }}
            >
              <div>
                {log.attacker} ➜ {log.defender}
              </div>
              {log.dodged ? (
                <div style={{ color: '#FFC107' }}>
                  ⚡ DODGED!
                </div>
              ) : (
                <>
                  <div style={{ color: '#F44336' }}>
                    💥 Dmg: {log.rawDamage} - {log.armorBlocked} (armor) = {log.finalDamage}
                  </div>
                  <div style={{ color: log.remainingHp > 0 ? '#8BC34A' : '#F44336' }}>
                    ❤️ HP Left: {log.remainingHp}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      width: '300px',
      padding: '20px',
      backgroundColor: '#fafafa',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      maxHeight: '600px',
      overflowY: 'auto',
    }}>
      <h2 style={{ marginTop: 0 }}>Unit Stats</h2>
      {renderUnitList(playerUnits, '🟢 Player Units')}
      {renderUnitList(enemyUnits, '🔴 Enemy Units')}
      {renderCombatLog()}
    </div>
  );
};

export default StatsPanel;

