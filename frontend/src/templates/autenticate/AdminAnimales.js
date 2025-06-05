import React, { useEffect, useState } from "react";

function AdminAnimales() {
    const [animales, setAnimales] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/animales") // Ajusta el URL a tu backend
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
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Nombre</th>
                        <th>Raza</th>
                        <th>Edad</th>
                        <th>Tamaño</th>
                        <th>Estado Salud</th>
                        <th>Estado Adopción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {animales.map(animal => (
                        <tr key={`${animal.tipo}-${animal.id}`}>
                            <td>{animal.tipo}</td>
                            <td>{animal.nombre}</td>
                            <td>{animal.raza}</td>
                            <td>{animal.edad}</td>
                            <td>{animal.tamaño}</td>
                            <td>{animal.estado_salud}</td>
                            <td>{animal.estado_adopcion}</td>
                            <td>
                                <button onClick={() => window.location.href = `/editar/${animal.tipo}/${animal.id}`}>Editar</button>
                                <button onClick={() => eliminarAnimal(animal.tipo, animal.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminAnimales;
