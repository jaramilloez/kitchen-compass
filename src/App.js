import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home'
import NavBar from './components/navBar';
import './index.css'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={ <NavBar /> }>
        <Route index element={ <Home /> } />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App;
