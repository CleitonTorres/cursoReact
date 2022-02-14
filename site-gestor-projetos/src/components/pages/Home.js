import React from 'react';
import style from './Home.module.css';
import savins from '../../img/savings.svg';
import LinkButton from '../layout/LinkButton';

function Home() {
    return (
        <section className={style.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <img src={savins} alt="Cost" />
        </section>
    );
}
export default Home;