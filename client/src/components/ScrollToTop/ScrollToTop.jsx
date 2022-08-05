import React from 'react'
import { useState, useEffect } from 'react'
import styles from './scrollToTop.module.css';

import scrollTop from '../../assets/buttom-top.png';

function ScrollToTop() {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 100;
            if (isTop !== true) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        } );
    }, []);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    return (
        <div >
            {
                showScroll && (
                    <div className={styles.scroll_top} onClick={scrollToTop}>
                        <img src={scrollTop} alt="scroll to top" />
                    </div>
                )
            }
        </div>
    )
}

export default ScrollToTop