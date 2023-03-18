import { useEffect, useRef } from 'react';

export default function Controller({ popHistory, handlePgn, controls, moves, moveBack, moveForward, resetHandler, switchBoardOrientation }) {
  const completeReset = () => {
    resetHandler();
    document.getElementById('file-upload').value = '';
  }

  const movesEndRef = useRef(null)
  const scrollToBottom = () => {
    movesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [moves]);


  return (
    <div className="bg-chess-darker h-full w-full text-white font-bold p-5 rounded">
      <p className="overflow-auto h-40 bg-chess-dark m-3 p-3 rounded flex flex-col" style={{ width: 250 }}>
        {moves.map((move, index) => <span className="text-center" key={index}>{move}</span>)}
        <span ref={movesEndRef}></span>
      </p>
      <div className="flex flex-col items-center justify-center mt-5">
        <div className="flex flex-row justify-center items-center gap-6 my-2">
          <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-3 rounded" onClick={popHistory}>Undo Move</button>
          <label htmlFor="file-upload" className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-3 rounded">
            Upload PGN
          </label>
          <input className="hidden" id="file-upload" type="file" onChange={handlePgn} />
        </div>
        <div className="flex flex-row justify-center gap-7 my-3">
          {
            controls &&
            <>
              <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-3 rounded" onClick={moveBack}>{'<'}</button>
              <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-3 rounded" onClick={moveForward}>{'>'}</button>
            </>
          }
        </div>
        <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-3 rounded" onClick={completeReset}>Reset</button>
        <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-3 rounded my-3" onClick={switchBoardOrientation}>Switch</button>
      </div>
    </div>
  )
}
