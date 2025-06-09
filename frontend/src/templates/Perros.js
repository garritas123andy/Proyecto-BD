import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/styleAnimal.css';
import sn from '../assets/img/sn-image.jpg';

function Perros() {
  const [perros, setPerros] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/perros")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar datos");
        return res.json();
      })
      .then((data) => setPerros(data))
      .catch((err) => {
        console.error("Error al cargar perros:", err);
        setPerros([]);
      });
  }, []);

  const filtrarPerros = () => {
    if (filtro === "todos") return perros;
    return perros.filter(
      (perro) => perro.tamaño.toLowerCase() === filtro.toLowerCase()
    );
  };

  return (
    <div>
      <h3>CATÁLOGO DE PERROS EN ADOPCIÓN</h3>

      <div className="filtros">
        <button onClick={() => setFiltro("todos")}>Todos</button>
        <button onClick={() => setFiltro("pequeño")}>Pequeño</button>
        <button onClick={() => setFiltro("mediano")}>Mediano</button>
        <button onClick={() => setFiltro("grande")}>Grande</button>
      </div>

      <div className="box-dad">
        {filtrarPerros().length === 0 ? (
          <p>No hay perros disponibles para este filtro.</p>
        ) : (
          filtrarPerros().map((perro) => (
            <div
              key={perro.id_perro}
              className="box-animal"
            >
              <img className="sn-image" src={sn} alt={perro.nombre} />
              <h4>{perro.nombre}</h4>
              <p>
                <strong>Salud:</strong> {perro.estado_salud}
              </p>
              <p>
                <strong>Tamaño:</strong> {perro.tamaño}
              </p>

              <button
                onClick={() => navigate(`/adoptar/${perro.id_perro}/${"perro"}`)}
              >
                Adoptar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Perros;
