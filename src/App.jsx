import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Article from './components/Article'
import Topic from './components/Topic'
import Login from './components/Login'


function App() {
return (
  <div id='gridContainer'>
    <Navbar />
  <Routes>
    <Route path='/' element={<Home /> } />
    <Route path='/articles/:article_id' element={<Article /> }/>
    <Route path='/topics/:slug' element={<Topic /> }/>
    <Route path='/login/users/:username' element={<Login /> }/>
  </Routes>
  </div>
  
  )
}
export default App
