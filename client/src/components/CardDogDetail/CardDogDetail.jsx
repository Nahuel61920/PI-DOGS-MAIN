import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import PrevSvg from "../SVG/PrevSvg";
import NextSvg from "../SVG/NextSvg";

import styles from "./cardDogDetail.module.css";

// Modulos internos
import { getDescription, getClean } from "../../actions/actions";

import loading from "../../assets/loading.gif";

function CardDogDetail() {

  
  const { dogDescription } = useSelector((state) => state);
  console.log(dogDescription);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDescription(id));
    return () => {
      dispatch(getClean()); // limpia el state
    }
  }, [dispatch, id]);

  const { name, weightMin, weightMax, heightMin, heightMax, life_spanMax, life_spanMin, image, temperament } = dogDescription;

  // encontrar si el id existe 
  let idExist = dogDescription.id ? true : false;

  let idPrev = dogDescription.id - 1;
  let idNext = dogDescription.id + 1;
  // avanzar y retroceder
  if (idExist) {
    let id = dogDescription.id;
    if (id === 1) {
      idPrev = dogDescription.id; 
    } else if (id === 19 || id === 26 || id === 34 || id === 36 || id === 43 || id === 45 || id === 48 || id === 51 || id === 59 || id === 62 || id === 65){ 
      idNext = dogDescription.id + 2;
    } else if (id === 38 || id === 22 || id === 23 || id === 24 || id === 25 || id === 27 || id === 28 || id === 29 || id === 30 || id === 31 || id === 32 || id === 33 || id === 35 || id === 37) {
      idNext = dogDescription.id + 3;
    }
  } else {
    idPrev = 1;
    idNext = 1;
  }

  // cambia la pagina

  const changePage = (id) => {
    dispatch(getDescription(id));
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
          Object.keys(dogDescription).length > 0 ? ( // si hay datos en el state entra
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
          ) : (
            <img src={loading} alt="loading" />
          )
        }
      
    </div>
  );
}

export default CardDogDetail