import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProjectForm from '../projectForm/ProjectForm';
import style from './NewProject.module.css';

function NovoProjeto() {
    const navigate = useNavigate()

    //submit the form and also query the existing categories in the db.
    function createPost(project) {
        //inicialize cost and services
        project.cost = 0;
        project.service = [];

        //envia os novos projetos para o db.
        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                console.log(data) //verification 2, after submit. 
                //redirect
                navigate('/projects', { state: { message: "Projeto criado com sucesso!" } });
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className={style.novoProjeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie primeiro o projeto para deipos adicionar os serviços.</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
        </div>
    );
}
export default NovoProjeto;