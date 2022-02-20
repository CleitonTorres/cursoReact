import React, { useEffect, useState } from "react";

import style from './Message.module.css';

function Message({ type, msg }) {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        if (!msg) {
            setVisible(false);
            return;
        }
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)

    }, [msg])

    return (
        <>
            {
                visible && (
                    <div className={`${style.message} ${style[type]}`}>
                        <p>{msg}</p>
                    </div>
                )
            }
        </>
    );
}
export default Message;