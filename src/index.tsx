import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { SwitchThemeProvider } from './context/SwitchThemeContext';

ReactDOM.render(
  <React.StrictMode>
    <SwitchThemeProvider>
      <App />
    </ SwitchThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

