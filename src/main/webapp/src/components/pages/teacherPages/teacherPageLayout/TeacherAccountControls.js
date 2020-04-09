import React from 'react'
import {Button} from "reactstrap";


const TeacherAccountControls = (props) => (
    <React.Fragment>
        <p>Teacher Options:</p>
        <Button className="ml-5 mt-2 mb-2" onClick={props.toggle} outline>List Students</Button>
    </React.Fragment>
);


export default TeacherAccountControls;