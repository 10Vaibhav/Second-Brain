import './App.css'
import { Dashboard } from './pages/dashboard'
import { Signup } from './pages/signup'
import { SignIn } from './pages/Signin'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {

    return <BrowserRouter>
      <Routes>
      <Route path='/' element={<Navigate to='/signup' />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/share/:shareId' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>

}

export default App

