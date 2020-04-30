import React from "react";
import Input from "../../../Input/Input";


const sizeSemStateInputs =(props)=>(
    <div className="form-row p-1">
        <Input type="number" name="size" label="size"
               groupclasses='col-md-3'
               min='1' onChange={props.onChange} value={props.section.size || ''}
               invalid={props.emptyForm && props.section.size === ''}/>

        <Input type="number" name="semester" label="semester"
               groupclasses='col-md-3 mr-auto ml-auto'
               min='1' max='7' onChange={props.onChange} value={props.section.semester || ''}
               invalid={props.emptyForm && props.section.semester === ''}/>

        <Input type="select" name="state" label="state"
               groupclasses='col-md-3'
               onChange={props.onChange} value={props.section.state}>
            <option value={true}>Opened</option>
            <option value={false}>Closed</option>
        </Input>
    </div>
);

export default sizeSemStateInputs;

