import React from "react";
import {FormGroup, Input, Label} from "reactstrap";


const addStudentInputs = (props) => (
    <React.Fragment>
        <FormGroup className="p-2 mb-2 mt-2">
            <Label for="exampleSem" className="mr-2 pl-1">Semester</Label>
            <Input type="number" name="semester" id="exampleSem"
                   min='1' max='7' onChange={props.change} value={props.person.semester || ''}
                   invalid={props.emptyForm}/>
        </FormGroup>
    </React.Fragment>
);

export default addStudentInputs;