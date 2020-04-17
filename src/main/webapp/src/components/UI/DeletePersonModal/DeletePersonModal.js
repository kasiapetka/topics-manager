import React from "react";
import classes from './DeletePersonModal.module.css'
import Backdrop from "../Backdrop/Backdrop";

const deletePersonModal = (props) => {
    return (
        <React.Fragment>
            <Backdrop
                show={props.show}
                clicked={props.modalClosed}/>

            <div className={classes.Modal} style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.show ? props.children:null}
            </div>
        </React.Fragment>
    );
};

export default deletePersonModal;