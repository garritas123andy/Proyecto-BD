import React, { useState } from "react";
import "../assets/css/styleLogin.css";
import { useNavigate } from "react-router-dom";
import Garriload from "../assets/img/garritas2.jpg";

function Login() {

    const navigate = useNavigate();

    
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');
      const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        
        setIsLoading(true);
        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if(!data.error){
                alert("Inicio de sesion exitoso");
                console.log(data['user']);
                localStorage.setItem('user', data['user']);
                navigate('/');
            } else {
                alert(data.error)
            }
        })
        .finally( laod => setIsLoading(false));


    }

    return (
        <div>
            <h2 className="title">Iniciar Sesion</h2>
            <div className="cuadroLogin">
                <label for="user">Usuario</label>
                <input id="user" placeholder="Usuario" onChange={e => setUsername(e.target.value)}/>
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Contraseña" onChange={e=> setpassword(e.target.value)} />
                <button onClick={handleLogin}>Iniciar Sesion</button>
            </div>
            {isLoading && (
                            <div class="screenLoad">
                                <div className="center">
                                    <img className="rueda" src={Garriload} alt="carga" />
                                    <h4>Cargando...</h4>
                                </div>
                            </div>
                          )}
        </div>
    )
}

export default Login;