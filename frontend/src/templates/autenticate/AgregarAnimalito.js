import React, { useState } from 'react';
import '../../assets/css/styleAgregarA.css';

const NuevoPerroForm = () => {
  const [formData, setFormData] = useState({
    animalito: '',
    nombre: '',
    raza: '',
    edad: '',
    tamaño: '',
    estado_salud: '',
    estado_adopcion: '',
    descripcion: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/nuevoperro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje(data.mensaje);
        setFormData({
            animalito: '',
            nombre: '',
            raza: '',
            edad: '',
            tamaño: '',
            estado_salud: '',
            estado_adopcion: '',
            descripcion: ''
        });
      } else {
        setError(data.error || 'Ocurrió un error');
      }
    } catch (err) {
        setError('Error al conectar con el servidor');
    }
  };

  return (
    <div >
        <h2 >Registrar Nuevo Perro</h2>
        {mensaje && <p >{mensaje}</p>}
        {error && <p >{error}</p>}
        <form className='form-nuevo-perro' onSubmit={handleSubmit} >
            <select name="animalito" value={formData.animalito} onChange={handleChange} required>
                <option value="">Selecciona Animalito</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
            </select>
            <select name="tamaño" id="" value={formData.tamaño} onChange={handleChange} required>
                <option value="">Selecciona Tamaño</option>
                <option value="Pequeño">Pequeño</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
            </select>
            <select name="estado_adopcion" value={formData.estado_adopcion} onChange={handleChange} required>
                <option value="">Selecciona estado de adopción</option>
                <option value="Disponible">Disponible</option>
                <option value="Adoptado">Adoptado</option>
            </select>
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
            <input type="text" name="raza" placeholder="Raza" value={formData.raza} onChange={handleChange} required />
            <input type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} required />

            <input type="text" name="estado_salud" placeholder="Estado de Salud" value={formData.estado_salud} onChange={handleChange} required />

            <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} rows="3" />
            <button type="submit" >Registrar</button>
        </form>
    </div>
  );
};

export default NuevoPerroForm;
