import React from 'react';
import styles from './footer.module.css';
import portafolio from '../../assets/kisspng-internet-icon-computer-icons-5b386b31337c02.6815024415304241132109.png';

function Footer() {
    let fecha = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.site_footer}>
                <div className={styles.copyright}>
                    <p>
                        Page created by Nahuel61920
                    </p>
                    <p>&copy; {fecha}. All Rights Reserved.</p>
                </div>
                <div className={styles.redes_sociales}>
                    <a href="https://www.linkedin.com/in/esteban-nahuel-carrizo-69715422b/" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="linkedin" />
                    </a>
                    <a href="https://github.com/Nahuel61920/" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="github" />
                    </a>
                    <a href="https://nahuel61920.github.io/portafolio-Nahuel/" target="_blank" rel="noopener noreferrer">
                        <img src={portafolio} alt="portafolio" />
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=5493815360966" target="_blank" rel="noopener noreferrer">
                        <img src="https://es.logodownload.org/wp-content/uploads/2018/10/whatsapp-logo-11.png" alt="whatsapp" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer