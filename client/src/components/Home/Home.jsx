import React from "react";
//importo los hook que voy a usar de react
import { useState, useEffect } from "react";
//importo los hooks de react-redux (previamente se instala npm i react-redux)
import { useDispatch, useSelector } from "react-redux";
// // //importo las actions que me interesa usar en este componente
import { getAllDogs } from "../../actions/actions";
//importo los componentes que voy a usar
import CardDogs from "../CardDogs/CardDogs";
// Paginacion 
import { pagination } from "./pagination.js";
import NextSvg from "../SVG/NextSvg";
import PrevSvg from "../SVG/PrevSvg";
// Estilos del componente
import styles from "./home.module.css";

function Home() {
  const [count, setCount] = useState(0); //creo un state para el contador

  const increase = () => { // funcion que me va a permitir aumentar el contador
    setCount(count + 1);
  };

  const decrease = () => { //funcion que me va a permitir disminuir el contador
    setCount(count - 1); 
  };

  const dispatch = useDispatch();
  let { allDogs, dogsFilter } = useSelector((state) => state); // obtengo el estado actual del store

  useEffect(() => {
    dispatch(getAllDogs()); // llamo a la action que me interesa
  } , []);

  

   // asignacion y llamado a la funcion de pagination
   const result = pagination(dogsFilter, count); // obtengo el array de perros filtrados

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.title__text}>
          <h1>Perros</h1>
        </div>
      </div>


      <div className={styles.pagination}> 
        <div className={styles.pag__Prev}> 
          {count > 0 && <button onClick={decrease}><PrevSvg/></button>}  {/* si el count es mayor a 0, muestro el boton "<" */}
        </div>
        <div className={styles.pag__Next}>
          {count >= 0 && count < result.length - 1 && (
            <button onClick={increase}><NextSvg/></button> 
          )} {/* si el count es mayor o igual a 0 y menor a la longitud del array de perros filtrados menos 1, entonces muestro el boton ">" */}
        </div>
      </div>


      <div className={styles.cards}>
        {
          dogsFilter && result.length > 0 ?  // si dogsFilter no esta vacio y result tiene algo entonces muestro los perros
          result[count].map((dog) => ( // recorro el array de result y voy a mostrar los perros
            <CardDogs
              key={dog.id}
              id={dog.id}
              name={dog.name}
              weightMin={dog.weightMin}
              weightMax={dog.weightMax}
              temperament={dog.temperament}
              image={dog.image}
            />
          )) : <img src="https://cdn.dribbble.com/users/1782673/screenshots/4683964/ezgif.com-video-to-gif__2_.gif" alt="loading" /> // si dogsFilter esta vacio muestro una imagen de cargando
        }
      </div>
    </div>
  );
}

export default Home;
