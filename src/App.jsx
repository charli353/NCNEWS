import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Article from './components/Article'


function App() {
return (
  <div id='gridContainer'>
    <Navbar />
  <Routes>
    <Route path='/' element={<Home /> } />
    <Route path='/articles/:article_id' element={<Article /> }/>
  </Routes>
  </div>
  
  )
}
export default App
