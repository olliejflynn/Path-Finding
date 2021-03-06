import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathFinder.css";

const GRID_HEIGHT = 30;
const GRID_WIDTH = 45;

const START_NODE_X = 3;
const START_NODE_Y = 3;
const FINISH_NODE_X = GRID_WIDTH - 4;
const FINISH_NODE_Y = GRID_HEIGHT - 4;

export default class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = setupGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    console.log("set wall");
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseOver(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button>Clear Grid</button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseOver={(row, col) => this.handleMouseOver(row, col)}
                      onMouseUp={(row, col) => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const setupGrid = () => {
  const grid = [];
  for (let row = 0; row < GRID_HEIGHT; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_WIDTH; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_Y && col === START_NODE_X,
    isFinish: row === FINISH_NODE_Y && col === FINISH_NODE_X,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
