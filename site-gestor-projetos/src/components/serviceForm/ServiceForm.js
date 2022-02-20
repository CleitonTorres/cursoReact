import React, {useState} from 'react';

import InputComponent from '../form/InputComponent';
import SubmitButtonComponent from '../form/SubmitButtonComponent';

import style from '.././projectForm/ProjectForm.module.css';

function Service ({handleSubmit, btnText, projectData}){

    const [service, setService] = useState();

    function submit (e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }
    
    function handleChange(e){
        //spread aperator (...)
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={style.form}>
            <InputComponent 
                type="text" 
                text="Nome do Serviço"
                name="name"
                placehold="Insira o nome do serviço..."
                handleOnChange={handleChange}
            />

            <InputComponent 
                type="number" 
                text="Custo do Serviço"
                name="cost"
                placehold="Insira o valor total..."
                handleOnChange={handleChange}
            />

            <InputComponent 
                type="text" 
                text="Descrição do serviço"
                name="description"
                placehold="Descreva o serviço..."
                handleOnChange={handleChange}
            />

            <SubmitButtonComponent text={btnText}/>
        </form>
    );
}
export default Service;