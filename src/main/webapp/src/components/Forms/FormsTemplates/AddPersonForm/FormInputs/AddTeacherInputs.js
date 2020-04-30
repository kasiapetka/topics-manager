import React from "react";
import Input from "../../../Input/Input";

const addTeacherInputs = (props) => (
    <React.Fragment>
        <Input type="email" name="newEmail" label="email address"
               placeholder="Enter Email"
               value={props.person.newEmail || ''}
               onChange={props.change}
               invalid={(props.emptyForm && props.person.newEmail === '') || props.wrongEmail}/>

        <Input type="password" name="newPassword" label='Password'
               placeholder="Enter Password"
               value={props.person.newPassword || ''}
               onChange={props.change}
               invalid={props.emptyForm && props.person.newPassword === ''}/>
    </React.Fragment>
);

export default addTeacherInputs;