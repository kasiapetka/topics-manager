import React from "react";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

const adminAccountControls = (props) => (
    <React.Fragment>
        <p>Admin Options:</p>
        <Link to="/admin"><Button className="ml-2 mt-2 mb-2" outline>List
            Teachers</Button></Link>

        <Link to="/admin/add">
            <Button className="ml-4 mt-2 mb-2" onClick={() => props.addPerson('T')} outline color="success">Add
                Teacher</Button></Link>

        <Link to="/admin/students"><Button className="ml-2 mt-2 mb-2" outline>List
            Students</Button></Link>

        <Link to="/admin/add">
            <Button className="ml-4 mt-2 mb-2" onClick={() => props.addPerson('S')} outline
                    color="success">Add Student</Button></Link>

    </React.Fragment>
);

export default adminAccountControls;

