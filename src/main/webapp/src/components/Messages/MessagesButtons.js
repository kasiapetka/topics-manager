import React, {useState, useEffect} from "react";
import classes from './Messages.module.css'

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
    const [toggleButtons, setToggleButtons] = useState(buttons);
    useEffect(() => {
        buttons.forEach(button => {
            if (button.id === buttonActive) {
                button.active = true;
            } else
                button.active = false;
        });
        setToggleButtons(buttons);
    }, [buttonActive]);

    const displayButtons = toggleButtons.map(button => {
        return <button
                    key={button.id}
                    className={button.active ? activeBtnClasses : btnClasses}
                    onClick={() => {
                        setActive(button.id);
                        props.switchForm(button.id);
                    }}>{button.label}</button>

    });

    return (
        <div className={classes.Buttons}>
            {displayButtons}
        </div>
    );
};

export default MessagesButtons;
