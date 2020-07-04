import React from "react";
import classes from '../Messages.module.css'
import auth from "../../../Auth";
import { AiFillDelete } from "react-icons/ai";

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
        <tr className={msgClasses.join(' ')} >
            <td onClick={props.viewMessage}>{props.date}</td>
            <td onClick={props.viewMessage}>{person}</td>
            <td onClick={props.viewMessage} style={stringStyle}>{props.subject}</td>
            <td onClick={props.viewMessage} style={stringStyle}>{props.content}</td>
            <td className={classes.Delete} onClick={props.deleteMessage}><AiFillDelete/></td>
        </tr>
    )
};

export default message;