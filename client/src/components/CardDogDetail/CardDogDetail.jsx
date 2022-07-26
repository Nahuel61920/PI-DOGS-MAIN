import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import styles from "./cardDogDetail.module.css";

// Modulos internos
import { getDescription, getClean } from "../../actions/actions";

import loading from "../../assets/loading.gif";

function CardDogDetail() {

  
  const myDogs = useSelector((state) => state.dogDescription);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDescription(id));
    return () => {
      dispatch(getClean());
    }
  }, [dispatch, id]);

  const { name, weightMin, weightMax, heightMin, heightMax, life_spanMax, life_spanMin, image, temperament } = myDogs;

  

  return (
    <div className={styles.container}>
        {
          Object.keys(myDogs).length > 0 ? ( // si hay datos en el state entra
            <div className={styles.card}>
              <div className={styles.card_container}>
              <div className={styles.button_back}>
                    <Link to={`/home`}>
                        <button>
                          <span class={styles.icon}>
                            ⬅️
                          </span>
                          <span class={styles.label}>Back</span>
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
                  <p>These dogs can weight between {weightMin ? weightMin : "N/A "} and {weightMax ? weightMax : "N/A "} kg</p>
                  <p>And measure between {heightMin ? heightMin : "N/A "} and {heightMax ? heightMax : "N/A "} cm</p>
                  <p>Their average age is between {life_spanMin ? life_spanMin : "N/A "} and {life_spanMax ? life_spanMax : "N/A "} years</p>
                  <p>Their temperaments are: {temperament.length > 0 ? temperament : "N/A"}</p>  {/* si no hay temperamento, lo pongo en N/A */}
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