import React from 'react'
import Footer from '../Footer/Footer'
import Nav from '../Nav/Nav'
import {Link} from 'react-router-dom'
import styles from './NotFound404.module.css'

function NotFound404() {
  return (
    <div>
        <Nav/>
        <div className={styles.notFound404}>
            <h1 className={styles.notFound404_title}>404</h1>
            <h2>Page not found</h2>
            <p>The page you are looking for does not exist</p>
            <p>Go back to</p>
            <Link to="/home">
                <button className={styles.notFound404_button}>Home</button>
            </Link>
        </div>
        <Footer/>
    </div>
  )
}

export default NotFound404