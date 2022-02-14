import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import style from './Navbar.module.css';
import logo from '../../img/costs_logo.png';

function Navbar() {
    return (
        <nav className={style.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="Costs" />
                </Link>
                <ul className={style.list}>
                    <li className={style.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={style.item}>
                        <Link to="/empresa">Empresa</Link>
                    </li>
                    <li className={style.item}>
                        <Link to="/projects">Projetos</Link>
                    </li>
                    <li className={style.item}>
                        <Link to="/contato">Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    );
}
export default Navbar;