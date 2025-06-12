import React, { useEffect, useState } from 'react';
import Garriload from "../../assets/img/garritas2.jpg";

function BuzonDePeticiones() {
  const [peticiones, setPeticiones] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
    setIsLoading(true);
    fetchPeticiones();
  }, []);

  const fetchPeticiones = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/peticiones');
      const data = await res.json();
      setPeticiones(data);
    } catch (err) {
      console.error('Error al cargar peticiones', err);
    } finally {
      
    setIsLoading(false);
    }
  };

  const actualizarEstado = async (idPeticion, idMascota, accion) => {
    
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/peticion/${idPeticion}/${accion}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_mascota: idMascota }) // por si el backend lo necesita
      });

      const data = await res.json();
      if (res.ok) {
        setPeticiones(prev => prev.filter(p => p.id !== idPeticion));
        setMensaje(data.mensaje || 'Estado actualizado');
      } else {
        setMensaje(data.error || 'Ocurrió un error');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error en la operación');
    }
    finally {
      
    setIsLoading(false);
    }
  };

  return (<div>
  <h2 >Buzón de Adopciones</h2>
  {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}

  {peticiones.length === 0 && !isLoading ? (
    <p>No hay peticiones pendientes.</p>
  ) : (
    <div >
      <table>
        <thead >
          <tr>
            <th>Solicitante</th>
            <th className='none'>Email</th>
            <th>Teléfono</th>
            <th className='none'>Dirección</th>
            <th className='none'>ID Mascota</th>
            <th className='none'>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {peticiones.map((p) => (
            <tr key={p.id} >
              <td>{p.nombre_solicitante}</td>
              <td className='none'>{p.email}</td>
              <td>{p.telefono}</td>
              <td className='none'>{p.direccion}</td>
              <td className='none'>{p.id_mascota}</td>
              <td className='none'>{p.fecha_peticion}</td>
              <td >
                <button
                  onClick={() => actualizarEstado(p.id, p.id_mascota, 'aceptar')}
                  >
                  Aceptar
                </button>
                <button
                  onClick={() => actualizarEstado(p.id, p.id_mascota, 'declinar')}
                  className="btn-delete"
                >
                  Declinar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

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

export default BuzonDePeticiones;