import React from 'react'
import { Link } from "react-router-dom";
import styles from "./cardDogs.module.css";

import { useDispatch, useSelector } from "react-redux";

//
import { getDescription, addFav, deleteFav } from "../../actions/actions";

function CardDogs(props) {
    const { name, weightMin, weightMax, image, temperament, id } = props;
    
    const temperamentTemp = !temperament ? ["N/A"] : temperament.split(",") ; // si no hay temperamento, lo pongo en N/A
    const dispatch = useDispatch();

    const { fav } = useSelector((state) => state);
    console.log(fav);
    const active = fav.find((dogfav) => dogfav.id === id);
    const handleFav = (data) => {
        const included = fav.find((dogfav) => dogfav.id === id);
        included && dispatch(deleteFav(data));
        !included && dispatch(addFav(data));
    };
    

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
                        temperamentTemp.map((temps, index) => { // recorro el array de temperamentos, index es el indice del array
                            if( index < 6 ) {
                                return <p key={index}>{temps}</p> //solo muestro 6 temperamentos
                            } 
                        })
                    }
                </div>
                <button
                    onClick={() => handleFav(props)}
                    className={active ? styles.favActive : styles.fav}
                >
                *
                </button>
            </div>
        </div>
    )
}

export default CardDogs