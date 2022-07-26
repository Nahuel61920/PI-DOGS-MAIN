import React from "react";
//importo los hook que voy a usar de react
import { useState, useEffect } from "react";
//importo los hooks de react-redux (previamente se instala npm i react-redux)
import { useDispatch, useSelector } from "react-redux"; // useDispatch() para poder usar la action y useSelector() para poder usar el estado actual del store
// // //importo las actions que me interesa usar en este componente
import {
  getAllDogs,
  getAllTemperament,
  filterTemperament,
} from "../../actions/actions";
//importo los componentes que voy a usar
import CardDogs from "../CardDogs/CardDogs";
// Paginacion
import Pagination from "./pagination.js";
import NextSvg from "../SVG/NextSvg";
import PrevSvg from "../SVG/PrevSvg";
// Estilos del componente
import loading from "../../assets/loading.gif";
import styles from "./home.module.css";
import Nav from "../Nav/Nav";

function Home() {
  const dispatch = useDispatch(); // useDispatch() para poder usar la action
  let { temperaments, dogsFilter } = useSelector((state) => state); // obtengo el estado actual del store
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getAllDogs()); // llamo a la action que me interesa
    dispatch(getAllTemperament()); // llamo a la action que me interesa
  }, []); // [] para que no se ejecute cada vez que se renderiza el componente

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogsFilter.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function handleFilterByTemperament(e) {
    e.preventDefault(e);
    dispatch(filterTemperament(e.target.value)); // llamo a la action que me interesa
    setCurrentPage(1);
    setOrder(e.target.value); // cambio el orden de los perritos
  }

  
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.title}>
        <div className={styles.title__text}>
          <h1>PI Dogs</h1>
        </div>
      </div>

      <div>
        <select
          className={styles.select}
          onChange={(e) => handleFilterByTemperament(e)} // llamo a la action que me interesa
        >
          <option value="" disabled selected> 
            Filter by temperament
          </option>
          <option value="all">All</option> 
          {temperaments.map((temp) => ( // recorro el array de temperamentos
            <option key={temp.id} value={temp.name}>  {/* creo un option por cada temperamento */}
              {temp.name} {/* muestro el nombre del temperamento */}
            </option>
          ))}
        </select>
      </div>

      
      <Pagination
        dogsPerPage={dogsPerPage} // cantidad de perritos por pagina
        allDogs={dogsFilter.length} // cantidad de perritos
        currentPage={currentPage} // pagina actual
        paginado={paginate} // funcion para paginacion
      />

      <div className={styles.cards}>
        {!currentDogs.length > 0 ? (
          <img
            src={loading}
            alt="loading"
          /> // si dogsFilter esta vacio muestro una imagen de cargando
        ) : (
          currentDogs.map((dog) => (
            <CardDogs
              key={dog.id}
              id={dog.id}
              name={dog.name}
              image={dog.image}
              description={dog.description}
              temperament={dog.temperament}
              weightMin={dog.weightMin}
              weightMax={dog.weightMax}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
