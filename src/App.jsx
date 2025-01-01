import PropTypes from "prop-types"
import { useState } from "react"

export default function App() {
  const [playGame, setPlayGame] = useState(false);
  const [winner, setwinner] = useState(null); // Initially null then either Player 1 or Player 2

  return (
    <div>
      <Header />
      {!playGame ? (
        // Not Playing Game (playGame=false, winner=null)
        <div>
          <Button id="play-game-btn" content={'Play Game'} onClick={() => setPlayGame(!playGame)} />
        </div>
      ) : (
        (!winner ? (
          // Playing Game (playGame=true, winner=null)
          <GameBoard winner={winner} setwinner={setwinner} />
        ) : (
          // Not Playing Game (playGame=True, winner=[Won or Lost])
          <div>
            <div>You <span>{winner}!</span></div>
            <Button id="play-again-btn" content={'Play Again'} onClick={() => {
              setwinner(!winner);
            }} />
          </div>
        ))
      )}
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

/// TOOD: Complete this later
function GameBoard({ winner, setwinner }) {
  // Board index
  // | 0 1 2 |
  // | 3 4 5 |
  // | 6 7 8 |

  // Player 1 - false
  // Player 2 - true

  const [player, setPlayer] = useState(false);
  const [boardState, setBoardState] = useState(Array(9).fill(null)); // Board State Array 0-8

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 6], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
  ];

  return (
    <div className="game-board">
      {boardState.map((boardCell, index) => (
        <Cell id={index} key={index} onClick={handleCellClick} />
      ))}
    </div>
  )

  function handleCellClick() {

  }
}

/// TODO: Complete this later
function Cell({ id, content, onClick }) {
  return (
    <button className="cell" id={id} onClick={onClick}>content</button>
  )
}

Cell.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

GameBoard.propTypes = {
  winner: PropTypes.bool.isRequired,
  setwinner: PropTypes.func.isRequired
}

