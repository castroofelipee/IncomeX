import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Login from './components/Auth/index';
import Home from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/dashboard" element={
              <MainLayout>
                <Home />
              </MainLayout>
          } />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
