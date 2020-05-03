import React from "react";
import Input from "../../../../FormElements/Input/Input";


const emailPasswordChangeInput =(props)=>(
    <div className="form-row p-1">
        <Input label='New Email Address' type="email" name="newEmail"
                   placeholder="Enter New Email"
                   groupclasses="col-md-6 ml-auto mr-auto"
                   value={props.newEmail || ''}
                   onChange={props.change}
                   invalid={props.wrongEmail || props.emptyForm}/>

        <Input label='New Password' type="password" name="newPassword"
                   id="newPassword" minLength="5"
                   groupclasses="col-md-6 ml-auto mr-auto"
                   placeholder="Enter New Password"
                   value={props.newPassword || ''}
                   onChange={props.change}
                   invalid={props.emptyForm}/>
    </div>
);

export default emailPasswordChangeInput;