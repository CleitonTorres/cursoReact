import React, { useEffect } from 'react';
import { useState } from 'react';

import style from './ProjectForm.module.css'
import InputComponent from '../form/InputComponent';
import SelectComponent from '../form/SelectComponent';
import SubmitButtonComponent from '../form/SubmitButtonComponent';

function ProjetoForm({ btnText, handleSubmit, projectData }) {
    const [category, setCategory] = useState([]);
    const [project, setProject] = useState(projectData || {})

    //query the project categories.
    useEffect(() => {
        fetch('http://localhost:5000/category', {
            method: "GET",
            headers: {
                'Content-Type': 'aplication/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategory(data)
            })
            .catch((err) => console.log(err))
    }, [])

    //envia o formulário
    const submit = (e) => {
        e.preventDefault()
        console.log(project)  //verification 1, before submit.
        handleSubmit(project); // chama o submit localizado na página pai.
    }

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    //cria um objeto Categoria para ser salvo dentro do objeto project.
    const handleCategory = (e) => {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    return (
        <form onSubmit={submit} action='' method='POST' className={style.form}>
            <div>
                <InputComponent
                    type="text"
                    name="name"
                    placeholder="insira o nome do projeto"
                    text="Nome do projeto"
                    value={project.name}
                    handleOnChange={handleChange} //seta o valor de nome na const project
                />
                <InputComponent
                    type="number"
                    name="budget"
                    placeholder="insira o valor do projeto"
                    text="Orçamento do projeto"
                    value={project.budget}
                    handleOnChange={handleChange} //seta o valor de custo total na const project
                />
                <SelectComponent
                    name="categoria_id"
                    text="Selecione a categoria"
                    options={category}
                    value={project.category ? project.category.id : ''}
                    handleOnChange={handleCategory} //após o submit seta o valor de categoria na const project
                />
                <SubmitButtonComponent text={btnText} />
            </div>
        </form>
    );
}
export default ProjetoForm;