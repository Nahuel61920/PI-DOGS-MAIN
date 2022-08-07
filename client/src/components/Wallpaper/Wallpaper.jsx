import React from 'react'
import Wallpapers from '../Slider/Wallpapers';
import {Link} from 'react-router-dom';
import stylesBack from "../CardDogDetail/cardDogDetail.module.css";

function Wallpaper() {
    return (
        <div>
            <div className={stylesBack.button_back_w}>
                <Link to={`/home`}>
                    <button>
                        <span className={stylesBack.icon}>
                        ⬅️
                        </span>
                        <span className={stylesBack.label}>Back</span>
                    </button>
                </Link>
            </div>
            <Wallpapers/>
        </div>
    )
}

export default Wallpaper