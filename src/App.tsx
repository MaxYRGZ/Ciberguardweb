import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mail from './components/Mail';
import Password from './components/Password';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mail />} />
        <Route path="/password" element={<Password />} />
      </Routes>
    </Router>
  );
};

export default App;
