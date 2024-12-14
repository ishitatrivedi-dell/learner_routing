import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Import the App component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Render App, where Router wraps everything */}
  </StrictMode>
);
