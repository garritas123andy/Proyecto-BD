import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/styleadopcion.css";
import Garriload from "../assets/img/garritas2.jpg";

function FormAdopcion() {
  const { id, animal } = useParams();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const enviarSolicitud = (e) => {
    
    setIsLoading(true);
    e.preventDefault();
    fetch("http://localhost:5000/api/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        telefono,
        direccion,
        email,
        id: parseInt(id),
        animal,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al enviar solicitud");
        alert("Solicitud enviada correctamente");
      })
      .catch((err) => alert("Error:", err))
      .finally( load => 
    setIsLoading(false));
  };

  return (
    <div className="target">
      <h3>Formulario de Solicitud de Adopción</h3>
      <form onSubmit={enviarSolicitud} className="target-form">
        <p>Solicitas adoptar al {animal} con ID: {id}</p>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Tu teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="ejemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
        type="text"
        placeholder="Calle ejemplo 16"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
        />
        <button type="submit">Enviar Solicitud</button>
      </form>
              {isLoading && (
                                          <div class="screenLoad">
                                              <div className="center">
                                                  <img className="rueda" src={Garriload} alt="carga" />
                                                  <h4>Cargando...</h4>
                                              </div>
                                          </div>
                                        )}
    </div>
  );
}

export default FormAdopcion;
