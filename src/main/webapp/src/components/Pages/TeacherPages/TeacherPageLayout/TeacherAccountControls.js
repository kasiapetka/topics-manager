import React from 'react'
import {Button} from "reactstrap";
import {Link} from "react-router-dom";


const teacherAccountControls = () => (
    <React.Fragment>
        <p>Teacher Options:</p>
        <Link to="/teacher"><Button className="ml-5 mt-2 mb-2 w-75" outline>List Students</Button></Link>
        <Link to="/teacher/sections"><Button className="ml-5 mt-2 mb-2 w-75" outline>List Sections</Button></Link>
        <Link to="/teacher/addSection"><Button className="ml-5 mt-2 mb-2 w-75" outline>Add New Section</Button></Link>
    </React.Fragment>
);


export default teacherAccountControls;