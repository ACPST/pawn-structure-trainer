export default function Vertical({ height, orientation }) {
  const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

  const flexType = orientation ? 'flex-col' : 'flex-col-reverse'
  const className = `flex ${flexType} text-white`

  return (
    <span className={className} style={{ height: height, width: 25 }}>
      {numbers.map(number => <p className="flex-1 flex text-center justify-center items-center border border-chess-green border-opacity-20" key={number}>{number}</p>)}
    </span>
  );
}
