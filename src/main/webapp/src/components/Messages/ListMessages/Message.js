import React from "react";
import classes from '../Messages.module.css'
import auth from "../../../Auth";

const message = (props) => {
    const email = auth.parseJwt(auth.getToken()).sub;
    let person = props.type==='inbox' ? props.from : props.to;
    if(person === email)
        person='Me';

    const msgClasses = [];
    msgClasses.push(classes.Message);
    if(props.type==='inbox' && !props.isRead){
        msgClasses.push('font-weight-bold');
    }

    const stringStyle = {
        maxWidth: '230px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };

    return (
        <tr className={msgClasses.join(' ')} onClick={props.viewMessage}>
            <td>{props.date}</td>
            <td>{person}</td>
            <td style={stringStyle}>{props.subject}</td>
            <td style={stringStyle}>{props.content}</td>
        </tr>
    )
};

export default message;