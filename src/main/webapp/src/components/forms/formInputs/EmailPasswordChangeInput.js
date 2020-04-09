import React from "react";
import {FormGroup, Input, Label} from "reactstrap";


const EmailPasswordChangeInput =(props)=>(
    <div className="form-row">
        <FormGroup className="mb-2 mr-auto ml-sm-4 mt-3 col-md-5 mb-2">
            <Label for="exampleEmail" className="mr-sm-2 pl-1">
                New Email Address
            </Label>
            <Input type="email" name="newEmail"
                   id="exampleEmail" placeholder="Enter New Email"
                   value={props.newEmail || ''}
                   onChange={props.change}
                   invalid={props.wrongEmail}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-4 mt-3 col-md-5 mb-2">
            <Label for="newPassword" className="mr-sm-2 pl-1">
                New Password
            </Label>
            <Input type="password" name="newPassword"
                   id="newPassword" minLength="5"
                   placeholder="Enter New Password"
                   value={props.newPassword || ''}
                   onChange={props.change}/>
        </FormGroup>
    </div>
);

export default EmailPasswordChangeInput;