import React from "react";
import {BsFillTrashFill} from 'react-icons/bs'

import style from '../projectForm/ProjectCard.module.css';

function ServiceCard({id, name, cost, description, handleRemove}){

    const remove = (e) => {

    } 

    return(
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p><span>Custo do serviço</span> R${cost}</p>
            <p>{description}</p>
            <div className={style.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    );
}
export default ServiceCard;