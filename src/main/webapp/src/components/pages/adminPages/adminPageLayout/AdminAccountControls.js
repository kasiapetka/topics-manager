import React from "react";
import {Button} from "reactstrap";

const AdminAccountControls = (props) => (
    <React.Fragment>
        <p>Admin Options:</p>
        <Button className="ml-2 mt-2 mb-2" onClick={props.toggleTeachers} outline>List Teachers</Button>
        <Button className="ml-2 mt-2 mb-2" onClick={props.toggleStudents} outline>List Students</Button>
    </React.Fragment>
);

export default AdminAccountControls;

