// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PontoRegistro from './components/PontoRegistro';
import AdminDashboard from './components/AdminDashboard';
import Register from './components/Register'; // Importar o componente de registro
import PrivateRoute from './components/PrivateRoute';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/funcionario-ponto" element={<PontoRegistro />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Nova rota de registro */}
          <Route
            path="/ponto"
            element={
              <PrivateRoute>
                <PontoRegistro />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

