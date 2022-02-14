import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import style from './Footer.module.css';

function Footer() {
    return (
        <footer className={style.footer}>
            <p className={style.copy_right}>
                <span>Gestor de Projetos - by Cleiton Machado  &copy; - 2022 </span>
            </p>

            <ul className={style.social_list}>
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaLinkedin /></li>
            </ul>
        </footer>
    );
}
export default Footer;