import React from "react";
import {FormGroup, Input, Label} from "reactstrap";


const addTeacherInputs = (props) => (
    <React.Fragment>
        <FormGroup className="p-2 mb-2 mt-2">
            <Label for="exampleEmail" className="mr-2 pl-1">Email Address</Label>
            <Input type="email" name="newEmail" id="exampleEmail" placeholder="Enter Email"
                   value={props.person.newEmail || ''}
                   onChange={props.change}
                   invalid={props.emptyForm}/>
        </FormGroup>

        <FormGroup className="p-2 mb-2 mt-2">
            <Label for="personPassword" className="mr-2 pl-1">Password</Label>
            <Input type="password" name="newPassword" id="personPassword" placeholder="Enter Password"
                   value={props.person.newPassword || ''}
                   onChange={props.change}
                   invalid={props.emptyForm}/>
        </FormGroup>
    </React.Fragment>
);

export default addTeacherInputs;