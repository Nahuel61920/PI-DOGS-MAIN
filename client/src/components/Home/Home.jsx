import React from "react";
//importo los hook que voy a usar de react
import { useState, useEffect } from "react";
//importo los hooks de react-redux (previamente se instala npm i react-redux)
import { useDispatch, useSelector } from "react-redux"; // useDispatch() para poder usar la action y useSelector() para poder usar el estado actual del store
// // //importo las actions que me interesa usar en este componente
import { getAllDogs } from "../../actions/actions";
//importo los componentes que voy a usar
import CardDogs from "../CardDogs/CardDogs";
// Paginacion 
import Pagination from "./pagination.js";
import NextSvg from "../SVG/NextSvg";
import PrevSvg from "../SVG/PrevSvg";
// Estilos del componente
import styles from "./home.module.css";
import Nav from "../Nav/Nav";

function Home() {
  

  const dispatch = useDispatch(); // useDispatch() para poder usar la action
  let { allDogs, dogsFilter } = useSelector((state) => state); // obtengo el estado actual del store

  useEffect(() => {
    dispatch(getAllDogs()); // llamo a la action que me interesa
  }, []); // [] para que no se ejecute cada vez que se renderiza el componente

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogsFilter.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <Nav/>
      <div className={styles.title}>
        <div className={styles.title__text}>
          <h1>Perros</h1>
        </div>
      </div>
      <Pagination
        dogsPerPage={dogsPerPage}
        allDogs={dogsFilter.length}
        currentPage={currentPage}
        paginado={paginate}
      />


      <div className={styles.cards}>
        {
          !currentDogs.length > 0 ? (
           <img src="https://cdn.dribbble.com/users/1782673/screenshots/4683964/ezgif.com-video-to-gif__2_.gif" alt="loading" /> // si dogsFilter esta vacio muestro una imagen de cargando
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
          )
        }
      </div>
    </div>
  );
}

export default Home;
