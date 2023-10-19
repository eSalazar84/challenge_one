import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LoginForm />} />
        <Route exact path='/register' element={<RegisterForm/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
