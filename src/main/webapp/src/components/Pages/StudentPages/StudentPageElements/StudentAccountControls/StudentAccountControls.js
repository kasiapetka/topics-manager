import React from "react";
import AccountControl from "../../../AccountControl/AccountControl";
import classes from './StudentAccountControls.module.css'
import addControlToList from "../../../AccountControl/createControlsList";
import {Nav} from "reactstrap";

const studentAccountControls = () => {
    const sections = [];

    addControlToList(sections,
        ['/student', '/student/sections'],
        ["List All Sections", 'List My Sections']);

    return (
        <React.Fragment>
            <p className={classes.Caption}>Student Options:</p>
            <Nav>
                <AccountControl
                    mainLabel='Sections:'
                    controls={sections}/>

            </Nav>
        </React.Fragment>
    );
};

export default studentAccountControls;

