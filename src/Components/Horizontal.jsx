export default function Horizontal({ orientation }) {
  const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const flexType = orientation ? 'flex-row' : 'flex-row-reverse'
  const className = `flex ${flexType} px-6 text-white`;

  return (
    <div className={className}>
      {alphabets.map(alphabet => <p className="flex-1 text-center border-chess-green border border-opacity-20" key={alphabet}>{alphabet}</p>)}
    </div>
  );
}
