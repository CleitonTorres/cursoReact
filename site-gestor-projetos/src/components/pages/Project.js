import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import style from './Project.module.css';
import Loading from '../layout/Loading.js';
import Container from '../layout/Container.js';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        })
            .then(resp => resp.json())
            .then((data) => { setProject(data) })
            .catch(err => console.log(err))
        }, 3000)//remover setTimeout nos projeto finalizado.
    }, [id]); //id é a referencia a ser monitorada pelo useEffect.

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    return (
        <>
        {
            project.name ? (
            <div className={style.project_details}>
                <Container customClass="column">
                    <div className={style.details_container}>
                        <h1>{project.name}</h1>
                        <button onClick={toggleProjectForm} className={style.btn}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={style.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total do orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total utilizado:</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={style.project_info}>
                                <p>Detalhes do projeto</p>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
            ) : <Loading />
        }
        </>
    );
}
export default Project;