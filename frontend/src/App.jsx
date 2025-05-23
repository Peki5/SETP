// App.jsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PutovanjaList from './pages/PutovanjaList';
import PutovanjeTroskovi from './pages/PutovanjeTroskovi';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/putovanja" element={<PutovanjaList />} />
        <Route path="/putovanja/:id/troskovi" element={<PutovanjeTroskovi />} />
      </Routes>
    </Router>
  );
}

export default App;
