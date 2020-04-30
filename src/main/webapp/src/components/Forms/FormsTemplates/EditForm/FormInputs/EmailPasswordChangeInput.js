import React from "react";
import TextInput from "../../../Inputs/TextInput/TextInput";


const emailPasswordChangeInput =(props)=>(
    <div className="form-row p-1">
        <TextInput label='New Email Address' type="email" name="newEmail"
                   placeholder="Enter New Email"
                   groupclasses="col-md-6 ml-auto mr-auto"
                   value={props.newEmail || ''}
                   onChange={props.change}
                   invalid={props.wrongEmail || props.emptyForm}/>

        <TextInput label='New Password' type="password" name="newPassword"
                   id="newPassword" minLength="5"
                   groupclasses="col-md-6 ml-auto mr-auto"
                   placeholder="Enter New Password"
                   value={props.newPassword || ''}
                   onChange={props.change}
                   invalid={props.emptyForm}/>
    </div>
);

export default emailPasswordChangeInput;