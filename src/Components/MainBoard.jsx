import { Chessboard } from 'react-chessboard'

import Horizontal from './Horizontal'
import Vertical from './Vertical'

export default function MainBoard({ makeMove, game, width, boardOrientation }) {
  return (
    <div>
      <Horizontal orientation={boardOrientation}/>
      <div className='flex'>
        <Vertical width={width} orientation={boardOrientation} />
        <div>
          <Chessboard
            id='MainBoard'
            boardWidth={width}
            onPieceDrop={makeMove}
            position={game.fen()}
            showBoardNotation={false}
            boardOrientation={boardOrientation ? 'white' : 'black'}
          />
        </div>
        <Vertical width={width} orientation={boardOrientation} />
      </div>
      <Horizontal orientation={boardOrientation}/>
    </div>
  )
}
