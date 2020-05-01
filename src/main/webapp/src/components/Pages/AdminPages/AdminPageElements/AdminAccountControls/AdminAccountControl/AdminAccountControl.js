import React from "react";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import classes
    from './AdminAccountControl.module.css'

const adminAccountControl = (props) => {
    const bigButtonClasses = "ml-2 mt-2 mb-2 " + classes.BigButton;
    const smallButtonClasses = "ml-2 mt-2 mb-2 " + classes.SmallButton;
    let firstButton, secondButton;

    if(props.firstLink){
        firstButton=  <Link to={props.firstLink} className={classes.Link}>
            <Button className={bigButtonClasses} outline>
            {props.firstButton}
        </Button></Link>
    }
    if(props.secondLink){
        secondButton=  <Link to={props.secondLink} className={classes.Link}>
            <Button style={{fontSize: 'small'}} className={smallButtonClasses}
                    onClick={() => props.onClick} outline color="success">
                {props.secondButton}
            </Button></Link>
    }
    return (
        <div className={classes.Buttons}>
            {firstButton}
            {secondButton}
        </div>
    );
};

export default adminAccountControl;