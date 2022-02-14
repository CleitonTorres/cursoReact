import React from 'react';
import style from './SubmitButtonComponent.module.css';

function SubmitButtonComponent({ text }) {
    return (
        <div>
            <button className={style.btn} >{text}</button>
        </div>
    );
}
export default SubmitButtonComponent;