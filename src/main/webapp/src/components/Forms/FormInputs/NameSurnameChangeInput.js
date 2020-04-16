import React from "react";
import {FormGroup, Input, Label} from "reactstrap";


const nameSurnameChangeInput =(props)=>(
    <div className="form-row">
        <FormGroup className="mb-2 mt-3 col-md-5 ml-auto mr-auto">
            <Label for="exampleName" className="mr-sm-2 pl-1">
                New Name
            </Label>
            <Input type="text" name="newName"
                   id="exampleName" placeholder="Enter New Name"
                   pattern="[A-Za-z]{2,}"
                   value={props.newName || ''}
                   onChange={props.change}
                   invalid={props.emptyForm}/>
        </FormGroup>
        <FormGroup className="mb-2 mt-3 col-md-5 ml-auto mr-auto">
            <Label for="exampleSurname" className="mr-sm-2 pl-1">
                New Surname
            </Label>
            <Input type="text" name="newSurname"
                   id="exampleSurname" placeholder="Enter New Surname"
                   pattern="[A-Za-z]{2,}"
                   value={props.newSurname || ''}
                   onChange={props.change}
                   invalid={props.emptyForm}/>
        </FormGroup>
    </div>
);

export default nameSurnameChangeInput;