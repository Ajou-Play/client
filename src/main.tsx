import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { worker } from './_msw';
import App from './App';
import { WebRTCProvider } from './Context';

worker.start();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <WebRTCProvider>
        <App />
      </WebRTCProvider>
    </Router>
  </React.StrictMode>,
);
