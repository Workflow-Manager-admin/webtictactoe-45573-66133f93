import React, { useState } from "react";
import "./App.css";

// --- Main color palette (from requirements)
const COLORS = {
  primary: "#4CAF50",   // Green
  secondary: "#FFC107", // Amber
  accent: "#2196F3",    // Blue
  background: "#F8F9FA",
  boardLine: "#CBD5E1",
  cellHover: "#E3F2FD"
};

// --- Game Status Helper
function calculateWinner(cells) {
  // Indices for win - rows, columns, diagonals
  const lines = [
    [0, 1, 2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8],   // columns
    [0,4,8], [2,4,6]             // diagonals
  ];
  for (let line of lines) {
    const [a,b,c] = line;
    if (
      cells[a] &&
      cells[a] === cells[b] &&
      cells[a] === cells[c]
    ) {
      return cells[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  // State for board (9 cells), player (X/O), status
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const winner = calculateWinner(board);
  const isBoardFull = board.every(Boolean);

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] || winner) return;
    const nextBoard = board.slice();
    nextBoard[idx] = isX ? "X" : "O";
    setBoard(nextBoard);
    setIsX(!isX);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsX(true);
  }

  // PUBLIC_INTERFACE
  function renderCell(idx) {
    return (
      <button
        className="ttt-cell"
        onClick={() => handleCellClick(idx)}
        style={{
          color:
            board[idx] === "X"
              ? COLORS.primary
              : board[idx] === "O"
              ? COLORS.accent
              : COLORS.boardLine,
          cursor: board[idx] || winner ? "default" : "pointer",
        }}
        aria-label={`Cell ${idx + 1} ${board[idx] ? board[idx] : ""}`}
        disabled={Boolean(board[idx]) || Boolean(winner)}
      >
        {board[idx]}
      </button>
    );
  }

  // Display status
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull) {
    status = "Draw!";
  } else {
    status = `Next: ${isX ? "X" : "O"}`;
  }

  return (
    <div className="app" style={{ background: COLORS.background, minHeight: "100vh" }}>
      <nav className="navbar" style={{ background: "#fff", borderBottom: `2px solid ${COLORS.boardLine}` }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="logo" style={{ color: COLORS.primary, fontWeight: 700, fontSize: "1.5rem" }}>
            <span role="img" aria-label="tic-tac-toe" style={{color:COLORS.accent}}>#</span> WebTicTacToe
          </span>
          <button
            className="btn"
            style={{
              backgroundColor: COLORS.primary,
              color: "#fff",
              borderRadius: "100px",
              fontWeight: 500
            }}
            onClick={handleReset}
            aria-label="Reset Game"
          >
            Reset
          </button>
        </div>
      </nav>

      <main style={{ marginTop: 100 }}>
        <div
          className="container"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}
        >
          {/* Game Status */}
          <div
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              color: winner
                ? (winner === "X" ? COLORS.primary : COLORS.accent)
                : COLORS.secondary,
              marginBottom: 20,
              minHeight: 40,
              letterSpacing: "0.03em"
            }}
            role="status"
            aria-live="polite"
            data-testid="ttt-status"
          >
            {status}
          </div>

          {/* Game Board */}
          <div
            className="ttt-board"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 68px)",
              gridTemplateRows: "repeat(3, 68px)",
              gap: "5px",
              background: "#fff",
              padding: "22px",
              borderRadius: 24,
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.05), 0 1.5px 0 0 " + COLORS.boardLine
            }}
            data-testid="ttt-board"
          >
            {Array.from({ length: 9 }, (_, idx) => renderCell(idx))}
          </div>

          {/* Player Interaction Info */}
          <div
            style={{
              marginTop: 18,
              fontSize: "1.1rem",
              color: "#7A899B",
              minHeight: 24,
              textAlign: "center"
            }}
            data-testid="ttt-interaction"
          >
            {winner
              ? "Click Reset to play again."
              : `Player ${isX ? "X" : "O"}, it's your move.`}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;