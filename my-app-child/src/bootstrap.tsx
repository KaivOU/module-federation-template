import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from "react-router-dom"
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('app-child') as HTMLElement
);
const rootDom = root.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
);
export default rootDom;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
