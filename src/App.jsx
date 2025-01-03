import PropTypes from "prop-types"
import { useState } from "react"
import "./App.css";

export default function App() {
  let [playGame, setPlayGame] = useState(false);
  let [winner, setWinner] = useState(null); // Initially null then either Player 1 or Player 2

  return (
    <div className="app">
      <Header />
      <main>
        {!playGame ? (
          // Not Playing Game: [playGame=false]
          (!winner ? (
            // Not Playing Game: [playGame=false, winner=null]
            <>
              <div className="rules">
                <p>Tic-Tac-Toe is a two-player game played on a 3x3 grid. One player uses &quot;X&quot; and the other uses &quot;O&quot;. Players take turns placing their symbol in an empty BoardCell on the grid, with the goal of being the first to get three of their symbols in a row, either horizontally, vertically, or diagonally. The game ends when a player wins by completing a row, or when all BoardCells are filled, resulting in a draw if no player wins.</p>
              </div>
              <div className="special-note" style={{ color: "red", marginBottom: "0.1rem" }}>
                Game AI is still in development process. In the meantime, you can play with your freind. Enjoy!!
              </div>
              <div>
                <Button id="play-game-btn" content={'Play Game'} onClick={() => setPlayGame(!playGame)} />
              </div>
            </>
          ) : (
            // Not Playing Game: (playGame=false, winner=['O' or 'X' or 'Draw'])
            <div className="results">
              {winner !== 'Draw' ? (
                // Game is Deciding: [winner='O' or 'X']
                <div>Player <span>{winner} wins!</span></div>
              ) : (
                // Game is Drawn: [winner='Draw']
                <div>Nobody Won! Game {winner} !</div>
              )}
              <Button id="play-again-btn" content={'Play Again'} onClick={() => {
                setWinner(null);
              }} />
            </div>
          ))
        ) : (
          // Playing Game: [playGame=true, winner=null]
          <Game setPlayGame={setPlayGame} setWinner={setWinner} />
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
      <span id="dev-by">Developed by: <a href="https://github.com/vickvey">Vivek Kumar</a></span>
      <span id="copyright">Copyright 2024</span>
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

Game.propTypes = {
  setPlayGame: PropTypes.func.isRequired,
  setWinner: PropTypes.func.isRequired
}

function Game({ setPlayGame, setWinner }) {
  const PLAYER_ENUM = {
    PLAYER_1: 'O',
    PLAYER_2: 'X'
  };

  const [turn, setTurn] = useState('O');
  const [boardState, setBoardState] = useState(Array(9).fill(null));
  const [cellsFilled, setCellsFilled] = useState(0);

  // Helper functions
  function checkWinnerForBoard(board) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // vertical
      [0, 4, 8], [2, 4, 6]              // diagonal
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  // Event handlers
  function handleBoardCellClick(index) {
    // Prevent any interaction after game is over
    if (boardState[index] !== null || checkWinnerForBoard(boardState)) return;
    const newBoardState = boardState.map((prevVal, idx) =>
      idx === index ? turn : prevVal
    );

    // Updating the board position
    setBoardState(newBoardState);
    setCellsFilled(cellsFilled + 1);

    const winner = checkWinnerForBoard(newBoardState);
    if (cellsFilled === 8) {
      // Check if winner is getting decided on next move or not
      if (!checkWinnerForBoard(newBoardState)) {
        setWinner('Draw');
        setPlayGame(false);
        return;
      }
    }

    if (winner) {
      setWinner(winner);
      setPlayGame(false);
      return;
    }
    setTurn(turn => turn === PLAYER_ENUM.PLAYER_1 ? PLAYER_ENUM.PLAYER_2 : PLAYER_ENUM.PLAYER_1);
  }

  const currentWinner = checkWinnerForBoard(boardState);

  console.clear();
  console.log("currentWinner: ", currentWinner);
  console.log("cellsFilled", cellsFilled);
  return (
    <div className="game-play">
      <div className="turn-info">
        <div>You are playing with symbol <span id="turn-text">{turn}</span></div>
        <div>Please mark your cell!</div>
      </div>
      <div className="game-board">
        {boardState.map((cellValue, index) => (
          <BoardCell
            id={index}
            key={index}
            onClick={() => handleBoardCellClick(index)}
            content={cellValue === null ? ' ' : cellValue}
            disabled={currentWinner !== null}
          />
        ))}
      </div>
    </div>
  );
}


