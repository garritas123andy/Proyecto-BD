import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/styleadopcion.css";

function FormAdopcion() {
  const { id, animal } = useParams();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");

  const enviarSolicitud = (e) => {
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
      .catch((err) => alert("Error:", err));
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
    </div>
  );
}

export default FormAdopcion;
