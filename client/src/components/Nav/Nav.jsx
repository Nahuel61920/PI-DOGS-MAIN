import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/6Troy4q7c.png";
import styles from "./nav.module.css";
import SearchBar from "../SearchBar/SearchBar";

function Nav() {
  return (
    <div className={styles.nav_container}>
        <nav className={styles.nav}>
            <div className={styles.logo_container}>
                <Link to={'/home'}>
                    <img src={logo} alt="logo" className={styles.logo} />
                </Link>
            </div>
            <div className={styles.create}>
                <Link to={'/create-dog'}>
                    <button className={styles.create_button}>Crear Perro</button>
                </Link>
            </div>
            <div className={styles.searchBar}>
                <SearchBar />
            </div>
        </nav>
    </div>
  )
}

export default Nav