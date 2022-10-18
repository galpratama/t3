import "./TicTacToe.css";
import userIcon from "./users.png";
import React, { useState, useEffect } from "react";

const TicTacToe = () => {
  const [previousStatus, setPreviousStatus] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xTurn, setXTurn] = useState(true);
  const winner = calculateWinner(previousStatus[stepNumber]);
  const players = xTurn ? "X" : "O";

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [scoreDraw, setScoreDraw] = useState(0);

  const handleClick = (i) => {
    const previousStatusPoint = previousStatus.slice(0, stepNumber + 1);
    const current = previousStatusPoint[stepNumber];
    const squares = [...current];

    if (winner || squares[i]) return;

    squares[i] = players;
    setPreviousStatus([...previousStatusPoint, squares]);
    setStepNumber(previousStatusPoint.length);
    setXTurn(!xTurn);
  };

  // Watch the winner using useEffect
  useEffect(() => {
    if (winner) {
      console.log("Winner is " + winner);
      if (winner === "X") {
        setScoreX((s) => s + 1);
      } else if (winner === "O") {
        setScoreO((s) => s + 1);
      }
    }
  }, [winner]);

  // Watch the draw using useEffect
  useEffect(() => {
    if (stepNumber === 9 && !winner) {
      console.log("Draw");
      // Update the score
      setScoreDraw((s) => s + 1);
    }
  }, [winner, stepNumber]);

  // Watch the players using useEffect
  useEffect(() => {
    if (players) {
      console.log("Player is " + players);
    }
  }, [players]);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const element of lines) {
      const [a, b, c] = element;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Tic Tac Toe</h1>
        <Board squares={previousStatus[stepNumber]} onClick={handleClick} />
        <div className="info">
          <div className="info-box">
            <div>Player 1 (X)</div>
            <h3>{scoreX}</h3>
          </div>
          <div className="info-box">
            <div>Tie</div>
            <h3>{scoreDraw}</h3>
          </div>
          <div className="info-box">
            <div>Player 2 (O)</div>
            <h3>{scoreO}</h3>
          </div>
          <div className="info-box">
            <div>
              <img src={userIcon} alt="User Icon" />
            </div>
            <div>{players === "X" ? "1P" : "2P"}</div>
          </div>
        </div>
        <div className="winner-info">
          {winner ? <h2>Winner is {winner}</h2> : ""}
          {stepNumber === 9 && !winner ? <h2>It's a draw!</h2> : ""}
        </div>

        <div className="info">
          {winner || stepNumber === 9 ? (
            <button
              className="reset-button"
              onClick={() => {
                setPreviousStatus([Array(9).fill(null)]);
                setStepNumber(0);
                setXTurn(true);
              }}
            >
              Play Again
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

// Function for rendering the X and O
const renderIcon = (value) => {
  if (value === "X") {
    return <img src="https://img.icons8.com/ios/50/ffffff/x.png" alt="X" />;
  } else if (value === "O") {
    return <img src="https://img.icons8.com/ios/50/ffffff/o.png" alt="O" />;
  } else {
    return null;
  }
};

const Square = ({ value, onClick }) => {
  const style = value ? `squares ${value}` : `squares`;
  return (
    <button className={style} onClick={onClick}>
      {renderIcon(value)}
    </button>
  );
};

const Board = ({ squares, onClick }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

export default TicTacToe;
