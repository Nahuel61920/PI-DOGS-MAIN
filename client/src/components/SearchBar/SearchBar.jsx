import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllDogs, getDogsForName } from "../../actions/actions";


import SearchSvg from "../SVG/SearchSvg";

import styles from "./searchBar.module.css";

function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllDogs());
    }, [])

    function handleInputChange(e){
        setName(e.target.value)
        dispatch(getDogsForName(name))
        navigate('/home')
        setCurrentPage(1);
    }


    return (
        <form className={styles.group}>
                <SearchSvg/>
                <input
                    className={styles.input} 
                    type="text"
                    placeholder="Search Dog..."
                    onChange= {handleInputChange}
                    value={name}
                />
        </form>
    )
}

export default SearchBar