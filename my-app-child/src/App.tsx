import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, useLocation, useNavigate } from 'react-router-dom'
// import logo from './logo.svg';
import Dashboard from './pages/dashboard'
import List from './pages/list'
import Home from './pages/home'
import './App.css';

function App(props: any) {

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      123123
      <Routes>
              <Route path="/app1" element={<Home/>} />
              <Route path='/app1/dashboard' element={<Dashboard/>} />
              <Route path='/app1/list' element={<List/>} />
              <Route path="/" element={<Home/>} />
          </Routes>
        {/* </BrowserRouter> */}
    </div>
  );
}

// 主子应用数据互通自定义hook
const useMount = () => {
  const location = useLocation();
  const [childData, setChildData] = useState({
    count: 1
  }); // 可以是子应用的存储数据入redux，recoil

  useEffect(() => {
    setChildData({
      count: Math.random()
    })
  }, [location.pathname])
  
   return {
    data: childData,
    onParentNavigate(count: number) {
      // 把主应用数据通过回调方法存在子应用
      // console.log('onParentNavigate', count)
      setChildData({
        count
      });
    },
  }
}

export default App;

export { useMount };
