import { useState } from "react";
import { Chess } from "chess.js";

import MainBoard from "./MainBoard";
import PawnBoard from "./PawnBoard";
import Controller from "./Controller";

const WIDTH = 400

export default function SharedBoard() {
  const [pawnFen, setPawnFen] = useState('8/pppppppp/8/8/8/8/PPPPPPPP/8 w - - 1 1')
  const [game, setGame] = useState(new Chess())
  const [movesDisplay, setMovesDisplay] = useState([])
  const [boardOrientation, setBoardOrientation] = useState(true) // true => white, false => black

  // PGN related states
  const [counter, setCounter] = useState(0)
  const [pgnMoves, setPgnMoves] = useState([])
  const [controls, setControls] = useState(false)

  // Core Methods
  const fetchPawnPositions = board => {
    const pawns = {}

    board.forEach(row => {
      row.forEach(square => {
        if (square) {
          if (square.type === 'p') {
            pawns[square.square] = `${square.color}${square.type.toUpperCase()}`
          }
        }
      })
    })
    return pawns
  }

  const updateBoard = (move = false, undo = false, pgn = false, reset = false) => {
    const gameCopy = new Chess()
    if (!reset) { gameCopy.loadPgn(game.pgn()) }
    if (move) { gameCopy.move(move) }
    if (undo) { gameCopy.undo() }
    if (pgn) {
      if (pgn === 'forward' && counter < pgnMoves.length) {
        const increaseCounter = counter + 1
        setCounter(increaseCounter)
        updateBoard(pgnMoves[counter], false, false)
        return
      }
      else if (pgn === 'back' && counter > 0) {
        const decreaseCounter = counter - 1
        setCounter(decreaseCounter)
        updateBoard(false, true, false)
        return
      }
    }

    const pawnPositions = fetchPawnPositions(gameCopy.board())

    setGame(gameCopy)
    setPawnFen(pawnPositions)

    const moves = gameCopy.pgn()
    const splittedMoves = moves.split(/\d+\./).slice(1);
    const withIndex = splittedMoves.map((move, index) => `${index + 1}.${move}`)
    setMovesDisplay(withIndex)
  }

  // Board State Methods
  const makeMove = (sourceSquare, targetSquare) => {
    const move = { from: sourceSquare, to: targetSquare }
    try {
      updateBoard(move);
    } catch (err) {
      console.log(err)
      console.log('Invalid Move')
    }
  }

  const popHistory = () => {
    updateBoard(false, true);
  }


  // PGN file controls
  const handlePgn = (e) => {
    const fileReader = new FileReader();
    const pgn = e.target.files[0];

    fileReader.readAsText(pgn, 'UTF-8')
    fileReader.onload = function (evt) {
      setControls(true)

      const pgnGame = new Chess()
      pgnGame.loadPgn(evt.target.result)

      setControls(true)
      setPgnMoves(pgnGame.history())
      updateBoard(false, false, false, true)
    }
  }

  const moveForward = () => {
    updateBoard(false, false, 'forward')
  }
  const moveBack = () => {
    updateBoard(false, false, 'back')
  }

  /* Button Functions */

  // Reset Everything
  const resetHandler = () => {
    setPawnFen('8/pppppppp/8/8/8/8/PPPPPPPP/8 w - - 1 1')
    setGame(new Chess())
    setMovesDisplay([])
    setCounter(0)
    setPgnMoves([])
    setControls(false)
  }

  // Switch Board Orientation
  const switchBoardOrientation = () => {
    const newNotation = !boardOrientation;
    setBoardOrientation(newNotation);
  }

  return (
    <div className="py-20 flex flex-col sm:flex-row justify-around items-center">
      <div className="flex justify-center gap-5">
        <MainBoard game={game} makeMove={makeMove} width={WIDTH} boardOrientation={boardOrientation} />
        <div className="flex-grow-0 flex-auto"><Controller popHistory={popHistory} handlePgn={handlePgn} controls={controls} moves={movesDisplay} moveBack={moveBack} moveForward={moveForward} resetHandler={resetHandler} switchBoardOrientation={switchBoardOrientation}/></div>
        <PawnBoard fen={pawnFen} width={WIDTH} boardOrientation={boardOrientation} />
      </div>
    </div>
  );
}
