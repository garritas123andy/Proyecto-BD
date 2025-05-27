import React from "react";
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import PerroForm from './templates/PerroForm';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Centro de Adopcion Garritas</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/perros">Perros</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/perros" element={<PerroForm/>}></Route>
        </Routes>

      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Este es el Home</h1>
    </div>
  )
}

export default App;
