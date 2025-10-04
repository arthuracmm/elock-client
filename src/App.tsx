import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/home'
import LoginPage from './pages/login/login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
