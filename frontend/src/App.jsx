// Remove imports for Login, Register
// Remove <Route path="/login" ... />, <Route path="/register" ... />
// Ensure <Route path="/chat" ... /> is accessible to all

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;