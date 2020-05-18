import React, {useState, useEffect} from "react";
import classes from './Messages.module.css'
import {Link} from "react-router-dom";
import auth from "../../Auth";

const MessagesButtons =(props)=> {
    const btnClasses = "bg-transparent border border-bottom-0 " + classes.Button;
    const activeBtnClasses="border border-bottom-0 " + classes.Button;
    const [buttonActive, setActive] = useState(1);
    const buttons = [
        {
            label: 'Compose',
            id: 1,
            active: true
        },
        {
            label: 'Inbox',
            id: 2,
            active: false
        },
        {
            label: 'Sent',
            id: 3,
            active: false
        }
    ];
    const [toggleButtons, setToggleButtons] = useState([]);
    const role = auth.getRole();
    let path;
    if (role === 'S') {path = '/student/messages';}
    if (role === 'T') {path = '/teacher/messages';}
    if (role === 'A') {path = '/admin/messages';}

    useEffect(() => {
        buttons.forEach(button => button.active = button.id === buttonActive);
        setToggleButtons(buttons);
    }, [buttonActive]);

    const displayButtons = toggleButtons.map(button => {
        return <Link key={button.id} to={path}><button
                    className={button.active ? activeBtnClasses : btnClasses}
                    onClick={() => {
                        setActive(button.id);
                        props.switchForm(button.id);
                    }}>{button.label}</button></Link>

    });

    return (
        <div className={classes.Buttons}>
            {displayButtons}
        </div>
    );
};

export default MessagesButtons;
