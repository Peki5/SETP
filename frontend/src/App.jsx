// App.jsx
import React from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import PutovanjaList from './pages/PutovanjaList';
import PutovanjeTroskovi from './pages/PutovanjeTroskovi';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /putovanja */}
        <Route path="/" element={<Navigate replace to="/putovanja" />} />

        <Route path="/putovanja" element={<PutovanjaList />} />
        <Route path="/putovanja/:id/troskovi" element={<PutovanjeTroskovi />} />
      </Routes>
    </Router>
  );
}

export default App;
