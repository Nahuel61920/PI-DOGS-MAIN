import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { getAllDogs, getDogsForName } from "../../actions/actions";
import { useNavigate } from 'react-router-dom';

import SearchSvg from "../SVG/SearchSvg";

import styles from "./searchBar.module.css";

function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const navigate = useNavigate(); // useNavigate es un hook que me permite navegar entre paginas

    useEffect(() => {
        dispatch(getAllDogs());
    }, [dispatch]);

    function handleInputChange(e){
        dispatch(getDogsForName(e))
        setCurrentPage(1);
        navigate("/home");
    }


    return (
        <form className={styles.group}>
            <SearchSvg/>
            <input
                className={styles.input} 
                type="text"
                placeholder="Search Dog..."
                onChange= { (e) => {
                setName(e.target.value); 
                handleInputChange(e.target.value)
                }} 
                value={name}
            />
        </form>
    )
}

export default SearchBar