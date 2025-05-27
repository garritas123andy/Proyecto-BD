import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import PerroForm from './templates/PerroForm';
import "./assets/css/style_navbar.css";
import "./assets/css/styleHome.css";
import garritas1 from './assets/img/garritas.jpg';
import garritas2 from './assets/img/garritas2.jpg';
import Login from './templates/login';

function App() {

  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <div className="App">
        <nav className="nav_bar">
          <div>
            <Link to="/">Garritas</Link>
          </div>
          <div>
            <Link to="/">Inicio</Link>
            <Link to="/perros">Perros</Link>
            <Link to="">Gatos</Link>
            
          </div>
          <div className="user">
            <Link to="/login">Login</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/perros" element={<PerroForm/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
        </Routes>

      </div>
    </Router>
  );
}

function Home() {
  return (
    
    <div>
      <div className="Titulo">
        <h1>Centro de Adopcion Garritas</h1>
      </div>
      <div className="imagenes">
        <div class="imagen">
          <img className="pic" src={garritas1} alt=""/>
        </div>
        <div class="imagen">
          <img className="pic" src={garritas2} alt=""/>
        </div>
      </div>
      <div className="about">
        <p>
          <h4>¡Miau! Hola, soy Garritas y te doy la bienvenida a mi centro de adopción</h4>
Este lugar es más que un refugio… ¡es un hogar lleno de amor, ronroneos y segundas oportunidades! En el Centro de Adopción "Garritas", cuidamos a gatitos y perritos que han pasado por momentos difíciles, pero que ahora están listos para encontrar un nuevo hogar lleno de cariño.
<br/><br/>
Tenemos compañeros peludos de todas las edades y personalidades: curiosos, dormilones, juguetones y súper amorosos… ¡uno de ellos podría ser tu mejor amigo para toda la vida!
        </p>
      </div>
    </div>
  )
}

export default App;
