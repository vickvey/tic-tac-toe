import PropTypes from "prop-types"
import { useState } from "react"
import "./App.css";

export default function App() {
  const [playGame, setPlayGame] = useState(false);
  const [winner, setWinner] = useState(null); // Initially null then either Player 1 or Player 2

  return (
    <div className="app">
      <Header />
      <main>

        {/* {!playGame ? (
          // Not Playing Game (playGame=false, winner=null)
          <>
            <div className="rules">
              <p>Tic-Tac-Toe is a two-player game played on a 3x3 grid. One player uses &quot;X&quot; and the other uses &quot;O&quot;. Players take turns placing their symbol in an empty BoardCell on the grid, with the goal of being the first to get three of their symbols in a row, either horizontally, vertically, or diagonally. The game ends when a player wins by completing a row, or when all BoardCells are filled, resulting in a draw if no player wins.</p>
            </div>
            <div>
              <Button id="play-game-btn" content={'Play Game'} onClick={() => setPlayGame(!playGame)} />
            </div>
          </>
        ) : (
          (!winner ? (
            // Playing Game (playGame=true, winner=null)
            <GamePlay setPlayGame={setPlayGame} setWinner={setWinner} />
          ) : (
            // Not Playing Game (playGame=false, winner=['O' or 'X'])
            <div>
              <div>Player <span>{winner} wins!</span></div>
              <Button id="play-again-btn" content={'Play Again'} onClick={() => {
                setWinner(null);
              }} />
            </div>
          ))
        )} */}

        {!playGame ? (
          // Not Playing Game: [playGame=false]
          (!winner ? (
            // Not Playing Game: [playGame=false, winner=null]
            <>
              <div className="rules">
                <p>Tic-Tac-Toe is a two-player game played on a 3x3 grid. One player uses &quot;X&quot; and the other uses &quot;O&quot;. Players take turns placing their symbol in an empty BoardCell on the grid, with the goal of being the first to get three of their symbols in a row, either horizontally, vertically, or diagonally. The game ends when a player wins by completing a row, or when all BoardCells are filled, resulting in a draw if no player wins.</p>
              </div>
              <div>
                <Button id="play-game-btn" content={'Play Game'} onClick={() => setPlayGame(!playGame)} />
              </div>
            </>
          ) : (
            // Not Playing Game: (playGame=false, winner=['O' or 'X'])
            <div>
              <div>Player <span>{winner} wins!</span></div>
              <Button id="play-again-btn" content={'Play Again'} onClick={() => {
                setWinner(null);
              }} />
            </div>
          ))
        ) : (
          // Playing Game: [playGame=true, winner=null]
          <GamePlay setPlayGame={setPlayGame} setWinner={setWinner} />
        )}
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header>
      <h1>Tic Tac Toe</h1>
      <p>A classic game of circles and crosses</p>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <span>Developed by: <a href="https://github.com/vickvey">Vivek Kumar</a></span>
      <span>Copyright 2024</span>
    </footer>
  )
}

function Button({ id, content, onClick }) {
  return (
    <button id={id} onClick={onClick}>{content}</button>
  )
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

/// TODO: Complete this later
function BoardCell({ id, content, onClick, disabled }) {
  return (
    <button className="board-cell" id={id} onClick={onClick} disabled={disabled}>{content}</button>
  )
}

BoardCell.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
}

GamePlay.propTypes = {
  setPlayGame: PropTypes.func.isRequired,
  setWinner: PropTypes.func.isRequired
}

/// TODO: Complete this later
function GamePlay({ setPlayGame, setWinner }) {
  // Board index
  // | 0 1 2 |
  // | 3 4 5 |
  // | 6 7 8 |
  // Player 1 - O
  // Player 2 - X

  const PLAYER_ENUM = {
    PLAYER_1: 'O',
    PLAYER_2: 'X'
  };

  // States
  const [turn, setTurn] = useState('O');
  const [boardState, setBoardState] = useState(Array(9).fill(null)); // Board State Array 0-8

  // Event handlers
  function handleBoardCellClick(index) {
    // Prevent any interaction after game is over
    if (boardState[index] !== null || checkWinner()) return;

    console.log("Cell clicked at index:", index);
    // Check turn and board state before the update
    console.log("Current turn:", turn);
    console.log("Current board state:", boardState);

    setBoardState(boardState => boardState.map((prevVal, idx) => (idx === index ? turn : prevVal)));

    const haveWinner = checkWinner();
    if (haveWinner) {
      console.log("Winner found:", haveWinner); // Log winner found
      setWinner(haveWinner); // Set the winner
      setPlayGame(false); // End the game after a winner is found
      return;
    }
    setTurn(turn => turn === PLAYER_ENUM.PLAYER_1 ? PLAYER_ENUM.PLAYER_2 : PLAYER_ENUM.PLAYER_1);
  }

  // Helper functions
  function checkWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // vertical
      [0, 4, 8], [2, 4, 6]              // diagonal
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // Check if all three positions are filled and are equal
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a]; // Returns the player ('X' or 'O') who won
      }
    }
    return null; // No winner yet
  }

  // function countCellsFilled() {
  //   return boardState.reduce((prev, curr, cellIdx) => {
  //     if (boardState[cellIdx] === null) return prev + 1;
  //     return prev;
  //   }, 0);
  // }

  /// Debug
  console.clear();
  console.log("Rendering with turn:", turn);
  console.log("Current board state:", boardState);
  console.log("Winner:", checkWinner());
  return (
    <div className="game-play">
      <div className="turn-info">
        <div>You are playing with symbol <span id="turn-text">{turn}</span></div>
        <div>Please mark your cell!</div>
      </div>
      <div className="game-board">
        {boardState.map((cellValue, index) => (
          <BoardCell
            id={index}  // This is the prop that you can access in the callback
            key={index} // The key is used internally by React, you can't access it directly
            onClick={() => handleBoardCellClick(index)} // Pass `index` as argument to the callback
            content={cellValue === null ? ' ' : cellValue}
            disabled={checkWinner() !== null} // Disable clicks if there's a winner
          />
        ))}
      </div>
    </div>
  )
}


