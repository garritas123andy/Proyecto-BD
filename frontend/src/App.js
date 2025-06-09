import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate} from 'react-router-dom';
import PerroForm from './templates/FormAdopcion';
import email from './assets/img/correo.png';
import "./assets/css/style_navbar.css";
import "./assets/css/styleHome.css";
import Login from './templates/login';
import Home from './templates/Home';
import  Perros from './templates/Perros';
import Gatos from './templates/Gatos';
import Buzon from './templates/autenticate/BuzonDePeticiones';
import AdminA from './templates/autenticate/AdminAnimales';
import AgregaA from './templates/autenticate/AgregarAnimalito';
import EditarAnimal from './templates/autenticate/EditarAnimal';
import FormAdopcion from './templates/FormAdopcion';

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  }

  const navegar = () => {
    navigate('/Buzon')
  }
  
  return (
            <nav className="nav_bar">
          <div>
            <Link to="/">Garritas</Link>
          </div>
          <div>
            <Link to="/">Inicio</Link>
            <Link to="/Perros">Perros</Link>
            <Link to="/Gatos">Gatos</Link>
            
          </div>
          <div className="user">

            { user ? (
              
              <div className="box">
                <Link to="/Agregar-Animalito">Nuevo</Link>
                <Link to="/Administrar-Animalitos">Administrar</Link>
                <img className="icono_email" onClick={navegar} src={email}/>              
                <div className="user_box">
                <h3>{ user }</h3>
                <h3 className="logout_btn" onClick={logout}>Cerrar Sesión</h3>
              
              </div>
              </div>

            ): (

              <div className="user_box">
                <Link to="/login">Login</Link>
              </div>
            )}

            
          </div>
        </nav>
  )
}

function App() {

  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Perros" element={<Perros/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Gatos" element={<Gatos/>}></Route>
          <Route path="/Buzon" element={<Buzon/>}></Route>
          <Route path="/Administrar-Animalitos" element={<AdminA/>}></Route>
          <Route path="/Agregar-Animalito" element={<AgregaA/>}></Route>
          <Route path="/editar/:tipo/:id" element={<EditarAnimal />} />
          <Route path="/adoptar/:id/:animal" element={<FormAdopcion />} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
