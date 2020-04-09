import React from 'react'
import {Button} from "reactstrap";


const TeacherAccountControls =(props)=> {
    return (
        <div>
            <Button className="ml-5 mt-2 mb-2" onClick={props.toggle} outline>List Students</Button>
        </div>
    )
};

export default TeacherAccountControls