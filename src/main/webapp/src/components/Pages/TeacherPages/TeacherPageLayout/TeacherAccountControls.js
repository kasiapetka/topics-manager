import React from 'react'
import {Button} from "reactstrap";


const teacherAccountControls = (props) => (
    <React.Fragment>
        <p>Teacher Options:</p>
        <Button className="ml-5 mt-2 mb-2 w-75" onClick={props.toggleTeachers} outline>List Students</Button>
        <Button className="ml-5 mt-2 mb-2 w-75" outline>List Sections</Button>
        <Button className="ml-5 mt-2 mb-2 w-75"  outline>Add New Section</Button>
    </React.Fragment>
);


export default teacherAccountControls;