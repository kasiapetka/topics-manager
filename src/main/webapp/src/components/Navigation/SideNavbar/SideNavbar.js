import React from "react";
import AdminAccountControls
    from "../../Pages/AdminPages/AdminPageElements/AdminAccountControls/AdminAccountControls";
import classes from './SideNavbar.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import WithClass from "../../../hoc/WithClass";
import auth from "../../../Auth";
import TeacherAccountControls
    from "../../Pages/TeacherPages/TeacherPageElements/TeacherAccountControls/TeacherAccountControls";

const sideNavbar = (props) => {

    let content;

    if(auth.getRole() === 'A'){
        content=<AdminAccountControls
            addPerson={props.addPerson}/>;
    }
    else if(auth.getRole() === 'T'){
        content=<TeacherAccountControls/>;
    }

    return (
        <WithClass classes={classes.SideNavbarElements}>
            <Backdrop
                show={props.show}
                clicked={props.clicked}/>
            <div className={classes.SideNavbar}>
                <nav style={{marginTop: '30px'}}>
                    {content}
                </nav>
            </div>
        </WithClass>
    );
};

export default sideNavbar;