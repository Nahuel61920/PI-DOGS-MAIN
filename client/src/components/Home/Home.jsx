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
  orderByName,
  orderByWeight,
  filterCreated,
} from "../../actions/actions";
//importo los componentes que voy a usar
import CardDogs from "../CardDogs/CardDogs";
// Paginacion
import Pagination from "./pagination.js";
// Estilos del componente
import logoLoading from "../../assets/loading.gif";
import notRaza from "../../assets/not_raza.png";
import styles from "./home.module.css";
import Nav from "../Nav/Nav";

function Home() {
  const dispatch = useDispatch(); // useDispatch() para poder usar la action
  let { temperamen, dogsFilter } = useSelector((state) => state); // obtengo el estado actual del store
  const [order, setOrder] = useState(""); // guardo el orden en el que se muestran los perros
  const [charge, setCharge] = useState(false); // variable para saber si esta cargando

  useEffect(() => {
    setCharge(true);
    setTimeout(() => {
      setCharge(false);
    }, 3000);
    dispatch(getAllDogs()); // llamo a la action que me interesa
    dispatch(getAllTemperament()); // llamo a la action que me interesa
  }, [dispatch]); // [] para que no se ejecute cada vez que se renderiza el componente

  //pagination
  const [currentPage, setCurrentPage] = useState(1);  
  const [dogsPerPage, setDogsPerPage] = useState(8); //cantidad de dogs por pagina
  const indexOfLastDog = currentPage * dogsPerPage; // calculo el indice del ultimo perro que se va a mostrar
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // calculo el indice del primer perro que se va a mostrar
  const currentDogs = dogsFilter.slice(indexOfFirstDog, indexOfLastDog); // obtengo los perros que se van a mostrar

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function handleFilterByTemperament(e) {
    e.preventDefault(e);
    dispatch(filterTemperament(e.target.value)); // llamo a la action que me interesa
    setCurrentPage(1);
    setOrder(e.target.value); // cambio el orden de los perritos
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value); 
  }

  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterByCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className={styles.container}>
      <Nav setCurrentPage={setCurrentPage}/>
      <div className={styles.title}>
        <div className={styles.title__text}>
          <h1>PI Dogs</h1>
        </div>
      </div>


      <div className={styles.filter}>
        <select className={styles.select} onChange={(e) => handleSort(e)}>
          <option value="" disabled selected>
            Alphabetical order
          </option>
          <option value="asc">A-Z</option>
          <option value="des">Z-A</option>
        </select>
        <select
          className={styles.select}
          onChange={(e) => handleFilterByTemperament(e)} // llamo a la action que me interesa
        >
          <option value="" disabled selected>
            Filter by temperament
          </option>
          <option value="all">All</option>
          {temperamen.map((temp // recorro el array de temperamentos
            ) => (
              <option key={temp.id} value={temp.name}>
                {" "}
                {/* creo un option por cada temperamento */}
                {temp.name} {/* muestro el nombre del temperamento */}
              </option>
            )
          )}
        </select>
      </div>
      <div className={styles.filter}>
        <select className={styles.select} onChange={(e) => handleFilterByCreated(e)}>
          <option value="" disabled selected> 
            Filter by create
          </option>
          <option value="all">All</option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>
        <select
          className={styles.select}
          onChange={(e) => handleSortWeight(e)} // llamo a la action que me interesa
        >
          <option value="" disabled selected>
            Order by weight
          </option>
          <option value="min">Weight Min</option>
          <option value="max">Weight Max</option>
        </select>
      </div>

      <Pagination
        dogsPerPage={dogsPerPage} // cantidad de perritos por pagina
        allDogs={dogsFilter.length} // cantidad de perritos
        currentPage={currentPage} // pagina actual
        paginado={paginate} // funcion para paginacion
      />

      <div className={styles.cards}>
          {charge ? (
            <div>
              <img src={logoLoading} alt="loading" />
            </div>
          ) : currentDogs.length ? (
          currentDogs.map((dog) => (
            <CardDogs
              key={dog.id}
              id={dog.id}
              name={dog.name}
              image={dog.image}
              temperament={dog.temperament}
              weightMin={dog.weightMin}
              weightMax={dog.weightMax}
            />
          ))
        ) : (
          <div className={styles.noDogs}>
            <h1>No dogs found</h1>
            <img src={notRaza} alt="not_raza" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
