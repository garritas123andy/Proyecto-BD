import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Gatos() {
    const [gatos, setGatos] = useState([]);
    const [filtro, setFiltro] = useState("todos");
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch("http://localhost:5000/api/gatos")
        .then((res) => {
            if (!res.ok) throw new Error("Error al cargar datos");
            return res.json();
        })
        .then((data) => setGatos(data))
        .catch((err) => {
            console.error("Error al cargar gatos:", err);
            setGatos([]);
        });
    }, []);
    
    const filtrarGatos = () => {
        if (filtro === "todos") return gatos;
        return gatos.filter(
        (gato) => gato.tamaño.toLowerCase() === filtro.toLowerCase()
        );
    };
    
    return (
        <div style={{ padding: "20px" }}>
        <h3>CATÁLOGO DE GATOS EN ADOPCIÓN</h3>
    
        <div style={{ margin: "10px 0" }}>
            <button onClick={() => setFiltro("todos")}>Todos</button>
            <button onClick={() => setFiltro("pequeño")}>Pequeño</button>
            <button onClick={() => setFiltro("mediano")}>Mediano</button>
            <button onClick={() => setFiltro("grande")}>Grande</button>
        </div>
    
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {filtrarGatos().length === 0 ? (
            <p>No hay gatos disponibles para este filtro.</p>
            ) : (
            filtrarGatos().map((gato) => (
                <div
                key={gato.id_gato}
                >
                <img src={gato.imagen} alt={gato.nombre} />
                <h4>{gato.nombre}</h4>
                <p>
                    <strong>Salud:</strong> {gato.estado_salud}
                </p>
                <p>
                    <strong>Tamaño:</strong> {gato.tamaño}
                </p>
    
                <button
                    style={{ marginTop: "10px" }}
                    onClick={() => navigate(`/adoptar/${gato.id_gato}`)}
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
    

export default Gatos;