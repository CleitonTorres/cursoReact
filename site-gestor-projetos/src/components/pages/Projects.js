import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../layout/Message.js';
import Container from '../layout/Container.js';
import Loading from '../layout/Loading.js';
import LinkButton from '../layout/LinkButton.js';
import ProjectCard from '../projectForm/ProjectCard.js';
import style from './Projects.module.css';

function Projetos() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    const location = useLocation();
    let message = '';
    if (location.state) {
        message = location.state.message;
    }

    //Carrega os cards de projetos salvos no db.
    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'appliction/json',
            },
        })
            .then(resp => resp.json())
            .then(data => {
                //console.log(data) //data from db.
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch(err => console.log(err))
    }, [])

    //remove projects from DB.
    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })//delete the project from DB.
            .then(resp => resp.json())
            .then(data => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
            })//delete the frontend project without needing a new request.
            .catch(err => console.log(err))
    }

    return (
        <div className={style.projeto_container}>
            <div className={style.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container >
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            name={project.name}
                            category={project.category.name}
                            budget={project.budget}
                            id={project.id}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    );
}
export default Projetos;