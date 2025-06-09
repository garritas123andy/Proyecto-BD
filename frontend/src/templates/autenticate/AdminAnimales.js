import React, { useEffect, useState } from "react";
import "../../assets/css/styleAdminA.css";

function AdminAnimales() {
    const [animales, setAnimales] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/animales")
            .then(res => res.json())
            .then(data => setAnimales(data))
            .catch(err => console.error("Error al cargar animales:", err));
    }, []);

    const eliminarAnimal = (tipo, id) => {
        if (window.confirm("¿Estás seguro de eliminar este animal?")) {
            fetch(`http://localhost:5000/animales/${tipo}/${id}`, {
                method: "DELETE",
            })
            .then(res => {
                if (res.ok) {
                    setAnimales(animales.filter(a => a.id !== id || a.tipo !== tipo));
                } else {
                    alert("Error al eliminar");
                }
            });
        }
    };

    return (
        <div>
            <h3>Administración de Animales</h3>
            <table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th className="none">Nombre</th>
                        <th>Raza</th>
                        <th className="none">Edad</th>
                        <th className="none">Tamaño</th>
                        <th className="none">Estado Salud</th>
                        <th>Estado Adopción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {animales.map(animal => (
                        <tr key={`${animal.tipo}-${animal.id}`}>
                            <td>{animal.tipo}</td>
                            <td className="none">{animal.nombre}</td>
                            <td>{animal.raza}</td>
                            <td className="none">{animal.edad}</td>
                            <td className="none">{animal.tamaño}</td>
                            <td className="none">{animal.estado_salud}</td>
                            <td>{animal.estado_adopcion}</td>
                            <td>
                                <button onClick={() => window.location.href = `/editar/${animal.tipo}/${animal.id}`}>Editar</button>
                                <button className="btn-delete" onClick={() => eliminarAnimal(animal.tipo, animal.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminAnimales;
