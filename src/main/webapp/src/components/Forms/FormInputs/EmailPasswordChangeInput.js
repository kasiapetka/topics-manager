import React from "react";
import {FormGroup, Input, Label} from "reactstrap";


const emailPasswordChangeInput =(props)=>(
    <div className="form-row">
        <FormGroup className="mt-3 col-md-5 mb-2 ml-auto mr-auto">
            <Label for="exampleEmail" className="mr-sm-2 pl-1">
                New Email Address
            </Label>
            <Input type="email" name="newEmail"
                   id="exampleEmail" placeholder="Enter New Email"
                   value={props.newEmail || ''}
                   onChange={props.change}
                   invalid={props.wrongEmail || props.emptyForm}/>
        </FormGroup>
        <FormGroup className="mb-2 mt-3 col-md-5 mr-auto ml-auto">
            <Label for="newPassword" className="mr-sm-2 pl-1">
                New Password
            </Label>
            <Input type="password" name="newPassword"
                   id="newPassword" minLength="5"
                   placeholder="Enter New Password"
                   value={props.newPassword || ''}
                   onChange={props.change}
                   invalid={props.emptyForm}/>
        </FormGroup>
    </div>
);

export default emailPasswordChangeInput;