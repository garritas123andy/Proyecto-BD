import React, { useState } from "react";
import { useParams } from "react-router-dom";

function FormAdopcion() {
  const { id_perro } = useParams();
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
        id_perro: parseInt(id_perro),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al enviar solicitud");
        alert("Solicitud enviada correctamente");
      })
      .catch((err) => alert("Error:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Formulario de Solicitud de Adopción</h3>
      <form onSubmit={enviarSolicitud}>
        <p>Solicitas adoptar al perro con ID: {id_perro}</p>
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
