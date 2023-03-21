import { useEffect, useRef } from 'react';

export default function Controller({ moves }) {
  const movesEndRef = useRef(null)
  const scrollToBottom = () => {
    movesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [moves]);


  return (
    <div className="mt-6 bg-chess-darker border-red-500 border-4 h-full w-full text-white font-bold p-5 rounded">
      <p className="overflow-auto bg-chess-dark rounded flex flex-col h-full" style={{ width: 250, height: 400 }}>
        {moves.map((move, index) => <span className="text-center" key={index}>{move}</span>)}
        <span ref={movesEndRef}></span>
      </p>
    </div>
  )
}
