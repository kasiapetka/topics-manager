import React from "react";
import {FormGroup, Input, Label} from "reactstrap";


const sizeSemStateInputs =(props)=>(
    <div className="form-row p-2">
        <FormGroup className="mb-2 mt-3 col-md-3">
            <Label for="exampleSize" className="mr-2 pl-1">Size</Label>
            <Input type="number" name="size" id="exampleSize"
                   min='1' onChange={props.onChange} value={props.section.size || ''}
                   invalid={props.emptyForm && props.section.size===''}/>
        </FormGroup>

        <FormGroup className="mb-2 mt-3 col-md-3 mr-auto ml-auto">
            <Label for="exampleSem" className="mr-2 pl-1">Semester</Label>
            <Input type="number" name="semester" id="exampleSem"
                   min='1' max='7' onChange={props.onChange} value={props.section.semester || ''}
                   invalid={props.emptyForm && props.section.semester===''}/>
        </FormGroup>

        <FormGroup className="mb-2 mt-3 col-md-3">
            <Label for="exampleState" className="mr-2 pl-1">State</Label>
            <Input type="select" name="state" id="exampleSate"
                   onChange={props.onChange} value={props.section.state}>
                <option value={true}>Opened</option>
                <option value={false}>Closed</option>
            </Input>
        </FormGroup>

    </div>
);

export default sizeSemStateInputs;