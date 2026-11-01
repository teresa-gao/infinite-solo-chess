import Bishop from './components/Bishop.tsx'
import './App.css'

function App() {
  return (
    <>
      <Bishop isWhite={false} />
      <Bishop isWhite={true} />
    </>
  )
}

export default App
