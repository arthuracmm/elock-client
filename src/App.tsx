import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
