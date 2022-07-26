import React from 'react';
import styles from './home.module.css';


export default function Pagination({dogsPerPage, currentPage, allDogs, paginado}) {
    const pageNumbers = []; //array que guarda los numeros de paginas

    for(let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){ // ceil: redondea hacia arriba
        pageNumbers.push(i) //agrega los numeros de paginas al array
    }
    return(
    
        <ul className={styles.paginated}>
            {pageNumbers &&
            pageNumbers.map(number=> (
                <li className={currentPage === number ? styles.active : ''} key={number} onClick={()=>paginado(number)}>
                    <p className= {styles.current} >{number}</p>
                </li>
            ))}
        </ul>

    )
    
}