import React from "react";
import AdminAccountControls
    from "../../Pages/AdminPages/AdminPageElements/AdminAccountControls/AdminAccountControls";
import classes from './SideDrawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import WithClass from "../../../hoc/WithClass";
import logo from "../../../img/list.png";
import {NavbarBrand} from "reactstrap";
import auth from "../../../Auth";
import TeacherAccountControls
    from "../../Pages/TeacherPages/TeacherPageElements/TeacherAccountControls/TeacherAccountControls";


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    let content;
    if(auth.getRole() === 'A'){
        content=<AdminAccountControls
            addPerson={props.addPerson}/>;
    }
    else if(auth.getRole() === 'T'){
        content=<TeacherAccountControls/>;
    }

    return (
        <WithClass classes={classes.SideDrawerElements}>
            <Backdrop
                show={props.show}
                clicked={props.clicked}/>
            <div className={attachedClasses.join(' ')}>
                <NavbarBrand><img
                    alt=""
                    src={logo}
                    width="32"
                    height="32"
                    className="d-inline-block align-top"
                />{' '}TaskManager</NavbarBrand>
                <nav style={{marginTop: '30px'}}>
                   {content}
                </nav>
            </div>
        </WithClass>
    );

};

export default sideDrawer;