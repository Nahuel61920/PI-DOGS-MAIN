import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/6Troy4q7c.png";
import styles from "./nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import DarkMode from '../DarkMode/DarkMode';

function Nav({setCurrentPage}) {
  return (
    <div className={styles.nav_container}>
        <nav className={styles.nav}>
            <div className={styles.navbar}>
                <div className={styles.logo_container}>
                    <Link to={'/'}>
                        <img src={logo} alt="logo" className={styles.logo} />
                    </Link>
                </div>
                <div className={styles.create}>
                    <p>Favorites</p>
                    <Link to={'/create-dog'}>
                        <button className={styles.create_button}>Create Dog</button>
                    </Link>
                    <p>Aboult</p>
                </div>
                <div className={styles.search}>
                    <DarkMode/>
                </div>
            </div>
            <div className={styles.searchBar}>
                <SearchBar setCurrentPage={setCurrentPage}/>
            </div>
        </nav>
    </div>
  )
}

export default Nav