import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/6Troy4q7c.png";
import styles from "./nav.module.css";
import './searchNav.css'
import SearchBar from "../SearchBar/SearchBar";
import DarkMode from '../DarkMode/DarkMode';
import SearchSvg2 from '../SVG/searchSvg2';

function Nav({setCurrentPage}) {
    const [ open , setOpen ] = useState(false);

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
                    <Link to={'/wallpaper'} style={{ textDecoration: 'none' }}>
                        <p>Wallpapers</p>
                    </Link>
                    <Link to={'/create-dog'}>
                        <button className={styles.create_button}>Create Dog</button>
                    </Link>
                    <p>About</p>
                </div>
                <div className={styles.search}>
                    <DarkMode/>
                </div>
                <div className={styles.lupa} onClick={ () => setOpen(!open)}>
                    <SearchSvg2/>
                </div>


            </div>
            <div className={ open ? "searchBarOpen" : "serchBar" }>
                <SearchBar setCurrentPage={setCurrentPage}/>
            </div>
        </nav>
    </div>
  )
}

export default Nav