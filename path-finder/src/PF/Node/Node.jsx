import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseOver,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? "target-node"
      : isStart
      ? "start-node"
      : isWall
      ? "node-wall"
      : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseOver={() => onMouseOver(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
