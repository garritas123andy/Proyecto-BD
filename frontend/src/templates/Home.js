import { React } from 'react-router-dom';


import garritas1 from '../assets/img/garritas.jpg';
import garritas2 from '../assets/img/garritas2.jpg';

function Home() {
  return (
    
    <div className='pag'>
      <div className="Titulo">
        <h1>Centro de Adopcion Garritas</h1>
      </div>
      <div className="imagenes">
        <div class="imagen">
          <img className="pic none" src={garritas1} alt=""/>
        </div>
        <div class="imagen">
          <img className="pic" src={garritas2} alt=""/>
        </div>
      </div>
      <div className="about">
        <p>
          <h4>¡Miau! Hola, soy Garritas y te doy la bienvenida a mi centro de adopción</h4>
Este lugar es más que un refugio… ¡es un hogar lleno de amor, ronroneos y segundas oportunidades! En el Centro de Adopción "Garritas", cuidamos a gatitos y perritos que han pasado por momentos difíciles, pero que ahora están listos para encontrar un nuevo hogar lleno de cariño.
<br/><br/>
Tenemos compañeros peludos de todas las edades y personalidades: curiosos, dormilones, juguetones y súper amorosos… ¡uno de ellos podría ser tu mejor amigo para toda la vida!
        </p>
      </div>
    </div>
  )
}

export default Home;