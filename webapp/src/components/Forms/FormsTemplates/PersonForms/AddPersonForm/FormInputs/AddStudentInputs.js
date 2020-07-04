import React from "react";
import Input from "../../../../FormElements/Input/Input";


const addStudentInputs = (props) => (
    <Input type="number" name="semester" label="semester"
           min='1' max='7' onChange={props.change} value={props.person.semester || ''}
           invalid={props.emptyForm && props.person.semester === ''}/>
);

export default addStudentInputs;