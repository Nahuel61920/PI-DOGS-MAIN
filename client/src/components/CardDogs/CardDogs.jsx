import React from 'react'
import { Link } from "react-router-dom";
import styles from "./cardDogs.module.css";

import { useDispatch } from "react-redux";

//
import { getDescription } from "../../actions/actions";

function CardDogs({name, weightMin, weightMax, temperament, image, id}) {

    const temperamentTemp = !temperament ? ["N/A"] : temperament.split(",")
    const dispatch = useDispatch()

    return (
        <div className ={styles.card}>
            <div className={styles.card_container}>
                <div className={styles.name}>
                    <h1>{name}</h1>
                </div>
                <Link to={`/home/${id}`}>
                    <img src={image} alt={name} className={styles.image} onClick={() => dispatch(getDescription(id))}/> {/* Envio el id al reducer para crear la seccion de Description */}
                </Link>
                <div className={styles.container__info}>
                    <p>Peso: Min: {weightMin}kg - Max: {weightMax}kg</p>
                </div>
                <div className={styles.temperament}>
                    {
                        temperamentTemp.map((temps, index) => {
                            if( index < 6 ) {
                                return <p key={index}>{temps}</p> //solo muestro 6 temperamentos
                            } 
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CardDogs