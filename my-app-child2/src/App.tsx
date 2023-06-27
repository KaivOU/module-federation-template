import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom'
// import logo from './logo.svg';
import Dashboard from './pages/dashboard'
import List from './pages/list'
import './App.css';

function App() {
  return (
    <div className="App">
      欢迎来到App2222~子应用
      <div className="nav">
          <NavLink className="list-group-item" to="/app2/dashboard">to dashboard222</NavLink>
          <NavLink className="list-group-item" to="/app2/list">to list2222</NavLink>
      </div>
      
      <Routes>
          {/* <Route path='/' element={<Dashboard/>} /> */}
          <Route path='/app2/dashboard' element={<Dashboard/>} />
          <Route path='/app2/list' element={<List/>} />
      </Routes>
    </div>
  );
}

export default App;
