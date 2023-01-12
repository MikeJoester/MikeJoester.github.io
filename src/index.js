import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { ContextProvider } from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter basename='/#'>
        <App />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);