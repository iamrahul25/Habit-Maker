import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TodoContextProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL || ''}/service-worker.js`);
  });
}

