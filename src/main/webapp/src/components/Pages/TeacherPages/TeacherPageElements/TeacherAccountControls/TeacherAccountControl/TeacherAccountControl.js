import React from "react";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import classes from './TeacherAccountControl.module.css'

const teacherAccountControl = (props) => {
    const bigButtonClasses = "ml-2 mt-2 mb-2 " + classes.BigButton;
    const smallButtonClasses = "ml-2 mt-2 mb-2 " + classes.SmallButton;

    return (
        <div className={classes.Buttons}>
            <Link to={props.firstLink} className={classes.Link}><Button className={bigButtonClasses} outline>
                {props.firstButton}
            </Button></Link>

            {
                props.secondLink
                    ?
                    <Link to={props.secondLink} className={classes.Link}>
                        <Button style={{fontSize: 'small'}} className={smallButtonClasses}
                                onClick={() => props.onClick} outline color="success">
                            {props.secondButton}
                        </Button></Link>
                    :
                    null
            }
        </div>
    );
};

export default teacherAccountControl;