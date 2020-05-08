import React from "react";
import {NavLink} from "react-router-dom";
import classes
    from './AccountControl.module.css'

const accountControl = (props) => {

    let controls;
    if (props.controls) {
        controls = props.controls.map(control => {
            return <li key={control.link}
                         className={classes.Link}>
                <NavLink activeClassName={classes.active} exact
                                        to={control.link}>
                    {control.label}
                </NavLink>
            </li>
        })
    }

    return (
        <ul className={classes.Elements}>
            {props.mainLabel}
            {controls}
        </ul>
    );
};

export default accountControl;