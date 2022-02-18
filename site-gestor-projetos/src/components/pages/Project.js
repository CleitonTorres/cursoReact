import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import style from './Project.module.css';
import Loading from '../layout/Loading.js';
import Container from '../layout/Container.js';
import ProjectForm from '../projectForm/ProjectForm.js';
import Message from '../layout/Message.js';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setshowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [typeMessage, setTypeMessage] = useState();

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

    function toggleServiceForm(){
        setshowServiceForm(!showServiceForm);
    }

    function editPost(project){
        setMessage('')// reseta o valor da mensagem.
        //budget validation.
        if(project.budget < project.cost){
            setMessage("O Orçamento do projeto não pode ser menor que o custo!");
            setTypeMessage('error');
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:"PATCH", //PATCH only updates what is sent and UPDATE updates everything.
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(project) //data sent for modification.
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data);
            setShowProjectForm(false);
            setMessage("Projeto atualizado com sucesso!")
            setTypeMessage('success')
        }) //receive the updated data and reload the project.
        .catch(err => console.log(err))
    }

    return (
        <>
        {
            project.name ? (
            <div  className={style.project_details} >
                <Container customClass="column" name="Container_Project">
                    {message && <Message type={typeMessage} msg={message} />}
                    <div className={style.details_container}  name="div detalhes project">
                        <h1>Projeto: {project.name}</h1>
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
                                <ProjectForm 
                                    handleSubmit={editPost}  //send the data to edit the data in DB.
                                    btnText="Conluir Edição" 
                                    projectData={project} //send data to load form view.
                                />
                            </div>
                        )}
                    </div>
                    <div className={style.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={style.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            <div className={style.project_info}>
                                {showServiceForm && <div>Formulário do Serviço</div>}
                            </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass={'start'}>
                            <p>Itens do Serviço</p>
                    </Container>
                </Container>
            </div>
            ) : <Loading />
        }
        </>
    );
}
export default Project;