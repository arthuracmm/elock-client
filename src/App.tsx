import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/home'
import DoorLocksPage from './pages/door-locks/doorLocks'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/door-locks' element={<DoorLocksPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
