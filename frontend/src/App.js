import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate} from 'react-router-dom';
import PerroForm from './templates/FormAdopcion';
import email from './assets/img/correo.png';
import { Menu, X } from 'lucide-react';
import "./assets/css/style_navbar.css";
import "./assets/css/styleHome.css";
import "./assets/css/style.css";
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
  const [isOpen, setIsOpen] = useState(false);
  const user = localStorage.getItem('user');

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');

  }

  const navegar = () => {
    navigate('/Buzon');
  }

  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
          <div className="navbarEscri">
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
            <h5 className="mmm">Garritas</h5>
            <button onClick={toggleMenu} className="menu" aria-label="Toggle menu">
          {isOpen ? <X size={35} /> : <Menu size={35} />}
          </button>
          {isOpen && (
            <div className="navbarMovil">
              <button onClick={toggleMenu} className="menu" aria-label="Toggle menu">
          {isOpen ? <X size={35} /> : <Menu size={35} />}
          </button>
          <div className="options">
            <Link onClick={toggleMenu} to="/">Inicio</Link>
            <Link onClick={toggleMenu} to="/Perros">Perros</Link>
            <Link onClick={toggleMenu} to="/Gatos">Gatos</Link>
            
          </div>
          <div className="user">

            { user ? (
              
              <div className="box">
                <Link onClick={toggleMenu} to="/Agregar-Animalito">Nuevo</Link>
                <Link onClick={toggleMenu} to="/Administrar-Animalitos">Administrar</Link>
                <img className="icono_email" onClick={navegar} src={email}/>              
                <div className="user_box">
                <h3>{ user }</h3>
                <h3 className="logout_btn" onClick={logout}>Cerrar Sesión</h3>
              
              </div>
              </div>

            ): (

              <div className="user_box">
                <Link onClick={toggleMenu} to="/login">Login</Link>
              </div>
            )}

            
          </div>
            </div>
          )}
            
          </div>
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
