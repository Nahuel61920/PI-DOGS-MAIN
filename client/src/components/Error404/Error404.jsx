import React from 'react'
import { Link } from "react-router-dom";
import styles from "../CardDogDetail/cardDogDetail.module.css";


function Error404() {


    return (
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
            <h1>Dog not found</h1>
          </div>
          <div>
            <img src="https://st3.depositphotos.com/9494100/15431/i/600/depositphotos_154313516-stock-photo-pug-dog-with-yellow-constructor.jpg" alt="404" className={styles.image} />
          </div>
          <div className={styles.container__info}>
            <p>Try looking for another dog or navigate with the next and prev buttons to another dog</p>
          </div>
        </div>
      </div>
    )
}

export default Error404