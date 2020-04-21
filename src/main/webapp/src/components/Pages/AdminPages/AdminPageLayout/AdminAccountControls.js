import React from "react";
import {Button} from "reactstrap";

const adminAccountControls = (props) => (
    <React.Fragment>
        <p>Admin Options:</p>
        <Button className="ml-2 mt-2 mb-2" onClick={props.toggleTeachers} outline>List Teachers</Button>
            {props.showTeachers ? <Button className="ml-4 mt-2 mb-2" onClick={()=>props.addPerson('T')} outline color="success" >Add Teacher</Button> : null}
        <Button className="ml-2 mt-2 mb-2" onClick={props.toggleStudents} outline>List Students</Button>
        {props.showStudents ? <Button className="ml-4 mt-2 mb-2" onClick={()=>props.addPerson('S')} outline color="success" >Add Student</Button> : null}
    </React.Fragment>
);

export default adminAccountControls;

