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

    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        //cuando esta true lo pasa a false y vice versa
        setClicked(!clicked)
    }

    return (
        <div className={styles.nav_container}>
            <nav className={styles.nav}>
                <div className={styles.navbar}>
                    <div className={`icon nav-icon-1 ${clicked? "open" : ""}`} onClick={handleClick}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={styles.logo_container}>
                        <Link to={'/'}>
                            <img src={logo} alt="logo" className={styles.logo} />
                        </Link>
                    </div>
                    <div className={`create ${clicked ? 'active' : ''}`}>
                        <Link to={'/wallpaper'} style={{ textDecoration: 'none' }}>
                            <p>Wallpapers</p>
                        </Link>
                        <Link to={'/create-dog'}>
                            <button className={styles.create_button}>Create Dog</button>
                        </Link>
                        <Link to={'/favorites'} style={{ textDecoration: 'none' }}>
                            <p>Favorites</p>
                        </Link>
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
                <div className={`initial ${clicked ? ' active' : ''}`}>
                    <h1>Wallpapers</h1>
                </div>
            </nav>
        </div>
    )
}

export default Nav