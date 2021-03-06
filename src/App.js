import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Preview from './pages/preview';

function App() {
  
  return (
    <div className="App font-font-poppins">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview/:slug" element={<Preview />} />
      </Routes>
  </div>
  )
}

export default App
