import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarAnimal() {
    const { tipo, id } = useParams();
    const navigate = useNavigate();
    const [animal, setAnimal] = useState({
        nombre: "",
        raza: "",
        edad: "",
        tamaño: "",
        estado_salud: "",
        estado_adopcion: ""
    });

    useEffect(() => {
        fetch(`http://localhost:5000/animales`)
            .then(res => res.json())
            .then(data => {
                const encontrado = data.find(a => a.tipo === tipo && a.id.toString() === id);
                if (encontrado) setAnimal(encontrado);
                else alert("Animal no encontrado");
            });
    }, [tipo, id]);

    const handleChange = e => {
        setAnimal({ ...animal, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        fetch(`http://localhost:5000/animales/${tipo}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(animal)
        })
        .then(res => {
            if (res.ok) {
                alert("Actualizado correctamente");
                navigate("/");
            } else {
                alert("Error al actualizar");
            }
        });
    };

    return (
        <div>
            <h3>Editar {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h3>
            <form className="form-nuevo-perro" onSubmit={handleSubmit}>
                <input name="nombre" value={animal.nombre} onChange={handleChange} placeholder="Nombre" required /><br/>
                <input name="raza" value={animal.raza} onChange={handleChange} placeholder="Raza" /><br/>
                <input name="edad" type="number" value={animal.edad} onChange={handleChange} placeholder="Edad" /><br/>
                <input name="tamaño" value={animal.tamaño} onChange={handleChange} placeholder="Tamaño" required /><br/>
                <input name="estado_salud" value={animal.estado_salud} onChange={handleChange} placeholder="Estado de Salud" /><br/>
                <select name="estado_adopcion" value={animal.estado_adopcion} onChange={handleChange}>
                    <option value="Disponible">Disponible</option>
                    <option value="Adoptado">Adoptado</option>
                </select><br/><br/>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
}

export default EditarAnimal;
