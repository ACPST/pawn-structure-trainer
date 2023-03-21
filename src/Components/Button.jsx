export default function Default({ content, method }) {
  return(
    <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-3 rounded" onClick={method}>{content}</button>
  )  
}