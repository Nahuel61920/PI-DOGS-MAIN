import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate  } from "react-router-dom";
import PrevSvg from "../SVG/PrevSvg";
import NextSvg from "../SVG/NextSvg";
import Remove from "../SVG/Remove";
import Error404 from "../Error404/Error404";

import styles from "./cardDogDetail.module.css";

// Modulos internos
import { getDescription, getClean, setLoading, deleteDog  } from "../../actions/actions";



function CardDogDetail() {
  const { dogDescription, loading, error } = useSelector((state) => state);
  console.log(dogDescription);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate es un hook que me permite navegar entre paginas

  const handleDelete = () => {
    dispatch(deleteDog(id));
    alert("Dog deleted succesfully");
    navigate("/home");
  };

  useEffect(() => {
    dispatch(getDescription(id));
    dispatch(setLoading());
    return () => {
      dispatch(getClean()); // limpia el state
    }
  }, [dispatch, id]);

  const { name, weightMin, weightMax, heightMin, heightMax, life_spanMax, life_spanMin, image, temperament, createdInBd } = dogDescription;

  // encontrar si el id existe 
  // convierto de string a number
  const idNumber = parseInt(id);

  let idPrev = idNumber - 1;
  let idNext = idNumber + 1;
  // avanzar y retroceder
  if (idPrev < 1) {
    idPrev = 1;
  } else if (idNext > 264) {
    idNext = 1;
  } else {
    idPrev = idPrev;
    idNext = idNext;
  }

  return (
    <div className={styles.container}>
      <Link to={`/home/${idPrev}`}>
        <PrevSvg />
      </Link>
      <Link to={`/home/${idNext}`}>
        <NextSvg />
      </Link>
        {
          error ? (<Error404 />) : loading ? (
            <img src="https://i.giphy.com/media/ar8zpFnzWcSbAxjJmd/giphy.webp" alt="loading" />
          ) : ( // si hay datos en el state entra
            <div className={styles.card}>
              <div className={styles.card_container}>
              <div className={styles.button_back}>
                    <Link to={`/home`}>
                        <button>
                          <span className={styles.icon}>
                            ⬅️
                          </span>
                          <span className={styles.label}>Back</span>
                        </button>
                    </Link>
                </div>
                {
                  createdInBd ? (
                    <div className={styles.button_delete}>
                        <button onClick={handleDelete}>
                          <Remove/>
                        </button>
                    </div>
                  ) : (
                    null
                  )
                }
                <div className={styles.name}>
                  <h1>{name}</h1>
                </div>
                <div>
                  <img src={image} alt={name} className={styles.image} />
                </div>
                <div className={styles.container__info}>
                  <p>These dogs can weight between {weightMin ? weightMin :  "N/A "} and {weightMax ? weightMax : NaN} kg.</p>
                  <p>And measure between {heightMin ? heightMin : "N/A "} and {heightMax ? heightMax : "N/A "} cm</p>
                  <p>Their average age is between {life_spanMin ? life_spanMin : "N/A "} and {life_spanMax ? life_spanMax : "N/A "} years</p>
                  {
                    temperament ? (
                      <p>Their temperaments are: {temperament}</p>
                    ) : (
                      <p>This dog has no temperament to show.</p>
                    )
                  }
                </div>
              </div>
            </div>
          )
        }
      
    </div>
  );
}

export default CardDogDetail