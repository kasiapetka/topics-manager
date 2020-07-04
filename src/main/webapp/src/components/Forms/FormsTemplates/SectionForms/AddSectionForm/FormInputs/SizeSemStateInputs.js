import React from "react";
import Input from "../../../../FormElements/Input/Input";

const sizeSemStateInputs =(props)=>(
    <div className="form-row p-1">
        <Input type="number" name="size" label="size"
               groupclasses='col-md-3'
               min='1' onChange={props.onChange} value={props.section.size.value}
               isinvalid={props.section.size.validation}/>

        <Input type="number" name="semester" label="semester"
               groupclasses='col-md-3 mr-auto ml-auto'
               min='1' max='7' onChange={props.onChange} value={props.section.semester.value}
               isinvalid={props.section.semester.validation}/>

        <Input type="select" name="state" label="state"
               groupclasses='col-md-3'
               onChange={props.onChange}
               value={props.section.state.value}>
            <option value={'O'}>Opened</option>
            <option value={'C'}>Closed</option>
        </Input>
    </div>
);

export default sizeSemStateInputs;

