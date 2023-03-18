import { Chessboard } from 'react-chessboard'

import Horizontal from './Horizontal'
import Vertical from './Vertical'

export default function PawnBoard({ fen, width, boardOrientation }) {
  return (
    <div>
      <Horizontal orientation={boardOrientation}/>
      <div className='flex'>
        <Vertical width={width} orientation={boardOrientation} />
        <div>
          <Chessboard
            id='Pawnboard'
            boardWidth={width}
            position={fen}
            arePiecesDraggable={false}
            showBoardNotation={false}
            boardOrientation={boardOrientation ? 'white' : 'black'}
          />
        </div>
        <Vertical width={width} orientation={boardOrientation}/>
      </div>
      <Horizontal orientation={boardOrientation}/>
    </div>
  )
}
