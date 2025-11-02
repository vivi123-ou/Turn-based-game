import React from 'react';
import Cell from './Cell';
import Unit from './Unit';
import { BOARD_SIZE } from '../game/constants';
import { getUnitAtPosition, getValidMoves, getValidTargets } from '../game/gameLogic';

const Board = ({
  units,
  selectedUnit,
  onSelectUnit,
  onMove,
  onAttack
}) => {
  const validMoves = selectedUnit ? getValidMoves(selectedUnit, units) : [];
  const validTargets = selectedUnit ? getValidTargets(selectedUnit, units) : [];

  const handleCellClick = (x, y) => {
    const unitAtPosition = getUnitAtPosition(x, y, units);

    // Nếu click vào ô có unit
    if (unitAtPosition) {
      // Nếu là valid target -> attack
      const isTarget = validTargets.some(t => t.id === unitAtPosition.id);
      if (isTarget && selectedUnit) {
        onAttack(unitAtPosition.id);
        return;
      }

      // Nếu không -> select unit đó
      onSelectUnit(unitAtPosition.id);
      return;
    }

    // Nếu click vào ô trống và là valid move
    const isValidMove = validMoves.some(m => m.x === x && m.y === y);
    if (isValidMove && selectedUnit) {
      onMove({ x, y });
    }
  };

  const renderBoard = () => {
    const rows = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      const cells = [];
      for (let x = 0; x < BOARD_SIZE; x++) {
        const unit = getUnitAtPosition(x, y, units);
        const isValidMove = validMoves.some(m => m.x === x && m.y === y);
        const isValidTarget = validTargets.some(t =>
          t.position.x === x && t.position.y === y
        );
        const isSelected = selectedUnit &&
          selectedUnit.position.x === x &&
          selectedUnit.position.y === y;

        cells.push(
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            unit={unit ? (
              <Unit
                unit={unit}
                isSelected={isSelected}
                onClick={() => handleCellClick(x, y)}
              />
            ) : null}
            isValidMove={isValidMove}
            isValidTarget={isValidTarget}
            isSelected={isSelected}
            onClick={() => handleCellClick(x, y)}
          />
        );
      }
      rows.push(
        <div key={y} style={{ display: 'flex' }}>
          {cells}
        </div>
      );
    }
    return rows;
  };

  return (
    <div style={{
      display: 'inline-block',
      border: '4px solid #333',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    }}>
      {renderBoard()}
    </div>
  );
};

export default Board;
