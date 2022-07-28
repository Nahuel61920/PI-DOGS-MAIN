import React from 'react'
import {NavLink} from 'react-router-dom';
import Slider from '../Slider/Slider';
import styles from './landingPage.module.css';

function LandingPage() {
  return (
    <div>
      <Slider/>
      <div className={styles.container_text}>
        <h1 className={styles.title}>Pi dogs</h1>
        
          <NavLink to="/home" className={styles.btn}>
            <span>Start</span>
          </NavLink>
      </div>
    </div>
  )
}

export default LandingPage