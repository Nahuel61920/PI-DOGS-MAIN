import React from 'react';
import PrevPag from '../SVG/PrevPag';
import NextPag from '../SVG/NextPag';
import styles from './home.module.css';
import "./pagination.css" 


export default function Pagination({dogsPerPage, currentPage, allDogs, paginado}) {
    const pageNumbers = []; //array que guarda los numeros de paginas

    for(let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){ // ceil: redondea hacia arriba
        pageNumbers.push(i) //agrega los numeros de paginas al array
    }
    return(
    
        <ul className={styles.paginated}>
            <button className={ currentPage === 1 ? "disabled" : "enabled" } disabled={currentPage === 1 ? true : false} onClick={() => paginado(currentPage - 1)}>
                <PrevPag />
            </button>
                <li className={styles.activeMQ}>
                    <p className= {styles.current}>{currentPage}</p>
                </li>
                {pageNumbers && 
                    pageNumbers.map(number=> ( //map para recorrer el array
                        <li className={currentPage === number ? styles.active : ''} key={number} onClick={()=>paginado(number)}> {/* si el numero de pagina es igual al currentPage, le pongo la clase active */}
                            <p className= {styles.current} >{number}</p> {/* muestro el numero de pagina */}
                        </li>
                    ))
                }
            <button className={ currentPage === pageNumbers.length ? "disabled" : "enabled" } disabled={currentPage === pageNumbers.length ? true : false} onClick={() => paginado(currentPage + 1)}>
                <NextPag />
            </button>
        </ul>

    )
    
}