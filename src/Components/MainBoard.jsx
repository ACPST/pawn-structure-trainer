import { Chessboard } from 'react-chessboard'

import Horizontal from './Horizontal'
import Vertical from './Vertical'
import Button from './Button'

export default function MainBoard({ makeMove, game, width, boardOrientation, controls, moveBack, moveForward }) {
  return (
    <div className='mt-12'>
      <Horizontal orientation={boardOrientation} />
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
      <Horizontal orientation={boardOrientation} />
      <div className='mt-4 flex justify-center gap-2'>
        {
          controls &&
          <>
            <Button content={'<'} method={moveBack} />
            <Button content={'>'} method={moveForward} />
          </>
        }
      </div>
    </div>
  )
}
